# Users API

This API is responsible for the Account, User, Order (and more!) data from TemPão.

## Dependencies

 - Docker
 - NPM

## Architecture

This is a NodeJS Express API which runs on an Elastic Beanstalk in AWS. The data source is a Postgres RDS also hosted in AWS.

### How to Run

Linux, macOS:
```
make install && make run/dev
```

Windows:
```
npm install
docker-compose -f ./docker-compose.dev.yml up -d
npm start
```

When running locally, the postgres service database includes sample data.

### How to Deploy

This is deployed via CircleCI to an Elastic Beanstalk hosted in AWS. Simply create a pull request and, 
when merged to master, manually approve the deployment in CircleCI.