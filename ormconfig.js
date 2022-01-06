const path = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
const type = process.env.NODE_ENV === 'prod' ? 'js' : 'ts';

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${path}/models/*.${type}`],
  migrations: [`./${path}/database/migrations/*.${type}`],
  seeds: [`./${path}/database/seeds/*.${type}`],
  cli: {
    migrationsDir: `./${path}/database/migrations`
  }
};
