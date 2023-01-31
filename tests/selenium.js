
const assert = require('assert');
const { Builder, By } = require("selenium-webdriver");
//const login = require('../public/js/script')

//import "chromedriver"// from 'chromedriver'
// import chromedriver so that selenium can by itself open a chrome driver
require("chromedriver");
//const webdriver = require('selenium-webdriver');

// import this class from selenium
//import { Builder, By } from "selenium-webdriver"

//import * as assert from 'assert';
//import assert from 'assert'
//var assert = require("assert");
//const { Builder, By } = require("selenium-webdriver");
//import webdriver from 'selenium-webdriver';
//const webdriver = require("selenium-webdriver");
//import test from 'selenium-webdriver/testing';
//const test = require('selenium-webdriver/testing')

// let capabilities = {
//     "Chrome: El Capitan": {
//         'browserName': 'chrome',
//         'platform': 'OS X 10.11',
//         'version': '54.0',
//     },
//     "Firefox: El Capitan": {
//         'browserName': 'firefox',
//         'platform': 'OS X 10.11',
//         'version': '50.0',
//     },
// };
//
// for (let capability in capabilities) {
//     describe('Selenium login: ' + capability.browserName, function() {
//
//         test.before((done) => {
//             driver = new webdriver.Builder()
//                 .withCapabilities(capability)
//                 .build();
//
//             driver.get("https://openolat.ibw.ch/") //('http://127.0.0.1:7005/api/v1/login1')//await driver.get("https://openolat.ibw.ch/");
//                 .then(() => done());
//         });
//
//         test.after((done) => {
//             driver.quit()
//                 .then(() => done());
//         });
//
//
//         test.it('log in', (done) => {
//             let elementid = driver.findElement(webdriver.By.id("o_counter"));
//             //let elementid = driver.findElement(webdriver.By.className("titleLoginBar"));
//             console.log("elementid: " + elementid)
//             let stribw = elementid.getAttribute("innerHTML");
//             console.log("stribw" + stribw)
//
//
//         });
//
//     });
// }

// (async function openChromeTest() {
//     // open chrome browser
//     let driver = await new Builder().forBrowser("chrome").build();
//
//     try {
//         // setTimeout(async() => {
//         console.log("hellllloooo")
//         //await driver.get("https:/www.google.com/");
//         //await driver.get("http://localhost:7005/api/v1/login1");
//         //await driver.get("https://openolat.ibw.ch/");
//
//
//
//         //let elementid = driver.findElement(By.id('o_counter')); //await driver.findElement(webdriver.Builder.By.id("o_counter"));
//         //console.log("elementid: " + elementid)
//         //let stribw = await elementid.getAttribute("innerHTML");
//         // console.log("stribw" + stribw)
//
//         //await driver.get("http://127.0.0.1:3000");
//         await driver.get("http://localhost:3000");
//         // let emailNameLogin = driver.findElement(By.id("email"));
//         // console.log("emailNameLogin: " + emailNameLogin)
//         // let strEmailNameLogin = await emailNameLogin.getAttribute("innerHTML");
//         // console.log("strEmailNameLogin: " + strEmailNameLogin)
//         let imputEmail = await driver.findElement(By.id('email')).sendKeys("admin@admin.ch");
//         let imputPassword = await driver.findElement(By.id('password')).sendKeys("test1234");
//         let login = await driver.findElement(By.className('btn btn--green'))//.click(); // .sendKeys("123");
//         let strLogin = await login.getAttribute("innerHTML");
//         console.log("strLogin: " + strLogin)
//        // let loginClick = await driver.findElement(By.className('btn btn--green')).click()//.submit()// .click()//.sendKeys("Reflect run", Key.ENTER);//.click();
//         //let anmelden = await driver.findElement(By.className('btnAnmelden')).click();
//         //
//        //  let attr = await driver.switchTo().activeElement().getAttribute("innerHTML");
//        //  console.log("Was: "+`${attr}`)
//        // login(imputEmail, imputPassword);
//
//
//
//         console.log("Delayed for 1 second.");
//         // setTimeout(async() => {
//         //     console.log("Delayed for we<dcsvfgx.");
//         //    // await driver.get("http://127.0.0.1:3000/overview");
//         //     let loginClick = await driver.findElement(By.className('btn btn--green')).click()
//         // }, "2000")
//
//         let loginClick = await driver.findElement(By.className('btn btn--green')).click();// .submit()// .click()
//         console.log("loginClick: " + loginClick)
//
//         let attr = await driver.switchTo().activeElement().getAttribute("innerHTML");
//         console.log(`${attr}`)
//
//         await driver.wait(until.titleIs("MubeaTrack | Shipments Overview"), 3000);
//
//         //let driver = await new Builder().forBrowser('chrome').build();
//         //await driver.get('https://www.google.com');
//         // await driver.findElement(By.css('[name="q"]')).sendKeys("webElement");
//
//         // Get attribute of current active element
//         //let attr = await driver.switchTo().activeElement().getAttribute("title");
//         //console.log(`${attr}`)
//         //window.open('http://localhost:7005/api/v1/login1');
//         //await driver.get("https:/www.google.com/");
//         // }, "6000")
//     } finally {
//         setTimeout(async() => {
//             await driver.quit();
//         }, "8000")
//
//     }
//
// })();
//--------------------------------------------------------------------------------------------------------------------



// describe test
describe("test load next site after log in", function () {

    it("It should return the url after log in, Admin log in and see the next site", async function () {

        let driver = await new Builder().forBrowser("chrome").build();
        try {
            // navigate to to this website
            //await driver.get("http://www.google.com/");
            await driver.get("http://localhost:3000");
            console.log("öffne Browser")

            // find a search box element with name ='q'
            //await driver.findElement(By.name("q"));
            await driver.findElement(By.id('email')).sendKeys("admin@admin.ch");
            // type 'reflect run' in the search box then press ENTER Key
            //await driver.findElement(By.name("q")).sendKeys("Reflect run", Key.RETURN);
            await driver.findElement(By.id('password')).sendKeys("test1234");

            await driver.findElement(By.className('btn btn--green')).click();
            console.log("CLicke anmelden")


            //let pageTitleNewSite = await driver.findElement(By.linkText("http://localhost:3000/shipments"))// .xpath("title")) //until.titleIs("MubeaTrack | Shipments Overview"), 2000);
            //let pageTitleNewSite = await driver.wait(until.titleIs("MubeaTrack | Shipments Overview"), 2000);
            //console.log("pageTitleNewSite: " + JSON.stringify(pageTitleNewSite))
            //await driver.wait(until.titleIs("Reflect run - Google Search"), 2000);
            let urlAfterLogIn = "";
            setTimeout(async() => {
                urlAfterLogIn = await driver.getCurrentUrl();

                try {
                    assert.strictEqual(urlAfterLogIn, "http://localhost:3000/shipments", "Sollte sein: " + JSON.stringify(urlAfterLogIn));
                    console.log("urlAfterLogIn is: " + JSON.stringify(urlAfterLogIn))
                }
                catch (e){
                    console.log("Assert Failed: "+e)
                }
            }, "2000")


            //console.log("urlAfterLogIn: " + JSON.parse(urlAfterLogIn))
           // Assert.assertEquals(URL, "http://localhost:8080/imdb/homepage" );

            // Get the pagetitle of the current Page
            // let pageTitle = await driver.getTitle();
            // console.log("pageTitle: " + pageTitle)

            // let imputEmail = await driver.findElement(By.id('email')).sendKeys("admin@admin.ch");
            // let imputPassword = await driver.findElement(By.id('password')).sendKeys("test1234");
            // let login = await driver.findElement(By.className('btn btn--green'))//.click(); // .sendKeys("123");
            // let strLogin = await login.getAttribute("innerHTML");
            // console.log("strLogin: " + strLogin)


            // assert.strictEqual(pageTitle, "MubeaTrack | Shipments Overview");
            // if (pageTitle) {
            //     console.log("Page Title:", pageTitle);
            // }
        } finally {
            setTimeout(async() => {
                await driver.quit();
                console.log("Bin zu  1")
            }, "3000")
        }
    });
});//funktiiniert test 1



describe("test, when admin logt in, an click Manage Customers", function () {

    it("It should return the name of the table: Customer Number", async function () {

        let driver = await new Builder().forBrowser("chrome").build();
        try {
            console.log("Bin öffne 2")
            await driver.get("http://localhost:3000");
            console.log("öffne Browser")

            await driver.findElement(By.id('email')).sendKeys("admin@admin.ch");
            await driver.findElement(By.id('password')).sendKeys("test1234");
            await driver.findElement(By.className('btn btn--green')).click();
            console.log("CLicke anmelden")




            let urlAfterLogIn = "";
            setTimeout(async() => {
                //console.log("bin drin")
                //urlAfterLogIn = await driver.getCurrentUrl();
                await  driver.findElement(By.className("nav__el nav__el--customers")).click();
                //console.log("mache click manage customers")
                setTimeout(async() => {
                    let customSorting =  await driver.findElement(By.id("customersNumberID"));
                    //console.log("name: "+JSON.stringify(customSorting))
                    let strCustomSorting = await customSorting.getAttribute("innerHTML");
                    //console.log("strCustomSorting: " + strCustomSorting)
                    //console.log("customSorting: " + customSorting.getName())
                    //let x = JSON.stringify(customSorting)
                    // console.log("x: "+x)

                    try {
                        assert.strictEqual(strCustomSorting, "Customer Number", "sollte sein: Customer Number");
                        console.log("Test ist gut --> strCustomSorting: " + strCustomSorting)
                    }
                    catch (e){
                        console.log("Assert Failed: "+e)
                    }
                }, "1000")

            }, "2000")


            // assert.strictEqual(pageTitle, "MubeaTrack | Shipments Overview");
            // if (pageTitle) {
            //     console.log("Page Title:", pageTitle);
            // }
        } finally {
            setTimeout(async() => {
                await driver.quit();
                console.log("Bin zu  2")
            }, "4000")
        }
    });
});


describe("test, when admin logt in, an click his Avatar", function () {

    it("It should return the employee- number 99999 from Admin", async function () {
        console.log("Bin öffne vor 3")
        let driver = await new Builder().forBrowser("chrome").build();
        try {
            console.log("Bin öffne 3")
            await driver.get("http://localhost:3000");

            await driver.findElement(By.id('email')).sendKeys("admin@admin.ch");
            await driver.findElement(By.id('password')).sendKeys("test1234");
            await driver.findElement(By.className('btn btn--green')).click();

            //let urlAfterLogIn = "";
            setTimeout(async() => {
               // console.log("bin drin")
                await  driver.findElement(By.className("nav__user-img")).click();
               // console.log("Click")
                 setTimeout(async() => {
                   // console.log("bin drin drin")
                    let employeeNumber =  await driver.findElement(By.id("employeeNumber"));
                    //let strForm__inputAdmin = await form__inputAdmin .getAttribute("innerHTML");
                   // console.log("employeeNumber: "+employeeNumber)
                     //let strForm__inputAdmin = await employeeNumber.getAttribute("innerHTML");
                     setTimeout(async() => {
                     let strEmployeeNumber = await employeeNumber.getAttribute("value");
                     //console.log("strEmployeeNumber: "+strEmployeeNumber)
                    try {
                        assert.strictEqual(strEmployeeNumber, "99999", "sollte sein: 99999");
                        console.log("Test ist gut --> strEmployeeNumber: "+strEmployeeNumber)
                    }
                    catch (e){
                        console.log("Assert Failed: "+e)
                    }
                     }, "2000")
                 }, "1000")

            }, "2000")

        } finally {
            setTimeout(async() => {
                await driver.quit();
            }, "7000")
        }
    });
});

