import {test, expect} from '@playwright/test'


test.describe('Login page Tests', ()=> {

    test.describe.configure({timeout: 12000000})

    // runs very beginning - 1 time
    test.beforeAll(()=> {

        console.log("before all executed");
        
    })

    // runs all the test cases are completed - 1 time
    test.afterAll(()=> {

        console.log("After all executed");
        
    })


    // runs every test case before
    test.beforeEach(()=> {

        console.log("before each executed");
        
    })

    // runs once every tests completed
    test.afterEach(()=> {

        console.log("after each executed");
        
    })



    test('Test case 1', async()=> {

        console.log("test case 1 executed");
        
    })


    test('Test case 2', async()=> {

        console.log("test case 2 executed");

        
    })
    





})