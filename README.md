# Language Exchange Frontend

Frontend for the Language Exchange App built with **React**, **Material UI**, and **Redux Toolkit**.

##  Technologies Used

- React (Create React App)
- Material UI (MUI)
- Redux Toolkit
- React Router
- Axios

##  ENV
Create a `.env.local` file in the root of your project with the following:
REACT_APP_API_URL=your_api_url (example http://localhost:3333/api)

## APP Setup

### Install all dependencies
-    "@emotion/react"
-    "@emotion/styled"
-    "@mui/joy"
-    "axios"
-    "react"
-    "react-dom"
-    "react-redux"
-    "react-router-dom"

> [!NOTE]
> npm start --_this is the command to start the app_

## Usage Instructions

    1.	Start the backend first – make sure it’s running at the API URL you configured in .env.local.
    2.	Then start the frontend with npm start.
    3.	Use the app step by step:
    •	✅ Register an account
    •	🔐 Log in
    •	🌐 Configure your native and target languages
    •	🔍 Use the search to find matching users
    •	📤 Send match requests
    •	📥 View and respond to incoming requests (accept/reject)
    •	🤝 See confirmed matches

> [!IMPORTANT]
> First register user with name `Admin`. Only this user has access to 'Languages' page where you can add new languages to DB

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
