import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SignupResponse } from './dto/signup-response';
import { SigninResponse } from './dto/signin-response';
import { SigninUserInput } from './dto/signin-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlGuard } from '../guards/gql.guard';
import { AuthApplicationService } from '../application/auth-application.service';

@Resolver()
export class AuthResolver {
  constructor(private authApplicationService: AuthApplicationService) {}

  @Mutation(() => SignupResponse)
  async signup(
    @Args('loginUserInput') loginUserInput: SigninUserInput,
  ): Promise<SignupResponse> {
    return this.authApplicationService.signup(loginUserInput);
  }

  @Mutation(() => SigninResponse)
  @UseGuards(GqlGuard)
  async signin(
    @Args('loginUserInput') loginUserInput: SigninUserInput,
    @Context() context,
  ): Promise<SigninResponse> {
    return this.authApplicationService.signin(context.user);
  }
}
