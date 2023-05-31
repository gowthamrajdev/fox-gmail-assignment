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

Fox Rules and actions configs file is in `rules/rules-details.json` directory. Please do refer `src/service/rules-constant/filters-conditions.js` and `src/service/rules-constant/actions-conditions.js` files to define the config.

Below are the mapping for the config:
   1. `rules` will have all the set of rules as array.
   2. For `field` refer keys from the `FIELD` in the `filters-conditions.js`.
   3. For `predicate` refer keys from the `PREDICATE_STRING`/`PREDICATE_DATE` in the `filters-conditions.js`.
   4. `value` will be value for ur rule.
   5. `ruleType` refer keys from `RULE_FILTER_TYPE` in the `filters-conditions.js`
   6. `actions` will have all the set of actions as array.
   7. For action `field` refer keys from `ACTION_KEYS_WORDS` in the `actions-conditions.js`.
   8. For action `value` refer keys from `ACTION_TYPE` in the `actions-conditions.js`.


## APIs:
1. Gmail oAuth Login and Mail sync - `http://localhost:3000/users/auth/gmail/login`
2. Perform Fox Rules and actions - `http://localhost:3000/mail-rules/submit`

## Note:
1. Once logged in open a new tab in a browser and hit `Fox Rules and actions` API, then see the result in the logged in gmail.
2. Do the rules/action changes in `rules/rules-details.json`.
