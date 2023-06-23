yarn add @prisma/client //prod
yarn add prisma -D //dev CLI
yarn prisma -h //help

◭ Prisma is a modern DB toolkit to query, migrate and model your database (https://prisma.io)
Usage:
$ prisma [command]

Commands:
init Set up Prisma for your app
generate Generate artifacts (e.g. Prisma Client)
db Manage your database schema and lifecycle
migrate Migrate your database
studio Browse your data with Prisma Studio
validate Validate your Prisma schema
format Format your Prisma schema

Flags:
--preview-feature Run Preview Prisma commands

Examples:
$ prisma init
Set up a new Prisma project

$ prisma generate
Generate artifacts (e.g. Prisma Client)

$ prisma studio
Browse your data

$ prisma migrate dev
Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)

$ prisma db pull
Pull the schema from an existing database, updating the Prisma schema

$ prisma db push
Push the Prisma schema state to the database

$ prisma validate
Validate your Prisma schema

$ prisma format
Format your Prisma schema
