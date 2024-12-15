# A step-by-step guide how to run the application

1. Download the most recent version of the code on your local machine.
2. Transfer the code to ReKosh.
3. Access ReKosh Rasberry Pi via two terminals.
4. In the first terminal type the following command:

```
npm run json-server
```

This command will run a fake Flask API. That is used only when we want to simulate the Flask API!

5. If you run the fake API, look at the terminal. You should see something like this:

```
  Resources
  http://localhost:3001/state
  http://localhost:3001/start
  http://localhost:3001/stop
  http://localhost:3001/auth
  http://localhost:3001/reboot
  http://localhost:3001/shutdown

  Other routes
  /state -> /state
  /start -> /start
  /stop -> /stop
  /auth -> /auth
  /reboot -> /reboot
  /shutdown -> /shutdown

  Home
  http://localhost:3001
```

6. Copy the last URL which in our case is `http://localhost:3001`. If you use the real API, simply get the URL of the real Flask API.
7. In the second terminal, open .env file and set the URL of the API. Save and close!
8. Next, run these:

```
npm install
npm run build
```

These commands will install all missing dependencies and build the React app ready for deployment.

9. Finally, run this command to start the application:

```
serve -s build
```

This command does what it says. It will serve the build in the web browser installed on the ReKosh machine.

# Installation

Copy `.env.example` and create a new file `.env`, set the required parameters. In our case this is the URL pointing to the machine API.

Next, run the following command to install all required packaghes:

```
npm install
```

# Run

In the project directory, you can run:

## Development

### Run test API

To run the test API:

```
npm run json-server
```

Otherwise, please run the local python API before running the React application.

### `npm start` in dev mode

This is the mode used to run the application when we develop and change the code!

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Production

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Run the app on production server

After the development is ready and you have built the project, use the command below to run the application:

```
serve -s build
```

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# API endpoints for communication with external services

The API URL is in .env file.

The API endpoints are documented in `/src/hooks/useApi.jsx` file.

# Run JSON server with test data

For testing the React application we use an internal JSON server that acts as an API.

To run the JSON server execute the following command in the Terminal:

```
npx json-server --watch data/db.json --routes data/routes.json --port 3001
```

You can replace port 3001 with any port you prefer.

# Regenerate the CSS styles from the SaSS file

```
sass src/assets/css/styles.scss:src/assets/css/styles.css
```

# Add SSH key

```
eval $(ssh-agent -s)
ssh-add -K ~/.ssh/FILE_NAME_OF_THE_PRIVATE_SSH_KEY
```

# Third-party services

Bulma - https://bulma.io/documentation/

Bulma Extensions - https://wikiki.github.io/form/switch/

FontAwesome - https://fontawesome.com/icons/

React icons - https://react-icons.github.io/react-icons/

Google Fonts - https://fonts.google.com/specimen/Inter?query=inter&category=Sans+Serif

CSS loaders - https://cssloaders.github.io/

JSON server (for simulating an API) - https://www.npmjs.com/package/json-server#routes

React Router Dom v6 - https://reactrouter.com/docs/en/v6/hooks/use-outlet

Axios - https://www.digitalocean.com/community/tutorials/react-axios-react

# SVG

# Issues

If you have issues loading SVG's. In the /node_modules folder, open the react-scripts/config/webpack.config.js file and update the use property of the SVG section of the config objects as shown below:

```
module.exports = {
  // Other configuration options...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              throwIfNamespace: false,
            },
          },
          'svg-url-loader',
        ],
      },
    ],
  },
};
```
