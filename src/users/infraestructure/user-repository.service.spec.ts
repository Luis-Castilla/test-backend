import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UserRepositoryService } from './user-repository.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('UserRepositoryService', () => {
  let service: UserRepositoryService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<UserRepositoryService>(UserRepositoryService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserInput = { username: 'testuser', password: 'password' };
      const mockUser = new User();
      mockUser.username = createUserInput.username;
      mockUser.password = createUserInput.password;

      jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);

      const result = await service.createUser(createUserInput);
      expect(result).toEqual(mockUser);
    });

    it('should throw ConflictException for duplicate username', async () => {
      const createUserInput = { username: 'testuser', password: 'password' };

      jest.spyOn(userRepository, 'create').mockReturnValue({} as User);
      jest.spyOn(userRepository, 'save').mockRejectedValue({
        code: '23505',
      });

      await expect(service.createUser(createUserInput)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      const createUserInput = { username: 'testuser', password: 'password' };

      jest.spyOn(userRepository, 'create').mockReturnValue({} as User);
      jest
        .spyOn(userRepository, 'save')
        .mockRejectedValue(new Error('Some database error'));

      await expect(service.createUser(createUserInput)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getUser', () => {
    it('should retrieve a user by username', async () => {
      const username = 'testuser';
      const mockUser = new User();
      mockUser.username = username;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      const result = await service.getUser(username);
      expect(result).toEqual(mockUser);
    });
  });

  describe('getAllUsers', () => {
    it('should retrieve all users', async () => {
      const mockUsers = [new User(), new User()];

      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);

      const result = await service.getAllUsers();
      expect(result).toEqual(mockUsers);
    });
  });
});
