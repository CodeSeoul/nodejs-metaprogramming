'use strict';

// Welcome to setting up your first server!
/*
We're going to use Koa. If you've heard of Express, it's somewhat
similar. It's actually made by the same people. The main difference
is that Express focuses on routes, where Koa focuses on middleware.
Now, if you're familiar with the concept of routes, but not
middleware, don't panic. We can still use routes on top of
middleware, and in this example, we'll do exactly that.

But first, we pull in Koa and create our application object from it.
*/
import Koa from 'koa';
const app = new Koa();

/*
Most APIs use JSON to exchange data. If you're not familiar with 
JSON, take a quick minute to search for info on it. It's not super
complicated. 
We should have some sort of system to convert JSON text to
JavaScript objects. Say hello to your first middleware: koa-bodyparser.
What's a middleware? You can think of Koa like a pipeline system.
An HTTP request comes in to the server. Koa has a series of
middlewares connected to each other. The information in that 
HTTP request will be processed by each middleware, and when the 
last one has done its work, Koa will send the response back to the 
client. You can think of it like pipline building.
koa-bodyparser is just one of many middlewares for Koa, and
I strongly recommend it.
*/
import bodyParser from 'koa-bodyparser';

// Don't worry about the router for now. We'll get there in the
// router file. I promise.
import router from './routes/index.js';
// This is our own customer middleware. Again, wait on this one.
import injectTimestamp from './middlewares/injectTimestamp.js';

/*
Here's an example of a tiny, custom middleware. If you uncomment
this and comment out the other calls to app.use(), the server
will always respond with <h1>Hello world!</h1> in the response
body. This is a very simple middleware. A middleware sounds
fancy, but it's just a function. Koa passes a context object, ctx,
to each middleware as its input. The middleware is expected to
either use information from the context to do some work or add some
data to the context to be passed on to other middlewares or to
the client in the response.
*/
// app.use(ctx => {
//     ctx.body = '<h1>Hello world!</h1>';
// });

// If you want to know about injectTimestamp, check out 
// middlewares/injectTimestamp.js
app.use(injectTimestamp);
// We already talked about koa-bodyparser.
app.use(bodyParser());
// The koa-joi-router has a middleware() function that produces
// a Koa middleware for us to use here. For more info, check 
// out routes/index.js
app.use(router.middleware());

/*
This is where Koa does a _lot_ of magic for us. Normally,
setting up an HTTP server requires a whole bunch of code.
Koa makes that easier for us. You can just use the Koa 
app object's listen() function. It takes in the port number
as a parameter. Voila, you have a server. This will continue
running until you stop it using some sort of termination
signal (SIGINT - ctrl+c, SIGKILL - the kill command, etc).
*/
app.listen(3000);
