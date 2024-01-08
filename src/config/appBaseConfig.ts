export const appConfig = () => ({
  serviceName: process.env.SERVICE_NAME || 'testing-backend',
  servicePort: process.env.APP_PORT || 3000,
});
