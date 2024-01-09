import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthApplicationService } from '../application/auth-application.service';
import { describe } from 'node:test';
import { SigninUserInput } from './dto/signin-user.input';
import { SignupResponse } from './dto/signup-response';
import { SigninResponse } from './dto/signin-response';
import { User } from '../../users/infraestructure/user.entity';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authApplicationService: AuthApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthApplicationService,
          useValue: {
            signup: jest.fn(),
            signin: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authApplicationService = module.get<AuthApplicationService>(
      AuthApplicationService,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Signup test suit', () => {
    it('should return ok', async () => {
      const loginUserInputMock: SigninUserInput = {
        username: 'username',
        password: 'password',
      };
      const SignUpResponseMock: SignupResponse = { username: 'username' };
      jest
        .spyOn(authApplicationService, 'signup')
        .mockResolvedValue(SignUpResponseMock);

      const result = await resolver.signup(loginUserInputMock);
      expect(result).toBe(SignUpResponseMock);
    });

    it('should return an error', async () => {
      const loginUserInputMock: SigninUserInput = {
        username: 'username',
        password: 'password',
      };
      jest
        .spyOn(authApplicationService, 'signup')
        .mockRejectedValue(new Error('Some error'));

      await expect(resolver.signup(loginUserInputMock)).rejects.toThrow(Error);
    });
  });

  describe('Signin test suit', () => {
    it('should return ok', async () => {
      const loginUserInputMock: SigninUserInput = {
        username: 'someName',
        password: 'password',
      };
      const SignInResponseMock: SigninResponse = {
        username: 'someName',
        access_token: 'ad1qwd1qw89dq5',
      };
      const context = {
        user: {
          username: 'someName',
        },
      };

      jest
        .spyOn(authApplicationService, 'signin')
        .mockImplementation(async (user: User) => {
          return SignInResponseMock;
        });

      const result = await resolver.signin(loginUserInputMock, context);
      expect(result).toBe(SignInResponseMock);
    });

    it('should return an error', async () => {
      const loginUserInputMock: SigninUserInput = {
        username: 'someName',
        password: 'password',
      };
      const context = {
        user: {
          username: 'someName',
        },
      };

      jest
        .spyOn(authApplicationService, 'signin')
        .mockRejectedValue(new Error('Some error'));

      await expect(
        resolver.signin(loginUserInputMock, context),
      ).rejects.toThrow(Error);
    });
  });
});
