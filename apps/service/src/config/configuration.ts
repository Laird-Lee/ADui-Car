export default () => ({
  serverPort: parseInt(process.env.SERVER_PORT, 10) || 9001,
  wsPort: parseInt(process.env.WS_PORT, 10) || 9002,
  wsPath: process.env.WS_PATH,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    data: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  amamp: {
    key: process.env.AMAP_KEY,
    securityCode: process.env.AMAP_SECURITY_CODE,
  },
});
