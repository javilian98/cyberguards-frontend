# Cyberguards Frontend App

## Environment variable configurations

1. rename your .env copy file to .env

## Running in Docker Compose:

1. Uncomment the first BFF_SERVICE_URL variable if you are running your BFF (Orchestrator) service using Docker Compose:

```
# BFF_SERVICE_URL=http://bff-service:9999
```

2. Comment the second BFF_SERVICE_URL variable

```
# BFF_SERVICE_URL=http://localhost:9999
```

3. Make sure your compose.yaml file is within the same directory level as this project and other services folder e.g.:

```
root project folder
  - /cyberguards-frontend
  - /cyberguards-be-cases
  - ...
  - compose.yaml
```

4. Make sure before running the command below, you are in the same directory level as compose.yaml shown above

```
docker compose up -d --build
```

## Running in non-Docker Compose environment:

1. Uncomment the second BFF_SERVICE_URL variable if you are running your BFF (Orchestrator) service going to use 'npm run dev' command:

```
# BFF_SERVICE_URL=http://localhost:9999
```

2. Comment the second BFF_SERVICE_URL variable

```
# BFF_SERVICE_URL=http://bff-service:9999
```

3. Install node_module dependencies by running the command:

```
npm install
```

4. Run the application

```
npm run dev
```

## Running Unit Tests:

1. Install node_module dependencies by running the command if you haven't:

```
npm install
```

2. To run the tests, run the following command:

```
npm run test
```
