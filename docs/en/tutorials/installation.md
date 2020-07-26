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

The API is on localhost:8090, and the SPA is on localhost:8080

```
pnpm run dev
```

1. Run only the SPA

```
cd packages
cd web
pnpm run dev
```
Then, you can open localhost:8080.

3. Run only the API
```
cd packages
cd api
pnpm run dev
```

### Other scripts

Other scripts can be found in the package.json files. ([Root folder](blob/master/package.json), [SPA Folder](blob/master/packages/web/package.json), [API Folder](blob/master/packages/api/package.json))

- `build`: A script to build the app using webpack or tsc or maybe both depending on in what folder you run the script. The app will build in two separate `dist` folders, one for the API and one for the SPA.
- `start`: A script to start the build.
- `lint`: Runs ESLint. You can customize your configuration in `.eslintrc`.
- `format`: Runs Prettier. You can customize your configuration in `.prettierrc`.
- `check`: Runs Prettier, followed by ESLint.
- `semantic-release`: Runs semantic-release.
- `test`: Runs unit tests. These are currently only available for the API.

All of those scripts were tested on Windows Powershell as well as on GitHub Actions and are guaranteed to be working.
