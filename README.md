# Todo APIs

## Configuration ⚙️

- Set environment variable
  - DB_HOST
  - DB_USER
  - DB_PASSWORD
  - DB_NAME
  - DB_PORT
  - JWT_KEY
  - PW_SALT
- Create an empty database in database server

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
- Install all librarys from package.json 
- Run server: `npm install`
- Open terminal in project root
- Run server: `npm start`

## Data Migrations We Are

- To create new migrations from model changes
- `npx sequelize-cli model:generate --name ModelName --attributes name:string`
- To update database with new changes
- `npx sequelize-cli db:migrate`