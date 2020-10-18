'use strict';

/*
Hmm, this looks familiar, right? If you think it looks similar
to our injectTimestamp middleware, you're absolutely correct.
Router handlers, or controllers as we're calling them, are just
another middleware in the pipeline. Everything is a middleware
with Koa. By now, you can probably understand this just by
looking at it. Great work!
*/
export default function(ctx) {
    ctx.body = {
        message: 'Hello world!'
    };
};
