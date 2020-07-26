# King Typer
King Typer is a website created for the Infoeducatie contest and its main goal is to compete with the current typing websites that old designs, bad UX, or both and to become a nice enviroment for learning and practicing touch typing.

The developement for King Typer will continue even after the contest until I am happy with the results.

This is a monorepo, containing both the API and the front-end that are hosted separately on Heroku.

- You can visit the website [here](https://king-typer.herokuapp.com/).
- You can see links for other docs [here](main.md).

## Why is everything in English?

I chose to write everything in English because this project's main focus is to help as many people as it can to practice touch typing, and writing everything in English will open the project to far more people on the internet.

But don't worry, I plan on writing page translations for as many languages as I can in the future, but keep in mind I plan on keeping the typing tests in English.

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

# Updates since Infoeducatie 2020 Online stage

## Theme changes

Now there are 2 themes. The default one which is the light theme and the dark mode theme. The theme can be changed in the profile tab after you login/register.

![Light Theme](https://cdn.discordapp.com/attachments/658679294515478534/737009277075456010/unknown.png)
![Dark Theme](https://cdn.discordapp.com/attachments/658679294515478534/737009486342127637/unknown.png)

The dark theme helps for people that don't like bright lights comming from their monitors either at night or during the day.


## Removed the statistics page

But it's actually still there, and the data is still stored we just thought it would be better by not having the statistics tab since the page was outdated and it only displayed localStorage data.

## Improvements to the typing page

### New start typing page

The new start typing page has now as default a page that shows you the latests scores and latests personal bests. (You can also click on a user's name to go to their profile page)

![latestScoresAndPersonalBests](https://cdn.discordapp.com/attachments/658679294515478534/737010038891216906/unknown.png)

Not only but there is also a navigation bar for the start typing page.

![NavigationBar](https://cdn.discordapp.com/attachments/658679294515478534/737010074324566036/unknown.png)

As you can see we now have Practice mode and Multiplayer mode.

#### In practice mode we have

Easy mode which is a typing test of 60 seconds for the easy mode with random non capilized and no punctuation words.

Normal mode which is a typing tests of 60 seconds that gives you a random text/quote from different texts from the database. It can be from a book, a game, a movie etc.

Tutorials which im gonna cover in a moment.

![NewFunctionalities to the typing box](https://cdn.discordapp.com/attachments/658679294515478534/737010108671852594/unknown.png)
![NewFunctionalities to the typing box](https://cdn.discordapp.com/attachments/658679294515478534/737010161389928488/unknown.png)

#### In multiplayer mode we have

In this mode we have easy and normal which is basically easy and normal mode but with multiplayer. More on this a little bit later.


### Tutorials

Yes we now have toutorials which are basically the same as an easy/normal typing test but you have more time to complete them and they have specially designed texts for typing improvement.

We also have requirements for those. If you dont have a certain wpm score and accuracy it won't count as a completed tutorial. You can retake tutorials as many times as you want.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010206797463593/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010254482767892/unknown.png)

### And finally multiplayer

When you join multiplayer you will be put in a queue, when that queue reaches 2 players you will join the game where you can race vs other players. (This is where websockets are used)

![](https://cdn.discordapp.com/attachments/658679294515478534/737010299810611281/unknown.png)

![](https://cdn.discordapp.com/attachments/658679294515478534/737014557318447244/Screenshot_3.png)


# Next we have the accounts system


We now have a login/register/forgotpassword page.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010958299299850/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737011045142626365/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737011089249927259/unknown.png)


We have also implemented email verification and users that dont have their email verified have their role set as "unverified" and members with a verified email have their role set as "member".
There is also another role "admin" but we will talk about that later.


# Profile page

We also have profile pages. And you can see other people's profiles as well if you know their id.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010349768966334/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010382824276019/unknown.png)

As you can see there are a lot of things to talk about.

- You get a name displayed
- You have a user's role and level. (we have an xp system)
- You can see their id
- You have a users general data like Average wpm accuracy etc
- You have some settings buttons that dont appear on other user's profiles
- You can see your description and if it is your profile you can change it by clicking it.
- The change flag setting is for changing the flag next to your name to whatever country you want. We use a public api for getting the countries and thier flags.
- Change password will open a box that will let you change your password.
- Switch theme is the button that switches between light mode and dark mode.
- Dashboard (more details below) is only avalible for admins and it basically takes you to a dashboard page that can only be accessed by admin users.
- Logout is the logout button, pretty self explanatory.
- Last n games which is a graph and a list of your last 10 games which also determine your average scores
- All personal bests is a list and a graph with all your personal bests so you can see your growth over the time
- And finally achievements which are well achievements, those can be completed by doing various tasks described in there.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010419922763786/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010459601010768/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010506212180028/unknown.png)

# Dashboard

The last new feature (that you can see on the frontend at least) is the dashboard. Here you have access to editing a bunch of stuff and you can also add stuff or delete it.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010622159388702/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010660520493146/unknown.png)

As you can see there are 3 pannels.

And you can access the edit feature by clicking on a row, or if you want to add something new by clicking the button at the end of the list.

- Pannel 1 is for users which lets you edit/delete users.
- Pannel 2 is for texts which lets you add/edit/delete texts that can be for either the easy mode, the normal mode or the tutorial mode.
- Pannel 3 is for achievements, it lets you add/edit/delete achievements.

![](https://cdn.discordapp.com/attachments/658679294515478534/737010839113957517/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010697027715182/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010731563614270/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010766892236830/unknown.png)
![](https://cdn.discordapp.com/attachments/658679294515478534/737010799230451812/unknown.png)



# And those are the new features on King Typer

I want to thank Brandon for helping me finish the project and being on my team. It couldn't do it without him due to time constraints because of some personal stuff that happened lately. I only had about 2 weeks left for me to finish the project.

I also want to thank all the testers that gave me feedback while adding new features and editing old ones.

There is still a long way to go and I would've liked to have more time to polish the frontend and the backend because it was kinda hard for me to scale the webapp and also I am not happy with all the design choices that I made. I will continue to work on it even after infoeducatie, but for now I wanted to see the functionality.

And in the end I want to thank you for reading everything that I wrote, it took me some time hehe :)