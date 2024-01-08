import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsersResponse {
  @Field(() => [String])
  users: string[];

  constructor(usernames: string[]) {
    this.users = usernames;
  }
}
