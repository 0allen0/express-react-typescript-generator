<img alt='overnightjs' src='https://raw.githubusercontent.com/0allen0/express-react-typescript-generator/main/doc/top.jpg' border='0'>

[Express](https://expressjs.com/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) application generator.

<a href="https://www.npmjs.com/package/express-react-typescript-generator" target="_blank"><img src="https://img.shields.io/npm/v/express-react-typescript-generator.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/express-react-typescript-generator" target="_blank"><img src="https://img.shields.io/npm/l/express-react-typescript-generator.svg" alt="Package License" /></a>

## Why express-react-typescript-generator?

When you find this project, maybe you already know something about react, express and typescript. And you've probably already used [creat-reacte-app](https://create-react-app.dev/) or [express-generator](https://expressjs.com/en/starter/generator.html), but you can't search for a scaffold to cover everything including both of them and some other parts with `typescript`, so this project was born out of that.

## What's Involved?

- [creat-reacte-app](https://create-react-app.dev/)
- [express](https://expressjs.com/)
- [pkg](https://www.npmjs.com/package/pkg)
- [docker](https://www.docker.com/)
- format
  - [prettier](https://prettier.io/)
  - [eslint](https://eslint.org/)

## Quick Start

The quickest way to get started is to use npx and pass in the name of the project you want to create.

```
npx express-react-typescript-generator "project name"
```

If you use `yarn`

```
npx express-react-typescript-generator "project name" --yarn
```

Then you will get a sample project with react and express `(typescript)`

## Run local

#### `Run express server in /app`

```
npm start
```

or

```
yarn start
```

#### `Run react in /web`

```
npm start
```

or

```
yarn start
```

Yes, no further questions, you can start coding now.

The local CORS issue has been fixed by the `http-proxy-middleware`

## Build

As we all know, is easy to build the react app to several simple files, but in most cases, for express, you need to copy the `node_modules` to the server of docker image, which may waste a lot of time and takes up a lot of space, so we use `pkg` to build the express server.

If you just want to build a docker image, just run

```
docker build -t express-react-typescript-generator .
```

If you want to build Build the executable file

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

Happy web deving :)

## License

[MIT](LICENSE)
