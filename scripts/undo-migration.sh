#!/usr/bin/env bash

source .envrc
node_modules/.bin/sequelize db:migrate:undo
