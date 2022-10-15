# Next.js OpenJira App
To run locally you need database access

```
docker-compose up -d
```

* el -d, means __detached__ 

## configure the environment variables
Rename the file __.env.template__ a __.env__

## Initi the database (Seed data)

Call API:

```
http://localhost:3000/api/seed
```