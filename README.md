# Tech Blog - Reverse Engineering

## 1. __Introduction__

When joining a new team as a full stack developer, you will be expected to inspect a lot of code that was made by developers who worked on the project before. Therefore, being able to dissect the code and understanding the underlying logic of the code is a key skill for a professional full stack developer. 

---

## 2. __Background Information__

In this blog, we will take a look at a full stack project which is a login authentication system. It follows a __MVC (Model-View-Controller)__ architect design pattern 

> __Model-View-Controller__ (usually known as __MVC__) is a software design pattern commonly used for developing user interfaces that divides the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user. \
_(Source: https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)_

and uses __ORM (Object-Ralational Mapping)__ in its model component. 

> __Object-relational Mapping__ (__ORM__, __O/RM__ and __O/R mapping tool__) in computer science is a programming technique for converting data between incompatible type systems using object-oriented programming languages. This creates, in effect, a "virtual object database" that can be used from within the programming language. There are both free and commercial packages available that perform object-relaional mapping, although some programmers opt to construct their own ORM tools. \
_(Source: https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)_

After we fully understand these two key concepts and see how it is implemented on this project, it will be a lot easier to use this project a starting point for future development.

---

## 3. __To get started__

This blog is intended for developer who has some knowledge in full stack development. The prelimianry knowledge includes: 

* __Front-end Development__: 
    - HTML 
    - CSS
    - JavaScript
    - jQuery
    - Ajax. 
* __Back-end Development__: 
    - Node.js
    - Express.js
    - JSON
    - API.
* __Database__: 
    - MySQL.

If you do not understand any of the technology listed above, make sure you do a quick Google search or take a YouTube tutorial to gain an idea of how it works. These technologies are essential to understand this project. If you are ready, let us move to the more advance parts. 

There are three advanced topics we are going to disucss in details, includes:

1. Using __Sequelize__ as a Object-Relational Mapping tool between Node.js and MySQL;
2. Using __Bcrypt__ to encrypt password data and __Passport__ as an authentication too.
3. Identifying the different components of MVC.
4. Understanding data flow in MVC for two main feature: Sign Up and Log In.

Ready? Let's start!

---

## 4. __Sequelize as ORM__

## 5. __Npm package: bcrpyt__

## 6. __Npm package: passport__

## __7. Understanding the MVC components__

### _7.a Model_

```
.  
├── config
│   └── config.json
│ 
└── models     
    ├── index.js        
    └── user.js         
```

### _7.b View_
```
.
└── public     
    ├── stylesheets  
    │   └── style.css
    │
    ├── login.html
    ├── members.html
    └── signup.html
```

### _7.c Controller_
```
.
├── config
│   ├── middleware
│   │   └── isAuthenticated.js      
│   │   
│   └── passport.js     
│   
│ 
├── public     
│   └── js
│       ├── login.js    
│       ├── members.js
│       └── signup.js
│
├── routes      
│   ├── api-routes.js   
│   └── html-routes.js  
│ 
└── server.js
```

## Directory Structure

```
.
├── config
│   ├── middleware
│   │   └── isAuthenticated.js      
│   │
│   ├── config.json     ---> Database Information
│   └── passport.js     ---> Passport Autentication
│   
├── models      ===> Models
│   ├── index.js        ---> Main model controler
│   └── user.js         ---> Sequalized creation and bcrpt encrytion
│ 
├── public      ===> Views
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
├── routes      ===> Controller
│   ├── api-routes.js   ---> API controller
│   └── html-routes.js  ---> Static file controller
│ 
├── node_modules
│ 
├── server.js
│ 
└── package.json
```

```javascript
sequelize.define("User", {
    email:{
        type: Data.Types.STRING,
        allowNull: false,
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    }
})
```

```sql
CREATE TABLE User (
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
)
```

