DevIntent Angular Example
=============================

This is an example repo for sharing some best practices and creating public reproductions for
Angular bug reports.

## Coding Guidelines

- Please see the [contributing docs](CONTRIBUTING.md).
- Note the settings in [.editorconfig](.editorconfig) and enable EditorConfig for your Editor or IDE.

## Required tools
* [Node.js](https://nodejs.org/download/) LTS w/ NPM 5+
* Firebase CLI - `npm install -g firebase-tools`

### Step 1) Get Your Local Environment setup

* `git clone <repo>`
* `cd angular-example`
* `npm install`
* `npm start` will start a server locally
* `npm test` to run the tests

### Step 2) Deploy The App to Production (Admins only)

* Generate minimized production build - `npm run build-prod`
* `firebase login`
* `npm run deploy-prod`
