import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetAllUsersResponse {
  @Field(() => [String])
  users: string[];
}
