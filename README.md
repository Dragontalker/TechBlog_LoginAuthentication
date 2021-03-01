# Tech Blog - Reverse Engineering

## 1. __Introduction__

When joining a new team as a full stack developer, you will be expected to inspect a lot of code that was made by developers who worked on the project before. Therefore, being able to dissect the code and understanding the underlying logic of the code is a key skill for a professional full stack developer. 

---

## 2. __Background Information__

In this blog, we will take a look at a full stack project which is a login authentication system. It follows a __MVC (Model-View-Controller)__ architect design pattern and uses __ORM (Object-Ralational Mapping)__ in its model component. Furthermore, it uses hash function as encryption method for password data. These are the three key concepts we have to understand before we discuss the code inside this project. Let's take a deeper look at them.

---

### 2.a __What is MVC?__

Here is a definition from Wikipedia:

> [__Model-View-Controller__ (usually known as __MVC__) is a software design pattern commonly used for developing user interfaces that divides the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user.  ](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

---

### 2.b __What is ORM?__


> [__Object-relational Mapping__ (__ORM__, __O/RM__ and __O/R mapping tool__) in computer science is a programming technique for converting data between incompatible type systems using object-oriented programming languages. This creates, in effect, a "virtual object database" that can be used from within the programming language. There are both free and commercial packages available that perform object-relaional mapping, although some programmers opt to construct their own ORM tools. ](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)

---

### 2.c __What is Hash?__

After we fully understand these two key concepts and see how it is implemented on this project, it will be a lot easier to use this project a starting point for future development.

---

## 3. __To get started__

This blog is intended for developer who has some knowledge in full stack development. The prelimianry knowledge includes: 

* __Front-end Development__: 
    - HTML 
    - CSS
    - JavaScript
    - jQuery
    - Ajax
* __Back-end Development__: 
    - Node.js
    - Express.js
    - JSON
    - API
* __Database__: 
    - MySQL

If you do not understand any of the technology listed above, make sure you do a quick Google search or take a YouTube tutorial to gain an idea of how it works. These technologies are essential to understand this project. If you are ready, let us move to the more advance parts. 

There are three advanced topics we are going to disucss in details, includes:

1. Using __Sequelize__ as a Object-Relational Mapping tool between Node.js and MySQL;
2. Using __Bcrypt__ to encrypt password data and __Passport__ as an authentication too.
3. Identifying the different components of MVC.
4. Understanding data flow in MVC for two main feature: Sign Up and Log In.

Ready? Let's start!

---

## 4. __Sequelize as ORM__

You can find the official document on Sequalize here: https://sequelize.org/master/

FindOne: https://sequelize.org/master/manual/model-querying-finders.html

```javascript
const project = await Project.findOne({ where: { title: 'My Title' } });
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof Project); // true
  console.log(project.title); // 'My Title'
}
```

Create: https://sequelize.org/master/manual/model-querying-basics.html

```javascript
const user = await User.create({
  username: 'alice123',
  isAdmin: true
}, { fields: ['username'] });
// let's assume the default of isAdmin is false
console.log(user.username); // 'alice123'
console.log(user.isAdmin); // false
```


## 5. __Npm package: bcrpyt__

## 6. __Npm package: passport__

## __7. Understanding the MVC components__

### 7.a _Model_

```
.  
├── config
│   └── config.json
│ 
└── models     
    ├── index.js        
    └── user.js         
```

### 7.b _View_
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

### 7.c _Controller_
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

