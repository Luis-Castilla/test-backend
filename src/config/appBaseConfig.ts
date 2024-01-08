export const appConfig = () => ({
  serviceName: process.env.SERVICE_NAME || 'testing-backend',
  port: process.env.APP_PORT || 3000,
});
