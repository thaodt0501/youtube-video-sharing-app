# Project Name: YouTube Video Sharing App

# Purpose: The primary goal of this project is to provide a platform for users to share their favorite YouTube videos by simply inputting the YouTube URL. It allows individuals to share their interests and discover new content, encouraging community interaction and content discovery.

# Key Features:

* User Registration and Login: Users can create their own accounts by registering with their email addresses and secure passwords. This creates a personalized space where they can manage their video shares and interactions.

* Video Sharing: Users can share YouTube videos on this platform by providing the video's URL. This could include a personal YouTube video or a favorite video from another YouTube creator.

* Browsing User's Own Videos: Users have the ability to view all the videos they have shared in one place, similar to a personal video playlist. This is a great way for users to revisit their shared content whenever they want.

* Browsing Videos Shared by Other Users: A core feature of the app is the ability to browse and watch videos shared by other users. This encourages community interaction and allows users to discover new content they might not have found on their own. This could also include features like user likes, comments, and a trending section with popular shared videos.

* Notification: Users will receive notifications whenever a video is shared, ensuring they don't miss out on any new content.

* Profile Management: Users can manage their profiles, change their personal details, and customize their settings.

The platform's goal is to build a community around shared interests in YouTube content, encouraging discovery and discussion. It's an excellent project for learning and demonstrating skills in full-stack web development, with an emphasis on user authentication, data management, video sharing, and real-time updates.

# How it works
The root of the application is the `src/components/App` component. The App component uses react-router's HashRouter to display the different pages. Each page is represented by a [function component](https://reactjs.org/docs/components-and-props.html). 

Some components include a `.slice` file that contains the definition of its state and reducers, which might also be used by other components. These slice files follow the [Redux Toolkit](https://redux-toolkit.js.org/) guidelines. Components connect to the state by using [custom hooks](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook).

This application is built following (as much as practicable) functional programming principles:
* Immutable Data
* No classes
* No let or var
* Use of monads (Option, Result)
* No side effects

The code avoids runtime type-related errors by using Typescript and decoders for data coming from the API.

Some components include a `.test` file that contains unit tests. This project enforces a 100% code coverage.

This project uses prettier and eslint to enforce a consistent code syntax.

## Folder structure
* `src/components` Contains all the functional components.
* `src/components/Pages` Contains the components used by the router as pages.
* `src/state` Contains redux related code.
* `src/services` Contains the code that interacts with external systems (API requests).
* `src/types` Contains type definitions alongside the code related to those types.
* `src/config` Contains configuration files.

# Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Installation & Configuration

Please visit github and clone both webapp and backend repository

* Webapp repository: https://github.com/thaodt0501/youtube-video-sharing-app

* Backend repository: https://github.com/thaodt0501/youtube-video-sharing-api

## Setting up for Backend
In the project directory, you can run:

### `docker-compose up -d`
Setup Mongodb database

### `yarn`
Install dependencies

### `yarn start`
Running server development mode (http://localhost:8080)

## Available Scripts for Webapp
In the project directory, you can run:

### `yarn`
Install dependencies

### `yarn start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

Note: This project will run the app even if linting fails.

### `yarn test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Docker Deployment

To deploy on a server, you need to copy your project files to the server (you could use SCP, rsync, or similar), install Docker and Docker Compose on the server, and then run docker-compose up on the server

## Webapp

In the webapp project directory, you can run: `docker-compose up` to run webapp on port 3002


# Usage
To use the application, you need to register and log in first. Once you are logged in, you can share YouTube videos by clicking on the “Share” button and pasting the video link. You can also view a list of shared videos by clicking on the “View Videos” button.  
If you are logged in and another user shares a new video, you will receive a real-time notification about the newly shared video. This notification can be displayed as a pop-up in the application, and it should contain the video title and the name of the user who shared it.

# Troubeshooting
Here are a few common issues that might occur when setting up the application, as well as some possible solutions.

- "Docker build" fails due to dependency installation issues

- The application fails to connect to the database