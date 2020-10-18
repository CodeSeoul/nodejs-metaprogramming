'use strict';

/*
Now we're getting fancy. This is the meat of our API server: routes.

Conceptually, a route is pretty simple: it's a combination of an 
HTTP method (GET, POST, DELETE, etc) and a URL path (/books, 
/users/1/detail, etc) that then triggers some sort of logic.
However, we're going to take that a step further. 

We're going to use koa-joi-router. There is a @koa/router package,
but we want to take advantage of Joi. Joi does input and output
validation for us. So in addition to defining our HTTP method,
URL path, and handler logic, we can use Joi to check and handle
errors for the format of data we expect coming in and going out.
*/

// Import our router module
import joiRouter from 'koa-joi-router';

// Import our controller, which will handle the logic for our route.
import helloWorldController from '../controllers/index.js';

// Get the Joi part from the module
const Joi = joiRouter.Joi;
// Get our router
const router = joiRouter();

/*
The router object has this route() function. This is the important
bit. The route function expects an object with the HTTP method,
URL path, a handler, the data format type, and then Joi things.
This block defines a router for HTTP GET requests coming to
the root of our server, so just http://localhost:3000/. It expects
the input and output to use JSON format, and when this route
it triggered, it will execute the helloWorldController() function.
In these endpoints, we're not taking in any inputs, so we'll
just validate the output. The 200 can be a bit confusing: it's the
HTTP status code. If you're not familiar with these, you should
study the top 10 or so most popular codes. 200 is the code for OK.
It just means that the request was fulfilled successfully.
For requests that were fulfilled successfully, we're going to
tell Joi/Koa that we expect the response body to be an object
containing a key as "message" with a value that is a string.
If you're curious about Joi's options, you can find them
here: https://joi.dev/api/.
*/
router.route({
    method: 'get',
    path: '/',
    type: 'json',
    output: {
        200: {
            body: Joi.object({
                message: Joi.string()
            })
        }
    },
    handler: helloWorldController
});

/*
Let's also define a controller for the path /hello. If you try
going to http://localhost:3000/hello in your browser after
running the server, this route will be triggered instead.
*/
router.route({
    method: 'get',
    path: '/hello',
    type: 'json',
    output: {
        200: {
            body: Joi.object({
                message: Joi.string()
            })
        }
    },
    handler: helloWorldController
});

// Anything other than the above method/path combinations will produce an error.

// Now that we've defined our routes, lets export our router object for use
// in our index.js as a middleware.
export default router
