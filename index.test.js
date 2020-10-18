'use strict';

/*
Welcome to your first test! You're such a good engineer. I'm proud of you.

If you're planning on doing job interviews, having well-written and 
thorough tests is a great way to make yourself look good. So don't get lazy.

We're using Jest, but it's pretty similar to other JavaScript testing
frameworks out there. Let's dive in.
*/

/*
The describe function is a way to group tests together. It also
provides scoping for things like beforeAll, beforeEach, etc, which
we'll cover shortly.
The first parameter is some text that describes this group of tests.
The second parameter is some callback function that contains your
test code.
*/
describe('a category of tests', () => {

    /*
    Jest has a number of setup and teardown built-in function definitions
    to help you manage your tests. They're below:
        * beforeAll - Runs once before all of the tests in this scope
        * beforeEach - Runs for each test before each test starts in this scope
        * afterEach - Runs for each test after each test finishes in this scope
        * afterAll - Runs once after all of the tests in this scope
    This stuff is super useful. It allows you to prepare data that your tests
    will need if you're doing integration tests. It gives you a chance to 
    define mocks if you're doing unit testing. It allows you to setup data for
    regression tests. If all these types of tests are unfamiliar to you, 
    now you know what your homework is.
    */
    beforeEach(() => {
        console.log('runs before each test within this describe block');
    });

    /*
    We define a test using an it() function. Similar to describe(), the first
    parameter is some text describing the test. The second parameter is a
    callback containing the test code.
    */
    it('should run successfully (test name)', () => {
        const resultOfMyTest = 1;
        expect(resultOfMyTest).toBe(1);
        /*
        expect() is a built-in function for Jest. It takes in some data that
        you want to test for some condition. The expect() function produces
        an object with a _bunch_ of available functions for comparison, like
        isGreaterThan(), stringContains(), toMatchObject(), and more. 
        In this case, we'll keep it simple and expect resultOfMyTest to be
        equal to the number 1.

        Congratulations on your first test!
        */
    });
});
