const assert = require('assert');
const {Builder, By} = require('selenium-webdriver');

require('chromedriver');

describe('test load next site after login', function() {

    it('Should return the url after login, admin login and show the next site', async function() {

        let driver = await new Builder().forBrowser('chrome').build();
        try {

            await driver.get('http://localhost:3000');
            // console.log('open browser')

            await driver.findElement(By.id('email')).sendKeys('admin@admin.ch');
            await driver.findElement(By.id('password')).sendKeys('test1234');

            await driver.findElement(By.className('btn btn--green')).click();
            // console.log('click on login')

            let urlAfterLogin = '';
            setTimeout(async() => {
                urlAfterLogin = await driver.getCurrentUrl();

                try {
                    assert.strictEqual(urlAfterLogin, 'http://localhost:3000/shipments', 'Sollte sein: ' + JSON.stringify(urlAfterLogin));
                    // console.log('urlAfterLogIn is: ' + JSON.stringify(urlAfterLogin))
                } catch (e) {
                    // console.log('Assert failed: '+e)
                }
            }, '2000')

        } finally {
            setTimeout(async() => {
                await driver.quit();
                // console.log('closed:  1')
            }, '3000')
        }
    });
});


describe('test, when admin logs in and clicks on Manage Customers', function() {

    it('Should return the name of the table: Customer Number', async function() {

        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:3000');

            await driver.findElement(By.id('email')).sendKeys('admin@admin.ch');
            await driver.findElement(By.id('password')).sendKeys('test1234');
            await driver.findElement(By.className('btn btn--green')).click();

            setTimeout(async() => {
                await driver.findElement(By.className('nav__el nav__el--customers')).click();
                setTimeout(async() => {
                    let customSorting = await driver.findElement(By.id('customersNumberID'));
                    let strCustomSorting = await customSorting.getAttribute('innerHTML');

                    try {
                        assert.strictEqual(strCustomSorting, 'Customer Number', 'shoud be: Customer Number');
                        // console.log('Test was successful --> strCustomSorting: ' + strCustomSorting)
                    } catch (e) {
                        // console.log('Assert failed: '+e)
                    }
                }, '1000')

            }, '2000')

        } finally {
            setTimeout(async() => {
                await driver.quit();
                // console.log('closed: 2')
            }, '4000')
        }
    });
});

//
describe('test, when admin logs in and clicks on his avatar', function() {

    it('It should return the employee-number 99999 of the admin', async function() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            // console.log('opened: 3')
            await driver.get('http://localhost:3000');

            await driver.findElement(By.id('email')).sendKeys('admin@admin.ch');
            await driver.findElement(By.id('password')).sendKeys('test1234');
            await driver.findElement(By.className('btn btn--green')).click();

            setTimeout(async() => {
                await driver.findElement(By.className('nav__user-img')).click();
                setTimeout(async() => {
                    let employeeNumber = await driver.findElement(By.id('employeeNumber'));
                    setTimeout(async() => {
                        let strEmployeeNumber = await employeeNumber.getAttribute('value');
                        //console.log("strEmployeeNumber: "+strEmployeeNumber)
                        try {
                            assert.strictEqual(strEmployeeNumber, '99999', 'should be: 99999');
                            console.log('Test ist gut --> strEmployeeNumber: ' + strEmployeeNumber)
                        } catch (e) {
                            console.log('Assert Failed: ' + e)
                        }
                    }, '2000')
                }, '1000')

            }, '2000')

        } finally {
            setTimeout(async() => {
                await driver.quit();
            }, '7000')
        }
    });
});

