export const dataBaseConfig = () => ({
  host: process.env.POSTGRESQL_DATABASE_HOST || '172.19.0.2',
  port: process.env.POSTGRESQL_DATABASE_PORT || 5432,
  username: process.env.POSTGRESQL_DATABASE_USERNAME || 'user',
  password: process.env.POSTGRESQL_DATABASE_PASSWORD || 'password',
  name: process.env.POSTGRESQL_DATABASE_NAME || 'ddh',
});
