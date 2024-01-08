import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignupResponse {
  @Field()
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}
