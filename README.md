# Test-Backend

Project to solve **Hiring Test for Sr. Engineer - Backend**

## Prerequisites

- [Node.js](https://nodejs.org/) (specified in `.nvmrc`)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- Docker Compose

## Setup

### Install Dependencies

```bash
pnpm install
```

### Start the Database

```bash
cd docker
docker-compose up -d
```

## Development
### Start the Server

```bash
pnpm run start:dev
```
### GraphQL Playground

Explore and interact with the GraphQL API using GraphQL Playground:

To access the Playground:
1. Open your browser and go to [http://localhost:3000/graphql](http://localhost:3000/graphql).
2. Use this interface to craft queries, mutations, and subscriptions to interact with the GraphQL API.

#### Test Queries and Mutations

1. **Signin Mutation**: Authenticate a user and receive an access token.
    ```graphql
    mutation {
      signin(loginUserInput: {
        username: "userToTest",
        password: "Password123"
      }) {
        access_token
        username
      }
    }
    ```

2. **Signup Mutation**: Register a new user.
    ```graphql
    mutation {
      signup(loginUserInput: {
        username: "userToTest",
        password: "Password123"
      }) {
        username
      }
    }
    ```

3. **Get All Users Query**: Retrieve a list of all users.
    ```graphql
    query {
      getAllUsers {
        users
      }
    }
    ```

To use this query:
1. First, authenticate a user by performing the Signin Mutation.
2. Copy the access token from the response of the Signin Mutation.
3. In GraphQL Playground, click on the "HTTP HEADERS" tab.
4. Add the following header:
    ```json
    {
      "Authorization": "Bearer <your-access-token>"
    }
    ```
5. Execute the query.

Ensure the server is running (`pnpm run start:dev`) to access and utilize GraphQL Playground effectively.

### Run Tests

```bash
pnpm test # Run all the test suits
pnpm test:watch # For watch mode
pnpm test:cov # For coverage
```

### Code Formatting and Linting

```bash
pnpm run format  # Format code
pnpm run lint    # Run ESLint
```

