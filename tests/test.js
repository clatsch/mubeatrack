const handlerFactory = require('../controllers/handlerFactory')

const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');
const { deleteOne } = require('../controllers/handlerFactory.js');

describe('deleteOne', () => {
    it('should delete a document and return status 204 with no data', async () => {
        const Model = {
            findByIdAndDelete: (id) => Promise.resolve({})
        };
        const req = {
            params: {
                id: '123'
            }
        };
        const res = {
            status: (statusCode) => {
                return {
                    json: (data) => {
                        expect(statusCode).to.equal(204);
                        expect(data).to.deep.equal({
                            status: 'success',
                            data: null,
                        });
                    }
                };
            }
        };
        const next = () => {};

        await deleteOne(Model)(req, res, next);
    });

    it('should return next with AppError if document not found', async () => {
        const Model = {
            findByIdAndDelete: (id) => Promise.resolve(null)
        };
        const req = {
            params: {
                id: '123'
            }
        };
        const res = {};
        const next = (err) => {
            expect(err).to.be.instanceof(AppError);
            expect(err.message).to.equal('No document found with that ID');
            expect(err.statusCode).to.equal(404);
        };

        await deleteOne(Model)(req, res, next);
    });
});






//const AppError = require('../utils/appError');
//const forgotPassword = require('../public/js/script')

//const jest = require('jest')


//const assert = require('assert');
//
// it('should summarize all number values in an array', () => {
//   const result = AppError('Blabla', 400);
//   expect(result).to
// });
//
//
// it('should return a shipment with ID 63b576071844843a15926bca63b576071844843a15926bca', function() {
//   // eslint-disable-next-line node/no-deprecated-api
//   assert.equal(handlerFactory.getOne())
// })
//
// const createOne = require('../controllers/handlerFactory');
// const assert = require('assert');
//
// describe('createOne', () => {
//     it('creates a document and returns success status with the created document', async () => {
//         const Model = {
//             create: jest.fn().mockResolvedValue({ name: 'Test Document' }),
//         };
//         const req = {
//             body: { name: 'Test Document' },
//         };
//         const res = {
//             status: jest.fn().mockReturnValue({
//                 json: jest.fn(),
//             }),
//         };
//         const next = jest.fn();
//
//         await createOne(Model)(req, res, next);
//
//         assert(Model.create.mock.calls[0][0], req.body);
//         assert(res.status.mock.calls[0][0], 201);
//         assert(res.status().json.mock.calls[0][0].status, 'success');
//         assert(res.status().json.mock.calls[0][0].data.data.name, 'Test Document');
//         assert(next.mock.calls.length, 0);
//     });
// });
// //
// const getMe = require('../controllers/userController.js');
// const logout = require('../controllers/authController')
// //const assert = require('assert');
// //const jest = require('jest')
//
// describe('logout', () => {
//     it('sets a "jwt" cookie with value "loggedout" and returns success status', () => {
//         const req = {};
//         const res = {
//             cookie: jest.fn(),
//             status: jest.fn().mockReturnValue({
//                 json: jest.fn(),
//             }),
//         };
//
//         logout(req, res);
//
//         assert(res.cookie.mock.calls[0][0], 'jwt');
//         assert(res.cookie.mock.calls[0][1], 'loggedout');
//         assert(res.cookie.mock.calls[0][2].expires instanceof Date);
//         assert(res.cookie.mock.calls[0][2].httpOnly, true);
//         assert(res.status.mock.calls[0][0], 200);
//         assert(res.status().json.mock.calls[0][0], { status: 'success' });
//     });
// });


// describe('getMe', () => {
//     it('sets req.params.id to req.user.id and calls next', () => {
//         const req = {
//             user: {
//                 id: 123,
//             },
//         };
//         const res = {};
//         let nextCalled = false;
//         const next = () => {
//             nextCalled = true;
//         };
//
//         getMe(req, res, next);
//
//         assert.equal(req.params.id, req.user.id);
//         assert.equal(nextCalled, true);
//     });
// });

// describe('createUser', () => {
//     it('sends an error response with status code 500', () => {
//         const req = {};
//         const res = {
//             status: jest.fn().mockReturnValue({
//                 json: jest.fn(),
//             }),
//         };
//
//         createUser(req, res);
//
//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.status().json).toHaveBeenCalledWith({
//             status: 'error',
//             message: 'This route is not defined! Please use /signup.ejs instead',
//         });
//     });
// });

//This test uses Jest's mockReturnValue method to mock the status and json functions of the res object, and verifies that they were called with the expected arguments.


// describe("Test the isPositivNumber method in kundenErstellenValidate.mjs", function() {
//   it("should return false --> -123 is not a positiv number", function() {
//     let str = "-123"
//     //assert.ok(isPositivNumber(str = str.trim();str = str.replace(/^0+/, "") || "0"), false);
//     assert.equal(isPositivNumber("-123"), false, "false");
//     //done("Your error message");
//     //let testObj = "123";
//     //expect(isPositivNumber(testObj)).to.be.true;
//   })
//   it("should return true --> 123 is  a positiv number", function() {
//     let str = "-123"
//     assert.equal(isPositivNumber("123"), true, "true");
//   })
//   it("should return false --> Hans123 is not a positiv number", function() {
//     let str = "-123"
//     assert.equal(isPositivNumber("Hans123"), false, "false");
//   })
//   it("should return false --> 123Hans is not a positiv number", function() {
//     assert.equal(isPositivNumber("Hans123"), false, "false");
//   })
//   it("should return false --> 123.01 is not a positiv number without Number after comma", function() {
//     assert.equal(isPositivNumber("Hans123"), false, "false");
//   })
//   it("should return false --> \"\" is not a positiv number", function() {
//     assert.equal(isPositivNumber(""), false, "false");
//   })
// })
//
//
// describe("Test the splitDB_DBObj method splitDB_DBObj_Generasl.mjs", function() {
//   it(" [{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}] should return {\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}", function() {
//     let str = "[{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}]"
//     //assert.equal(splitDB_DBObj(str), JSON.stringify('{\"ID_User\":8}'), "{\"ID_User\":8}");
//     let zuParsen = '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}'
//     JSON.parse(zuParsen)
//     assert.equal(splitDB_DBObj(str), '[object Object]', '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}');
//   })
//   it(" [{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"},{\"ID_User\":2,\"Erfasst_D_U\":\"01.01.1972\"}] should return {\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}", function() {
//     let str = "[{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"},{\"ID_User\":2,\"Erfasst_D_U\":\"01.01.1972\"}]"
//     //assert.equal(splitDB_DBObj(str), JSON.stringify('{\"ID_User\":8}'), "{\"ID_User\":8}");
//     let zuParsen = '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}'
//     //JSON.stringify(JSON.parse(zuParsen))
//     assert.equal(splitDB_DBObj(str), '[object Object]', '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}');
//   })
// })


// const axios = require('axios');
// const { assert } = require('chai');
//
// describe('forgotPassword', () => {
//     it('should return success status and send token to email', async () => {
//         const email = 'test@example.com';
//
//         const res = await forgotPassword(email);
//         assert.equal(res.data.status, 'success');
//         assert.equal(res.data.message, 'Token send to E-Mail');
//     });
//
//     it('should return error if invalid email is provided', async () => {
//         const email = 'invalidEmail';
//
//         try {
//             await forgotPassword(email);
//         } catch (err) {
//             assert.equal(err.response.data.status, 'error');
//             assert.include(err.response.data.message, 'Invalid Email');
//         }
//     });
// });
//










// const axios = require('axios');
// const sinon = require('sinon');
// //const assert = require('assert');
//
// describe('createShipment', () => {
//     let sandbox;
//     let axiosPostStub;
//
//     beforeEach(() => {
//         sandbox = sinon.createSandbox();
//         axiosPostStub = sandbox.stub(axios, 'post');
//     });
//
//     afterEach(() => {
//         sandbox.restore();
//     });
//
//     it('should call axios.post with the correct arguments and show a success alert', async () => {
//         const data = { test: 'data' };
//         const response = {
//             data: {
//                 status: 'success',
//             },
//         };
//         const showAlertStub = sandbox.stub();
//         const locationAssignStub = sandbox.stub(window.location, 'assign');
//
//         axiosPostStub.resolves(response);
//
//         await createShipment(data, showAlertStub);
//
//         assert.strictEqual(axiosPostStub.firstCall.args[0].url, 'http://localhost:3000/api/v1/shipments');
//         assert.strictEqual(axiosPostStub.firstCall.args[0].data, data);
//         assert.strictEqual(showAlertStub.firstCall.args[0], 'success');
//         assert.strictEqual(showAlertStub.firstCall.args[1], 'successfully created');
//         sinon.assert.calledWith(locationAssignStub, '/shipments');
//     });
//
//     it('should call axios.post with the correct arguments and show an error alert', async () => {
//         const data = { test: 'data' };
//         const response = {
//             response: {
//                 data: {
//                     message: 'error',
//                 },
//             },
//         };
//         const showAlertStub = sandbox.stub();
//
//         axiosPostStub.rejects(response);
//
//         await createShipment(data, showAlertStub);
//
//         assert.strictEqual(axiosPostStub.firstCall.args[0].url, 'http://localhost:3000/api/v1/shipments');
//         assert.strictEqual(axiosPostStub.firstCall.args[0].data, data);
//         assert.strictEqual(showAlertStub.firstCall.args[0], 'error');
//         assert.strictEqual(showAlertStub.firstCall.args[1], 'error');
//     });
// });




//
// const request = require('supertest');
// const app = require('../app');
// const User = require('../models/userModel');
// //const { createUser } = require('./utils/helpers');
//
// describe('Login Route', () => {
//   beforeEach(async () => {
//     await User.deleteMany({});
//   });
//
//   it('Should return 400 if email and password are not provided', async () => {
//     const res = await request(app)
//         .post('/api/v1/users/login')
//         .send({});
//
//     expect(res.statusCode).toBe(400);
//     expect(res.body.message).toBe('Please provide email and password!');
//   });
//
//   it('Should return 401 if email or password is incorrect', async () => {
//     await createUser();
//
//     const res = await request(app)
//         .post('/api/v1/users/login')
//         .send({
//           email: 'test@test.com',
//           password: 'wrongpassword',
//         });
//
//     expect(res.statusCode).toBe(401);
//     expect(res.body.message).toBe('Incorrect email or password');
//   });
//
//   it('Should return 200 and a JWT if login is successful', async () => {
//     await createUser();
//
//     const res = await request(app)
//         .post('/api/v1/users/login')
//         .send({
//           email: 'test@test.com',
//           password: 'password123',
//         });
//
//     expect(res.statusCode).toBe(200);
//     expect(res.body.status).toBe('success');
//     expect(res.body.token).toBeDefined();
//   });
// });

// it('should summarize all number values in an array', () => {
//   const result = AppError('Blabla', 400);
//   expect(result).to
// });







// describe("Test the isPositivNumber method in kundenErstellenValidate.mjs", function() {
//   it("should return false --> -123 is not a positiv number", function() {
//     let str = "-123"
//     //assert.ok(isPositivNumber(str = str.trim();str = str.replace(/^0+/, "") || "0"), false);
//     assert.equal(isPositivNumber("-123"), false, "false");
//     //done("Your error message");
//     //let testObj = "123";
//     //expect(isPositivNumber(testObj)).to.be.true;
//   })
//   it("should return true --> 123 is  a positiv number", function() {
//     let str = "-123"
//     assert.equal(isPositivNumber("123"), true, "true");
//   })
//   it("should return false --> Hans123 is not a positiv number", function() {
//     let str = "-123"
//     assert.equal(isPositivNumber("Hans123"), false, "false");
//   })
//   it("should return false --> 123Hans is not a positiv number", function() {
//     assert.equal(isPositivNumber("Hans123"), false, "false");
//   })
//   it("should return false --> 123.01 is not a positiv number without Number after comma", function() {
//     assert.equal(isPositivNumber("Hans123"), false, "false");
//   })
//   it("should return false --> \"\" is not a positiv number", function() {
//     assert.equal(isPositivNumber(""), false, "false");
//   })
// })
//
//
// describe("Test the splitDB_DBObj method splitDB_DBObj_Generasl.mjs", function() {
//   it(" [{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}] should return {\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}", function() {
//     let str = "[{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}]"
//     //assert.equal(splitDB_DBObj(str), JSON.stringify('{\"ID_User\":8}'), "{\"ID_User\":8}");
//     let zuParsen = '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}'
//     JSON.parse(zuParsen)
//     assert.equal(splitDB_DBObj(str), '[object Object]', '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}');
//   })
//   it(" [{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"},{\"ID_User\":2,\"Erfasst_D_U\":\"01.01.1972\"}] should return {\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}", function() {
//     let str = "[{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"},{\"ID_User\":2,\"Erfasst_D_U\":\"01.01.1972\"}]"
//     //assert.equal(splitDB_DBObj(str), JSON.stringify('{\"ID_User\":8}'), "{\"ID_User\":8}");
//     let zuParsen = '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}'
//     //JSON.stringify(JSON.parse(zuParsen))
//     assert.equal(splitDB_DBObj(str), '[object Object]', '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}');
//   })
// })
