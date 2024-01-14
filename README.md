# Todo APIs


## Generate Salt value

- Open terminal
- `python`
- `import bcrypt`
- `bcrypt.gensalt(rounds=12)`
- Copy value and use as `PW_SALT`
- b'<copy_this_part>'

## Create a symmetric key for JWT encryption

- Open terminal
- `python`
- `from jwcrypto import jwk`
- `key = jwk.JWK(generate='oct', size=256)`
- `key.export()`
- Copy value and use as `JWT_KEY`

## Quick Start 🚀

- Open terminal in project root
- Run server: `npm start`

## Data Migrations

- To create a new migration for model changes.
- `npx sequelize-cli migration:generate --name migration_name`
- To apply pending migrations and update the database.
- `npx sequelize-cli db:migrate`
- To undo the last batch of migrations
- `npx sequelize-cli db:migrate:undo`

## Data Seeders

- To create a new seeder.
- `npx sequelize-cli seed:generate --name SeederName`
- To run seeders.
- `npx sequelize-cli db:seed:all`
- To undo the last batch of migrations
- `npx sequelize-cli db:migrate:undo`