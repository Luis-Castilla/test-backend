export const dataBaseConfig = () => ({
  database: {
    type: 'postgres',
    host: process.env.POSTGRESQL_DATABASE_HOST || 'localhost',
    port: process.env.POSTGRESQL_DATABASE_PORT || 5432,
    username: process.env.POSTGRESQL_DATABASE_USERNAME || 'postgres',
    password: process.env.POSTGRESQL_DATABASE_PASSWORD || 'admin',
    database: process.env.POSTGRESQL_DATABASE_NAME || 'testdb',
    entities: ['src/**/*.entity.js'],
    autoLoadEntities: true,
    synchronize: true,
  },
});
