### Installation

* `git clone git@github.com:pmservice/insurance-claim-app.git`
* `cd cinsurance-claim-app`
* `npm install` or `yarn`
* `npm run dev`

### Deploy

Easily deploy your app to Bluemix. In your `package.json` look for a script like
this: `"deploy": "cf push <<APP NAME HERE>>"`. Simply change `<<APP NAME HERE>>`
to a valid app name, and then run `npm run deploy`


## Buildign and starting production

Make sure you have the latest Stable or LTS version of Node.js installed.

* `npm run prod`

## Available Commands

- `npm start` - start the prod server
- `npm clean` - delete the dist folder
- `npm run prod` - production ready build in `dist` folder
- `npm run build:client` - production ready client code in `dist` folder
- `npm run build:server` - create a production ready server code build in `dist` folder
- `npm run lint` - execute an eslint check
- `npm test` - run all tests
- `npm run test:watch` - run all tests in watch mode
- `npm run coverage` - generate code coverage report in the `coverage` folder
- `npm run deploy` - publish application to bluemix
