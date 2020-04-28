# King Typer

King Typer is a website created for the infoeducatie contest and it's main goal is to compete with the current typing websites that either have old designs, bad UX or even both and to become a nice enviroment for learning and practicing touch typing.

The developement for King Typer will continue even after the contest until I am happy with the results.

This is a monorepo, containing both the API and the front-end that are hosted separately on heroku.

- You can visit the website [here](https://king-typer.herokuapp.com/).
- You can see links for other docs [here](https://github.com/Vyctor661/king-typer/blob/docs/docs/main.md).

## Why is everything in English?

I chose to write everything in english because this project's main focus is to help as many people as it can to practice touch typing, and writing everything in english will open the project to far more people on the internet.

But don't worry I plan on writing page translations for as many countries as I can in the future, but keep in mind I plan on keeping the typing tests in english because it's the best language in which you can practice touch typing.

## Architecture

### Overall:
The app is written using TypeScript, a strongly-typed superset of Javascript which is combined with React to create a responsive web application.

### File structure
The repository is a mono-repository meaning it serves two parts of the app that are connected together, the API (application programming interface) and the SPA (single page application).

In the root folder you will find a `packages` folder which contains the `web` folder, A.K.A. the SPA, and the `api` folder. 

#### The `api` folder.

The `api` folder contains a simple api server that not developed yet, but it's planned on being used in the future to manage the accounts, mutiplayer typing tests, everything that is gonna store use the database, etc. The API will be hosted on a different server and it will communicate with the SPA through simple HTTP requests.

#### The `web` folder.

The `web` folder contains everything that has to do with the SPA. In the root of this folder you will find the `src` folder which contains all the code for the SPA. There is also a `public` folder that contains the `index.html` file and there are the configs for babel, eslint, heroku, typescript and webpack as well as a `package.json` file that keeps track of all the node modules in the folder.

The `src` folder is structured in:
- `index.tsx`: which contains the main app.
- `style.tsx`: which contains the styling exports for the main app.
- `server.ts`: which is the server that runs the complied app as a SPA.
- `utils`: a folder that contains imports for the above files.
- `components`: a folder which contains components that are imported in the main app to be rendered.

The `components` folder can contain other folders that are used for structuring components files. Those other folders can contain files and folders like: `style.tsx` files `<component>.tsx` files, other `components` folders, `helpers` folders with helper files in them.

This is a graphic representation of the files structure:
![files](https://github.com/Vyctor661/king-typer/blob/docs/docs/assets/gourcefiletree.png)

## Requirements and compatibility

This project is highly optimized to run on all browsers with as little memory and computation power as possible. Running the project on any up to date browser will run just fine.

## Tools and languages

I want to mention that a lot of those elements listed below don't make it into the final build.

- `emotion`: Emotion is used for creating react components with styling. It's a very powerfull tool that let's me take advantage of the capabilities of typescript and react at the same to style my components.
- `koa`: Koa is a web framework for node js, it's like express but much more optimized and more focused on middleware. I use it for creating a SPA server to host the SPA on heroku.
- `react`: React is a js library for creating UI. It is very good for managing the application design and state. And it has other powerful dependencies that helped me build the app.
- `typescript`: Typescript is a strongly-typed superset of JavaScript. Very useful in writing strongly typed code for avoiding run-time errors and errors in general.
- `babel`: Babel is a toolchain to convert newer ECMAScript code into older ecmascrip code to maximize the compatibility with older browsers.
- `webpack`: Webpack is a module bundler, combined with babel and typescript, and other various plugins I can easily build or run the code live for development.
- `semantic-release`: Semantic-release is a package that determines releases and generates changelog files based on my commits using conventional commits (Using github actions).
- `all-contributors`: All-contributors is a package that let's me generate a nice paragraph with all the contributors in the README file.
- `eslint`:  Eslint is a linter that statically analyzes my code to quickly find problems. It can fix my errors automatically and I can customize it to follow the rules that I want for my code. (for example maybe I want want double quotes for every string instead of single quotes, eslint will take care of that even if I accidentaly use single quotes it will change them automatically when I save the file)
- `prettier`: Prettier is a code formatter that when combined with ESlint it can save you a lot of time and energy.

## Testing

I don't use integration tests, (yet) because I don't it was necessary since a lot of people tested my app including myself, (you can see who tested my app in the README file, note the people listed in the README file are not all the people that tested my app, those are just the people that tested my app and have a GitHub account), and also with the help of the tools listed above I could avoid most of the errors before doing a new release. (I also have github actions set up.)



