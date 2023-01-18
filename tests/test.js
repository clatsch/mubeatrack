const handlerFactory = require('../controllers/handlerFactory')
const AppError = require('../utils/appError');
const assert = require('assert');

// it('should summarize all number values in an array', () => {
//   const result = AppError('Blabla', 400);
//   expect(result).to
// });


it('should return a shipment with ID 63b576071844843a15926bca63b576071844843a15926bca', function() {
  // eslint-disable-next-line node/no-deprecated-api
  assert.equal(handlerFactory.getOne())
})
