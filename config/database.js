module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: process.env.DATABASE_CLIENT,
      settings: {
        host: env("DATABASE_HOST", process.env.DATABASE_HOST),
        srv: env.bool("DATABASE_SRV", false),
        port: env.int("DATABASE_PORT", process.env.DATABASE_PORT),
        database: env("DATABASE_NAME", process.env.DATABASE_NAME),
        username: env(
          "DATABASE_USERNAME",
          process.env.MONGO_INITDB_ROOT_USERNAME
        ),
        password: env("DATABASE_PASSWORD", process.env.DATABASE_PASSWORD),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", "admin"),
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  },
});
