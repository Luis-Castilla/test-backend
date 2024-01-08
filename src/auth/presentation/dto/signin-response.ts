import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SigninResponse {
  @Field()
  access_token: string;

  @Field()
  username: string;

  constructor(access_token: string, username: string) {
    this.access_token = access_token;
    this.username = username;
  }
}
