# Introspection App
### Progress through self-reflection


## Introspection API

Version: V0
Framework: Node.js
Datastores: Mongodb

## Functionality

- Create a user account with email and password
- Login to get jwt token for auth
- Create, read, update and delete a journal entry into the database

## Contents

1. [Architecture](#Architecture)
2. Installation
3. Continous deployment
4. Testing

#### Architecture

The introspection app uses a microservices architechture. Currently the structure has the following services:

- Deployemnt: service to handle continous deployment.
- Auth api: Handles client authentication.
- Journal api: service to handle the create, read, update and delete of journal entries.
- User api: service to handle functionality for users, including registration.

#### Installation

In each of the restapi microservices (auth, journal, user) cd into the folder and install the dependencies:

````bash
$ npm install 
````

Once these are complete, you can use docker compose to run all the microservices in individual containers:

````docker
sudo docker-compose -up -d
````

The reverse proxy gateway application will be listening on port 8080

#### Continous deployment

The CI/CD strategy uses CircleCI for its operations. The configuration for this can be found in the .circleci file. 

The application will be deployed only when pushing the staging branch.

#### Testing

Testing can be conducted with Postman, there is a collection that can be imported. It is found in the root folder.

The user api has got support for jest test runner, and will be included in future builders.



