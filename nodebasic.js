'use strict';

// Single line comment
/*
Multi-line comment
If you're not familiar with JavaScript, this is how you
can leave notes in your code
*/

// Here's an example of pulling in an external module that
// was downloaded with npm
// We'll talk more about ES6 imports later
import axios from 'axios';

// Not necessary but just for demonstration
// could also do: const Timers = require('timers');
// if "type": "module" was omitted from package.json
import Timers from 'timers';

// console.log is similar to how it works in the browser
// The main difference is that it prints to your terminal
// instead of a browser console.
console.log('Hello world');

// We're going to use this in a moment
function delayedExecute() {
    console.log('printing delayed');
}

/*
Here's a basic example of using asynchronous programming.
Asynchronous programming is basically a fancy way of
saying that code will run in a different order than how
it's written. It means that the main code path will
continue executing, and a different branch of the code
will run at some later point in time.
In this case, the Timers.setTimeout function will run
our delayedExecute function after 2000 milliseconds.
However, our program won't wait for 2000 milliseconds.
Our programming will continue running after this line,
and whenever 2000 milliseconds passes, the function
will be executed.
You'll see "printing delayed" will appear after 
"print now!" in your console.
*/
Timers.setTimeout(delayedExecute, 2000);
console.log('print now!');

// This is an example of a "nodeback". It's a common
// type of callback used in NodeJS systems.
// It's just a callback where the first parameter is
// a potential error, and the second parameter is
// the data intended to be used.
function nodeback(err, data) {
    if (err) {
        console.error('it broke!');
        throw err; // or return, your choice
    }

    // do something with data
}

/*
Usually, we do asynchronous programming anytime we're
interacting with some system outside of our program.
The reason for this is because we don't know how long
those systems will take to do their work. Asynchronous
programming is a difficult concept to get used to. 
At the start, it will probably be really frustrating.
Once you get the hang of it, you'll understand its 
power and efficiency.

Below is a (non-functional) example of a good case for
an asynchronous operation. We don't know how long it 
will take to request some web page for the internet,
so we provide a callback function (nodeback) to be
executed whenever we get a response for the web page.
    httpRequest.get('www.google.com', nodeback);

In traditional programming, you'll want to use try/catch
to do error handling and manage program flow. Be careful
in NodeJS. Things don't work the way you're used to.
If any problems occur during an asynchronous operation,
you'll need to handle them in the callback.
This won't do what you think it does:
    try {
        // assume httpRequest.get is an asynchoronous function
        httpRequest.get(...);
    } catch (err) {
        // error handling
    }
The above catch would never trigger. The get() method itself
would never actually throw an error. Instead, it would 
pass an error object as a parameter to the callback. This is
why the nodeback pattern is popular.
*/

/*
Another way to do asynchronous programming is using Promises.
Under the hood, they operate just like callbacks, but they're 
a little easier for the average programmer to understand.

Axios is a third-party library for getting data over HTTP,
i.e. from the web. Instead of using callbacks, it uses Promises.
Promises, like callbacks, execute their code at a later
point in time. Promises are a built-in object type to NodeJS.
They come with two important functions: then() and catch().
The then() function takes in another function as its parameter.
It will execute this function whenever the asynchronous 
function that produced the Promise finishes its work. When a
Promise's calling function finishes, we say that the Promise
has "resolved". If the Promise encounters any sort of error,
we say it was "rejected". These are common terms when talking
about Promises, and you'll want to remember them. The then()
function executes its given function whenever the Promise 
resolves. You can also call catch() with an input function to
handle if the Promise is rejected. You can also chain Promises
to keep the program flow going along that branch, but that's
a little advanced for now.
*/
axios.get('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
    console.log('HTTP request promise resolved!');
    console.log(response.data);
}).catch((err) => {
    console.error('HTTP request promise was rejected!');
    console.error(err);
});
console.log('The HTTP request is running in the background');
