# Instalation guide.

### Clone the repo.

Copy the link for cloning any branch you want, for example:

```
git clone https://github.com/Vyctor661/king-typer.git
```

### Install dependencies.

I used pnpm to manage all my dependencies. In the root folder run this command to install all the dependencies:

```
pnpm i
```

### Run the dev command and enjoy

Run the dev command in any way you want:

1. Running both the API and the SPA.

API is on localhost:8090 (note the API is not even close to being started to be coded and it's not used yet, it's intended to be used in the future for managing accounts, multiplayer, a database and other things like that)

SPA is on localhost:8080

```
pnpm run dev 
```

2. Run only the SPA

```
cd packages
cd web
pnpm run dev
```
Then you can open localhost:8080

3. Run only the API
```
cd packages
cd api
pnpm run dev
```

### Other scripts

Other scripts can be found in the package.json files. ([Root folder](https://github.com/Vyctor661/king-typer/blob/master/package.json), [SPA Folder](https://github.com/Vyctor661/king-typer/blob/master/packages/web/package.json), [API Folder](https://github.com/Vyctor661/king-typer/blob/master/packages/api/package.json))

- `build`: A script to build the app using webpack or tsc or maybe both depending on in what folder you run the script. The app will build in two separate `dist` folders, one for the API and one for the SPA.
- `start`: A script to start the build.

There are also other scripts for linting, semantic-release etc.
