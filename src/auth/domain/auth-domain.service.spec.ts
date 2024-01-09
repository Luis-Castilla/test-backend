import { Test, TestingModule } from '@nestjs/testing';
import { AuthDomainService } from './auth-domain.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthDomainService', () => {
  let service: AuthDomainService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthDomainService, JwtService],
    }).compile();

    service = module.get<AuthDomainService>(AuthDomainService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should hash a password', async () => {
    const plainPassword = 'password';
    const hashedPassword = 'hashedPassword';

    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

    const result = await service.hashedPassword(plainPassword);

    expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(result).toEqual(hashedPassword);
  });

  it('should create a JWT token', async () => {
    const username = 'testuser';
    const userId = 'userId';
    const token = 'generatedToken';

    jest.spyOn(jwtService, 'sign').mockReturnValue(token);

    const result = await service.createJwt(username, userId);

    expect(jwtService.sign).toHaveBeenCalled();
    expect(result).toEqual(token);
  });

  it('should compare a password', async () => {
    const userPassword = 'hashedPassword';
    const plainPassword = 'password';

    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const result = await service.comparePassword(userPassword, plainPassword);

    expect(bcrypt.compare).toHaveBeenCalled();
    expect(result).toEqual(true);
  });
});
