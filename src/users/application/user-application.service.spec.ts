import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserApplicationService } from './user-application.service';
import { UserRepositoryService } from '../infraestructure/user-repository.service';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../infraestructure/user.entity';
import { UsersResponse } from '../presentation/dto/get-all-users-response.dto';

describe('UserApplicationService', () => {
  let service: UserApplicationService;
  let userRepositoryService: UserRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserApplicationService,
        UserMapper,
        {
          provide: UserRepositoryService,
          useValue: {
            createUser: jest.fn(),
            getUser: jest.fn(),
            getAllUsers: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<UserApplicationService>(UserApplicationService);
    userRepositoryService = module.get<UserRepositoryService>(
      UserRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const createUserInput = { username: 'testuser', password: 'password' };
    const mockUser = { username: 'testuser' };
    jest.spyOn(userRepositoryService, 'createUser').mockResolvedValue(mockUser);

    const result = await service.createUser(createUserInput);
    expect(result).toEqual({ username: 'testuser' });
  });

  it('should throw ConflictException if username already exists', async () => {
    const createUserInput = { username: 'existinguser', password: 'password' };

    jest
      .spyOn(userRepositoryService, 'createUser')
      .mockRejectedValue({ code: '23505' });

    await expect(service.createUser(createUserInput)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw InternalServerErrorException for unknown errors', async () => {
    const createUserInput = { username: 'testuser', password: 'password' };

    jest
      .spyOn(userRepositoryService, 'createUser')
      .mockRejectedValue(new Error());

    await expect(service.createUser(createUserInput)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should get an user', async () => {
    const createUserInput = 'testuser2';
    const mockUser = new User();
    mockUser.username = 'testuser';
    mockUser.password = 'password';

    jest.spyOn(userRepositoryService, 'getUser').mockResolvedValue(mockUser);

    const result = await service.getUser(createUserInput);
    expect(result).toBe(mockUser);
  });

  it('should throw NotFoundException if username not found', async () => {
    const createUserInput = 'testuser2';
    const mockUser = new User();
    mockUser.username = 'testuser';
    mockUser.password = 'password';

    jest.spyOn(userRepositoryService, 'getUser').mockResolvedValue(null);

    await expect(service.getUser(createUserInput)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should get all users', async () => {
    const mockUser: User = {
      id: '1231231',
      username: 'testuser3',
      password: 'password',
    };
    const mockUserArray = [mockUser, mockUser, mockUser];
    const mockUserResponse: UsersResponse = {
      users: ['testuser3', 'testuser3', 'testuser3'],
    };

    jest
      .spyOn(userRepositoryService, 'getAllUsers')
      .mockResolvedValue(mockUserArray);

    const result = await service.getAllUsers();
    expect(result).toEqual(mockUserResponse);
  });

  it('should throw NotFoundException if username already exists', async () => {
    const mockUser = new User();
    mockUser.username = 'testuser';
    mockUser.password = 'password';

    jest.spyOn(userRepositoryService, 'getAllUsers').mockResolvedValue(null);

    await expect(service.getAllUsers()).rejects.toThrow(NotFoundException);
  });
});
