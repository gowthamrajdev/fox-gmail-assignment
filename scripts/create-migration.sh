#!/usr/bin/env bash

source .envrc

MIGRATION_NAME=$1

if [ "$MIGRATION_NAME" == "" ]; then
  echo "specify MIGRATION_NAME"
  exit 1
fi

node_modules/.bin/sequelize migration:create --name $MIGRATION_NAME
