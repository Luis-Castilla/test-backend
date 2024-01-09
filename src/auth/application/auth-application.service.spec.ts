import { Test, TestingModule } from '@nestjs/testing';
import { AuthApplicationService } from './auth-application.service';
import { UserRepositoryService } from '../../users/infraestructure/user-repository.service';
import { AuthDomainService } from '../domain/auth-domain.service';
import { SigninUserInput } from '../presentation/dto/signin-user.input';
import { SignupResponse } from '../presentation/dto/signup-response';
import { SigninResponse } from '../presentation/dto/signin-response';
import { User } from '../../users/infraestructure/user.entity';
import {
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('AuthApplicationService', () => {
  let service: AuthApplicationService;
  let userRepositoryService: UserRepositoryService;
  let authDomainService: AuthDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthApplicationService,
        {
          provide: AuthDomainService,
          useValue: {
            hashedPassword: jest.fn(),
            createJwt: jest.fn(),
            comparePassword: jest.fn(),
          },
        },
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

    service = module.get<AuthApplicationService>(AuthApplicationService);
    userRepositoryService = module.get<UserRepositoryService>(
      UserRepositoryService,
    );
    authDomainService = module.get<AuthDomainService>(AuthDomainService);
  });

  it('should create a new user and return SignupResponse', async () => {
    const signupInput: SigninUserInput = {
      username: 'testuser',
      password: 'testpassword',
    };

    const mockUser = new User();
    mockUser.username = signupInput.username;
    mockUser.id = 'userId';

    jest
      .spyOn(authDomainService, 'hashedPassword')
      .mockResolvedValue('hashedPassword');
    jest.spyOn(userRepositoryService, 'createUser').mockResolvedValue(mockUser);

    const result: SignupResponse = await service.signup(signupInput);

    expect(result).toBeInstanceOf(SignupResponse);
    expect(result.username).toEqual(signupInput.username);
  });

  it('should generate a SigninResponse on successful signin', async () => {
    const mockUser = new User();
    mockUser.username = 'testuser';
    mockUser.id = 'userId';

    jest
      .spyOn(authDomainService, 'createJwt')
      .mockResolvedValue('generatedAccessToken');

    const result: SigninResponse = await service.signin(mockUser);

    expect(result).toBeInstanceOf(SigninResponse);
    expect(result.access_token).toEqual('generatedAccessToken');
    expect(result.username).toEqual(mockUser.username);
  });

  it('should throw UnauthorizedException on invalid credentials', async () => {
    jest.spyOn(userRepositoryService, 'getUser').mockResolvedValue(undefined);
    jest
      .spyOn(authDomainService, 'comparePassword')
      .mockResolvedValue({} as User);

    await expect(service.validateUser('username', 'password')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw InternalServerErrorException on token generation failure', async () => {
    const mockUser = new User();
    mockUser.username = 'testuser';
    mockUser.id = 'userId';

    jest.spyOn(authDomainService, 'createJwt').mockResolvedValue(undefined);

    await expect(service.signin(mockUser)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
