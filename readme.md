# Introspection App
### Progress through self-reflection


## Introspection API

version: v0
framework: node.js

## Contents

1. Architecture
2. Installation
3. Continous deployment
4. Testing
5. Logging

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