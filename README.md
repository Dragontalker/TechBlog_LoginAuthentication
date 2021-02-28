# Tech Blog - How to build a login authentication system using Sequelize and Passport

## Directory Structure

```
.
├── config
│   ├── middleware
│   │   └── isAuthenticated.js
│   │
│   ├── config.json
│   └── passport.js
│   
├── models
│   ├── index.js
│   └── user.js
│ 
├── public
│   ├── js
│   │   ├── login.js
│   │   ├── members.js
│   │   └── signup.js
│   │
│   ├── stylesheets  
│   │   └── style.css
│   │
│   ├── login.html
│   ├── members.html
│   └── signup.html
│ 
│ 
│
├── routes
│   ├── api-routes.js
│   └── html-routes.js
│ 
├── node_modules
│ 
├── server.js
│ 
└── package.json

```

## Phase 1: Setting up the basic express server.

```
.
│ 
├── node_modules
│ 
├── server.js
│ 
└── package.json

```

## Phase 2: Adding the static files for view model.

```
.
│ 
├── public
│   ├── stylesheets  
│   │   └── style.css    ===> Added
│   │
│   ├── login.html       ===> Added
│   ├── members.html     ===> Added
│   └── signup.html      ===> Added
│
├── routes
│   └── html-routes.js   ===> Added
│ 
├── node_modules
│ 
├── server.js   ===> Updated
│ 
└── package.json

```



