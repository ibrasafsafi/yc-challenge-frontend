# YouCan Challenge FrontEnd Documentation

## Installation

### Requirements

- NodeJS
- NPM

### FrontEnd Installation

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run cp .env.example .env
4. Run `npm run dev` to start the server
5. Open `http://localhost:9000` in your browser  (or the port you have set in vite.config.js)
6. Login with `admin@admin.com` and `password`
7. Enjoy!

### FrontEnd Description

This is the FrontEnd of the YouCan Challenge project. It is built with VueJS (Vite). It uses Axios for API calls. It is a SPA (Single Page Application) and uses Vue Router for routing. It also uses Pinia for state management.

### FrontEnd Structure

The FrontEnd is structured in the following way:

- `src` folder contains all the source code
- `src/components` folder contains all the components used in the project such as inputs, buttons, etc... (except the ones that are used in only one page)
- `src/layouts` folder contains the layouts used in the project such as the default layout, AppMenu layout, etc...
- `src/views` folder contains all the pages of the project such as the CRUD Product Pages ,login page, the register page, etc...
- `src/store` folder contains the Pinia store of the project
- `src/router` folder contains the Vue Router of the project
- `src/composables` folder contains the composables of the project such as the useResources composable, etc...

### FrontEnd Dependencies

- `axios` for API calls
- `pinia` for state management
- `vue-router` for routing
- `vite` for the build tool
- `vue` for the framework
