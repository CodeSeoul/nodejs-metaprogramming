'use strict';

/*
Such a tiny middleware. The tiniest middleware, but don't be fooled.
There's a lot going on here.

Let's start with this "export default" bit. This is specific to ES6
modules. If you're particularly experienced with JavaScript and
have gotten Babel up and running, you're probably at least a little
familiar with this. For the rest of us, this is some fancy new stuff.

The export keyword means that what follows is going to be accessible
if this file is imported as a module using the "import" keyword.
Export can be used with functions, classes, and variables. They can
be anonymous like below, or they can be named.
The default keyword is a bit of a convenience thing. It means that if
the module is simply imported, this is the value that will be provided.
In this case, if we did a simple 
    import someFunc from './middlewares/injectTimestamp.js'
then someFunc would be the function defined below.

Next up is async/await. The async keyword marks a function as 
returning a Promise object. It also allows us to use the await keyword
within the function. The await keyword is used with promises. It 
pauses execution of the program path until the Promise resolves or
rejects. The await keyword *can* be used with try/catch. In fact,
this is strongly recommended. Not doing so will actually trigger a
warning in certain situations.

Our anonymous function below takes in the ctx and next parameters.
These are provided by Koa. We described ctx previously - it's the 
context for the current HTTP request being processed. The next
parameter is something new. It's actually a function, next().
Calling next() triggers the next middleware(s) in the pipeline.
Since middlewares are often Promises, you'll want to await it.
In this case, our middleware here waits for later middlewares
to finish before executing its own logic. There's no strong 
reason for this in the current example. It was really just an excuse
to show off next().
Lastly, we're adding a bit of data to the response body of the
HTTP request. We're just adding a timestamp property to our
response object containing the current unix timestamp in milliseconds.

A non-technical thing to appreciate briefly. I just want you to
recognize how smart you are. It took dozens of lines of text to
describe these four lines of code. That's a lot of information,
and now, that information is yours. Good job. You've gotten a lot
smarter very quickly. Keep it up!
*/
export default async (ctx, next) => {
    await next();
    ctx.body.timestamp = Date.now();
};

// For you experienced folks out there, I know I have a logic
// bug here when combined with the router. I'm choosing to not
// worry about it for now.
