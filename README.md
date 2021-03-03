# Tech Blog - Reverse Engineering

## [Walkthrough Video](https://drive.google.com/file/d/1ABR82_Y_Qe5RuKFd3vxjX3ImYKJ2pWiV/view)

## __1. Introduction__

When joining a new team as a full stack developer, you will be expected to inspect a lot of code that was made by developers who worked on the project before. Therefore, being able to dissect the code and understanding the underlying logic of the code is a key skill for a professional full stack developer. 

__Here is a overview of directory structure of the source code we got:__

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

---

## __2. Background Information__

In this blog, we will take a look at a full stack project which is a login authentication system. It follows a __MVC (Model-View-Controller)__ architect design pattern and uses __ORM (Object-Ralational Mapping)__ in its model component. Furthermore, it uses hash function as encryption method for password data. These are the three key concepts we have to understand before we discuss the code inside this project. Let's take a deeper look at them.

---

### __2.a. What is MVC?__

Here is a definition from Wikipedia:

> [__Model-View-Controller__ (usually known as __MVC__) is a software design pattern commonly used for developing user interfaces that divides the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user.  ](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

In our own words, MVC describes how data flows in our web application. For example, when the user tries to login, the email and password are passed from View to Controller, Controller then selected the correct model to possess this data. Once the data is processed by the Model and returns the result, then Controller updates the View based on that result. Therefore, understanding the MVC is equivalent to understanding the data flow itself. This is why we called it a architect design pattern. 

---

### __2.b. What is ORM?__

Here is a definition from Wikipedia:

> [__Object-relational Mapping__ (__ORM__, __O/RM__ and __O/R mapping tool__) in computer science is a programming technique for converting data between incompatible type systems using object-oriented programming languages. This creates, in effect, a "virtual object database" that can be used from within the programming language. There are both free and commercial packages available that perform object-relaional mapping, although some programmers opt to construct their own ORM tools. ](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)

ORM is just an alternative way to database query language. Traditionally, we just pass a query language string such as "SELECT * FROM tables" into the database to interact with it. ORM, on the other hand, use a object structure to perform the same task, which is more similar to JavaSript syntax. 

---

### __2.c. What is Hash?__

Here is a definition from Wikipedia:

> [A __hash__ function is any function that can be used to map data of __arbitrary size__ to __fixed_size__ values.](https://en.wikipedia.org/wiki/Hash_function)

Sounds complicated eh? Do not worry, we just need to know this is the way to encrypt our password so it does not get stolen by other people on the internet. That is all we need to know and packages such as `bcrupt` and `passport` will take care of everything. 

---

## __3. Techs: What You Need To get started__

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

Ready? Let's get started!

---

## __3.a. Sequelize as ORM__

Sequelize has many useful features, where we will be only using two of them in this project. If you are interested in Sequalize, check the official documents on their [website](https://sequelize.org/master/).

The two functions we will be using are `create` and `findOne`.

---

### __3.a.i. create() method__

`create` builds a new table on our MySQL database, which is equivalent to `CREATE TABLE` in query language. Here is a quick example from [Sequelize online document](https://sequelize.org/master/manual/model-querying-basics.html).

```javascript
const user = await User.create({
  username: 'alice123',
  isAdmin: true
}, { fields: ['username'] });
// let's assume the default of isAdmin is false
console.log(user.username); // 'alice123'
console.log(user.isAdmin); // false
```

This method is mainly used to store user information when Sign Up event is triggered from signup.html. 

---

### __3.a.ii. findOne() method__

`findOne` searches the table and return the query that matching the searching criteria, which is equivalent to 'SELECT FROM ... WHERE ...' in query language. Here is a quick example from [Sequelize online document](https://sequelize.org/master/manual/model-querying-finders.html).

```javascript
const project = await Project.findOne({ where: { title: 'My Title' } });
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof Project); // true
  console.log(project.title); // 'My Title'
}
```
This method is mainly used to matching user information when Log In event is triggered from login.html.

---

## __3.b. Npm package: bcrpyt__

As we mentioned in previous sections, `bcrypt` is a library that helps us hash the password data. Here is a quick usage example from their [npm page](https://www.npmjs.com/package/bcrypt):

```javascript
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
```

## __3.c. Npm package: passport__

As a companion to `bcrypt`, `passports` helps handle the authentication process when user tries to log in. Here is a quick usage example from their [npm page](https://www.npmjs.com/package/passport):

```javascript
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
```

## __4. Understanding the MVC__

Okay, now we have all the tools we need, time to dissect the code! Remember the direcotry structure graph in the intruduction section? Let's divide that graph into components of MVC so that we have a better picture of how MVC works.

---

### __4.a. Model Components__

As we have discussed, Model includes all the stuffs related to database. `config.json` and `index.js` covers the connection configurations to database. `user.js` is where the encryption happens, and `passport.js` is where the authentication happens.

```
.  
├── config
│   ├── config.json   |==> Database connection information
│   └── passport.js   |==> Package: passport
│ 
└── models     
    ├── index.js      |==> Package: Sequelize
    └── user.js       |==> Package: Sequalize + bcrypt
```

---

### __4.b. View Components__

The View part is the most straightforward. The usages are included in the chart below.

```
.
└── public     
    ├── stylesheets  
    │   └── style.css   |==> Local stylesheet
    │
    ├── login.html      |==> Default home page, also accessable from signup.html
    ├── members.html    |==> Accessable from login.html if LogIn successfully
    └── signup.html     |==> Accessable from login.html
```

---

### __4.c. Controller Components__

For Controller, there are three categories of controllers: __Session-controller__, __Font-end-controller__, and __Back-end-controller__. __Session-controller__ trackes the login status, so that as long as user is logged in, reloading the page does not log out the user. __Front-end-controllers__ are just DOM event listeners which tracks the user actions such as submit and click. __Back-end-controllers__ are server-side event handlers, for APIs and static files.  

```
.
├── config
│   └── middleware
│       └── isAuthenticated.js    |==> Session Controller, need Package: express-session
│ 
├── public     
│   └── js
│       ├── login.js      |==> LogIn event controller
│       ├── members.js    |==> LogOut event controller
│       └── signup.js     |==> SignIn event controller
│
├── routes      
│   ├── api-routes.js     |==> API endpoints controller
│   └── html-routes.js    |==> HTML endpoints controller
│ 
└── server.js   |==> Middleware required for: passport + express-session
```
---

## __5. Understanding the data flow in MVC__

Now we are familiar with the techs and understand the responsibility of each file. Let's connection everything together and see how data flows through MVC. 

---

### __5.a. Data flow of Sign Up action__
```
File: signup.html
Data: input from id: email-input 
Data: input from id: password-input
│ 
├──> Captured by Front-end Controller @ signup.js
│     
├──> 'Post' request to endpoint '/api/signup' @ api-routes.js 
│       
├──> Calling data model @ user.js
│       
├──> Encrypt the passwor data by calling bcrypt.hashSync()  @ user.js
│       
├──> Calling Sequelize.define() to store emaill and hased password to MySQL  @ user.js
│       
└──> Once done, return status 307 and redirect to endpoint '/api/login'
     │
     └──> If failed, return status 401 and error JSON message
```
---


### __5.b. Data flow of Log In action__

```
File: login.html
Data: input from id: email-input 
Data: input from id: password-input
│ 
├──> Captured by Front-end Controller @ login.js
│     
├──> 'Post' request to endpoint '/api/login' @ api-routes.js 
│       
├──> Calling passport.authenticate() to verify the password @ api-routes.js
│       
├──> Calling validationPassword() method on password data @ passport.js
│
├──> Calling bcrypt.compareSync() method on match the password @ passport.js
│    │
│    └──> If failed, return status 401 and error JSON message
│       
└──> Successful authentication redirect to endpoint '/members'  @ login.js
```

---

### __5.c. Data flow of Log Out action__
```
File: members.html
Hyper-refernece: /logout
│     
├──> 'Get' request to endpoint '/logout' @ api-routes.js 
│       
├──> Calling req.logout() to remove the user object stored in session @ api-routes.js
│            
└──> Successful logout redirect to endpoint '/'  @ api-routes.js
```
---

## __6. Wrap Up__

MVC is a big concept in web development and it definitely takes time to fully understand how it works in real project. I hope this blog provides new insights that will help you build your own authentication project. If you have any questions, please contact me at richard.yang.tong@gmail.com or post an issue at my [GitHub page](https://github.com/Dragontalker/TechBlog_LoginAuthentication). Happy Hacking!
