[Demo live](https://simple-react-starterkit.herokuapp.com/)
This is a very basic react starter kit if you are a beginner and wants to develop your stand alone project

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn lint`

Check for lint errors in files.<br />


### `yarn lint-fix`

fix some lint errors like prettier in files.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Routing

Routing is configured in /src/App.js in Switch and Route

## Context

Application Context is also configured with custom context provider where you can fetch set context for your application to use as Context.

## Redux

Redux folder structure with actions, reducers and store with capablity to use localStorage

### Project Structure
  1. Public: All the assests like images,css.
  2. Src: All the working code having structure 
     1. Components: Contains all the reusable components that can be use
     2. Routes: Contains all the routes of our web app like home, about (components that needs to render on a particular route)
     3. Actions: All the actions responsible for redux.
     4. Reducers: Reducers for redux.
     5. Store: store of redux.
     6. localStorage: code related to localstorage
