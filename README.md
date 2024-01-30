# Installation

Copy `.env.example` and create a new file `.env`, set the required parameters.

Next, run the following command to install all required packaghes:

```
npm install
```

For your information, if you'd like to start a new React project you'll have to
run:

```
npx create-react-app .
```

in the directory where you'd like to initialise a React app.

# Run

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

To run the test API:

```
npm run json-server
```

## `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `npm run eject`

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
