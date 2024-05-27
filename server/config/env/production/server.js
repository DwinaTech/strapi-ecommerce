module.exports = ({ env }) => ({
  proxy: true,
  host: "0.0.0.0",
  port: process.env.PORT,
  url: env("MY_HEROKU_URL"),
  app: {
    keys: env.array("APP_KEYS"),
  },
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
  },
});
