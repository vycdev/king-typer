# King Typer
King Typer is a website created for the Infoeducatie contest and its main goal is to compete with the current typing websites that old designs, bad UX, or both and to become a nice enviroment for learning and practicing touch typing.

The developement for King Typer will continue even after the contest until I am happy with the results.

This is a monorepo, containing both the API and the front-end that are hosted separately on Heroku.

- You can visit the website [here](https://king-typer.herokuapp.com/).
- You can see links for other docs [here](main.md).

## Why is everything in English?

I chose to write everything in English because this project's main focus is to help as many people as it can to practice touch typing, and writing everything in English will open the project to far more people on the internet.

But don't worry, I plan on writing page translations for as many languages as I can in the future, but keep in mind I plan on keeping the typing tests in English because it's the best language in which you can practice touch typing.

## Architecture

### Overall:
The app is written using TypeScript, a strongly-typed superset of Javascript. The front end uses React to create a responsive web application, while the back end uses Koa to create an API. The database is run on PostgreSQL.

### File structure
The repository is a mono-repository, meaning it serves two parts of the app that are connected together, the API (application programming interface) and the SPA (single page application).

In the root folder you will find a `packages` folder which contains the `web` folder, A.K.A. the SPA, and the `api` folder.

#### The `api` folder.

The `api` folder contains the API as well as the database. This not only contains the routes which can be accessed via HTTP requests, but also the migrations and seeds for the database.

#### The `web` folder.

The `web` folder contains everything that has to do with the SPA. In the root of this folder you will find the `src` folder which contains all the code for the SPA. There is also a `public` folder that contains the `index.html` file, the configs for Babel, ESLint, Heroku, TypeScript and Webpack as well as a `package.json` file that keeps track of all the node modules in the folder.

The `src` folder is structured in:
- `index.tsx`: which contains the main app.
- `style.tsx`: which contains the styling exports for the main app.
- `server.ts`: which is the server that runs the complied app as a SPA.
- `utils`: a folder that contains imports for the above files.
- `components`: a folder which contains components that are imported in the main app to be rendered.

The `components` folder can contain other folders that are used for structuring components files. Those other folders can contain files and folders like: `style.tsx` files `<component>.tsx` files, other `components` folders, `helpers` folders with helper files in them.

This is a graphic representation of the files structure:
![files](https://cdn.discordapp.com/attachments/485859146558865408/736890481753063474/unknown.png)


## Requirements and compatibility

This project is highly optimized to run on all browsers with as little memory and computation power as possible. Running the project on any up-to-date browser will run just fine.

## Tools and languages (front end)

I want to mention that a lot of those elements listed below don't make it into the final build, but only on the front end side.

- `emotion`: Emotion is used for creating react components with styling. It's a very powerfull tool that enables me take advantage of the capabilities of TypeScript and React at the same to style my components.
- `koa`: Koa is a web framework for NodeJS, it's similar to Express but much more optimized and more focused on middleware. It is used for running the SPA.
- `react`: React is a JavaScript library for creating UI. It is very useful for managing the application design and state. It also has other powerful dependencies that helped me build the app.
- `typescript`: Typescript is a strongly-typed superset of JavaScript. Very useful in writing strongly typed code for avoiding run-time errors and errors in general.
- `babel`: Babel is a toolchain to convert newer ECMAScript code into older ECMAScript code to maximize the compatibility with older browsers.
- `webpack`: Webpack is a module bundler, combined with Babel and TypeScript, and other various plugins I can easily build or run the code live for development.
- `semantic-release`: Semantic-release is a package that determines releases and generates changelog files based on my commits using conventional commits (Using Github Actions).
- `all-contributors`: All-contributors is a package that lets me generate a nice paragraph with all the contributors in the README file.
- `eslint`:  ESLint is a linter that statically analyzes my code to quickly find problems. It can fix my errors automatically and I can customize it to follow the rules that I want for my code. For example, if I want want double quotes for every string instead of single quotes, ESLint will take care of that. Even if I accidentally use single quotes it will change them automatically when I save the file.
- `prettier`: Prettier is a code formatter which, when combined with ESlint, can save you a lot of time and energy.

## Tools and languages (back end)

Likewise, there are many tools that I use on the back end. While these are not compiled away to give the user the best performance they can, they are essential to maintaining the API.

- `koa` - Mentioned in the front end, Koa is the backbone of the API. It creates a dynamic HTTP server from which the API takes life. It is hosted on Heroku.
- `postgres` - PostgreSQL is an SQL-based database, where all the user, texts, and game data are stored.
- `knex` - Rather than interacting with the database itself, I use Knex to interact with it. Using Knex, I can write database migrations, seeds, and most importantly, interact with the database. It automatically sanitizes input and makes an easy, function-based way to interact.
- `mocha/chai` - To write unit tests, I use mocha, which is a testing library similar to Jest. These tests are complemented by chai, an assertions library.
- `joi` - When performing requests, often times there is a schema required for requests. Joi is a middleware creator that performs schema validation for you, so you can ensure that you are getting the correct schema passed in with little hassle.
- `ws` - The browser has native websockets built in, but Node.JS doesn't. To implement websockets, we use the ws module. Socket.io is not necessary, and it is bloated so it is not used.

## Testing

On the front end, I don't use integration tests, (yet) because I don't it was necessary since a lot of people tested my app including myself, (you can see who tested my app in the README file, note the people listed in the README file are not all the people that tested my app, those are just the people that tested my app and have a GitHub account), and also with the help of the tools listed above I could avoid most of the errors before doing a new release. (I also have GitHub Actions set up to check building and linting).

On the back end, I use unit tests with Mocha and Chai. These cover most of the routes and actions, ensuring that all the functionality works as expected.
