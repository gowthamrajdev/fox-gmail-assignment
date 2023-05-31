# fox-gmail-assignment

## SetUp
`npm install`

## Database setup
   
step 1: Install postgres and login as admin  
        `psql -U postgres` 
step 2: Create User 
        `create USER foxgmaildb;` 
step 3: Create Database
        `create database foxgmail;`
step 4: Create User Password
        `alter user foxgmaildb with encrypted password 'password';`
step 5: User and DB mapping       
        `grant all privileges on database foxgmail to foxgmaildb;`

## Migrations

Run Up Migrations: `./scripts/run-migration.sh`
Run Down Migrations: `./scripts/undo-migration.sh`

-- Development
Create new Migrations: `./scripts/create-migration.sh $migration-name`

## Gmail API Setup

Google credentials are in `initializers/google-credentials.json` directory.Update your own google credentials here.


## Start
dev - `npm run watch`

Server port: http://localhost:3000

## Fox Rules Config

Fox Rules and actions configs are in `rules/rules-details.json` directory.

