## Freelycomment
![Test Image 1](https://raw.githubusercontent.com/ManuC84/portfolio_website/master/public/images/freelycomment-gh.png)

Freelycomment is a social network meant to enable users to comment on any website based on its url. It will eventually also feature a browser extension and a mobile app so that users don't need to copy and paste the url in order to create a new post. It features real-time notifications with socket-io and also will include more features such as adding friends, a full control panel among others. The styling is completely beta and will be revamped for final version. A deployed tech demo version can be accessed in the following link https://tender-fermat-3d5fca.netlify.app/ featuring full CRUD and operational notifications. It's currently being refactored to use RTK's async thunks. .


## Tech Stack
Freelycomment is developed with React on the front-end using Redux-toolkit for state management and material-ui for styling. For the backend it uses express.js and the database is handled by MongoDb atlas. You can check the server-side code here https://github.com/ManuC84/server

## How I worked on this project
* Freelycomment was first designed in Figma in a basic form, it has since then taken a bit of a different direction. [Initial figma design](https://imgur.com/LMh9XOz)
* The tasks were organized using Trello. [Trello workflow](https://imgur.com/xFHgFA1)
* I used githbub Branches and pull requests for better workflow and collaboration.

## How to navigate this project
* All data is fetched from the backend using redux toolkit async thunks. The data is then dispatched to the components and served. [Redux slice example](https://imgur.com/IWa2ILl)
* Responsive css styling is achieved with material-ui for the tech demo, however for definitive styling the project will use styled-components. 
* On the backend express fetches data from MongoDb and serves it to the front end. [Express Example](https://imgur.com/U46qf7P)

## Why I built the project this way

I knew the application would eventually become quite large so I went with redux to have a good command over the state management. I had used Redux before but not the toolkit version so I decided to give it a shot and I'm glad I did because all the new features make working with it a breeze, specially due to the lack of cumbersome boilerplate and not needing to add constants for every dispatch action. What I missed was how to use the createAsyncThunk middleware so now I'm currently refactoring the code to include that functionality. You can check the work in progress in the branch called refactor-database-client. So far the work has been mainly on backend, database and state management, for this reason and due to the fact that I'm only one person working in the project the styling has been provisionally taken care of by using material-ui. Eventually this will be revamped to custom css styling with styled-components for a much improved and original look.

## What's next

* Finishing the work on refactoring redux code and also the database structure in order to greatly improve performance and data normalization.
* Adding functionality to sort posts based on different criteria and categories
* Creating a control panel for users to be able to see all their information and change profile picture
* Adding notification functionality for google oAuth users as well
* Revamping the entire styling of the app
* Adding social features to main page
* Making a new landing page (existing one was made provisionally to apply for a government grant for potential start-ups)

## Available Scripts

If you plan to clone this project please check the .env example file located in the src folder in order to have the necessary environmental variables. Then in order to download all the dependencies run npm init and then in order to run the app please use npm run sta which will use the deployed backend on Heroku. 
