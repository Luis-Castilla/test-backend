import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserApplicationService } from '../application/user-application.service';
import { UsersResponse } from './dto/get-all-users-response.dto';

describe('UserResolver', () => {
  let service: UserResolver;
  let userApplicationService: UserApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserApplicationService,
          useValue: {
            getAllUsers: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserResolver>(UserResolver);
    userApplicationService = module.get<UserApplicationService>(
      UserApplicationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return UsersResponse when getAllUsers is called', async () => {
    const mockUsersResponse: UsersResponse = {
      users: ['username1', 'username2', 'username3'],
    };

    jest
      .spyOn(userApplicationService, 'getAllUsers')
      .mockResolvedValue(mockUsersResponse);

    const result = await service.getAllUsers();
    expect(result).toBe(mockUsersResponse);
  });
});
