express controller
==================

Easy way to do controllers using express

**With support to Async/Await and Generator based control flow**

#### Steps to setup a controller

1. Create a new file to be a controller;

2. Import the library

```js
const Controller = require( 'express_controller' );
```
3. Instantiate the controller with its base path

```js
const ctrl = new Controller( '/' );
```

4. Append any filters you want

```js
ctrl.restrict( AuthFilter );
```

A filter is an abstraction for any route middleware used by the express, so it is a function with this signature:

```js
filter( req, res, next ) {
  // ...
  next();
}
```

Check out Express.js docs for more info.

5. Define the routes (again, like plain express.js):

```js
ctrl.get( '/clients', ( req, res ) => {
  res.render('clients/index');
} );
```

6. Export the routes at the end of the files

```js
module.exports = ctrl.routes;
```
7. Import this controller in your main app.js

```js
const app = express();
app.use('/', require('your_controller_1.js') );
app.use('/', require('your_controller_2.js') );
// ...
app.use('/', require('your_controller_N.js') );

// OR, if those are in a path:
walk(path.join(__dirname, '/app/controllers')).forEach(file => app.use('/', require(file)));
```

In the example, `walk` is a library to get all files from a path, you can find [here](https://www.npmjs.com/package/walk.js "npm walk").

#### Wait there is more!

1. Async/await

If you want to have `async` methods inside one route logic, just do it:

```js
ctrl.get( '/client', async ( req, res ) => {
  const clients = await Clients.find( {} );
  res.render( 'clients/index', { clients } );
});
```

2. Generator based control flow

If you want to yield your code, with promises, inside a generator, this is supported too

```js
ctrl.get( '/client', function *( req, res ) => {
  const clients = yield Clients.find( {} );
  res.render( 'clients/index', { clients } );
});
```

This is done using `simplerunner` library [info here](https://www.npmjs.com/package/simplerunner "Simple Runner").

3. Errors! Errors! and more Errors!

Once more, the error treatment is express-ish, just append this after your routes:

```js
// errors
app.use( function (err, req, res, next) {
  // here your have the errors
});
```

More info [here](https://expressjs.com/en/guide/error-handling.html, "Express.js error handling").

This errors include exceptions and rejections threw by the yield/awaited functions as well.
