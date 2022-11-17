# About

This project was created with [express-react-typescript-generator](https://github.com/0allen0/express-react-typescript-generator).

## Project Structure

```
my-app
├── README.md
├── Dockerfile
├── .gitignore
├── .dockerignore
├── app
└── web
```

`app` was built by [express](https://expressjs.com/)

`web` was built by [react](https://reactjs.org/)

# Quick Start

## Run locally

### `Run express server in /app`

```
npm start
```

or

```
yarn start
```

### `Run react in /web`

```
npm start
```

or

```
yarn start
```

Yes, no further questions, you can start code now.

The local CORS issue has fixed by the `http-proxy-middleware`

# Build

## Docker Build

```
docker build -t express-react-typescript-generator .
```

## Build the executable file

1. cd `/web`, run `yarn run build`
2. cd `/app`, run `yarn run build`, then will generate an executable file in `/app/pkg` folder

In `/app/package.json` file, you can change the execution environment

```
"pkg": {
    ...
    "targets": [
      "node14-linux-arm64"
    ],
    ...
  }
```
