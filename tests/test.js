const handlerFactory = require('../controllers/handlerFactory')
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');
const {deleteOne} = require('../controllers/handlerFactory.js');

describe('deleteOne', () => {
    it('should delete a document and return status 204 with no data', async() => {
        const Model = {
            findByIdAndDelete: (id) => Promise.resolve({}),
        };
        const req = {
            params: {
                id: '123',
            },
        };
        const res = {
            status: statusCode => {
                return {
                    json: data => {
                        expect(statusCode).to.equal(204);
                        expect(data).to.deep.equal({
                            status: 'success',
                            data: null,
                        });
                    },
                };
            },
        };
        const next = () => {
        };

        await deleteOne(Model)(req, res, next);
    });

    it('should return next with AppError if document not found', async() => {
        const Model = {
            findByIdAndDelete: (id) => Promise.resolve(null),
        };
        const req = {
            params: {
                id: '123',
            },
        };
        const res = {};
        const next = err => {
            expect(err).to.be.instanceof(AppError);
            expect(err.message).to.equal('No document found with that ID');
            expect(err.statusCode).to.equal(404);
        };

        await deleteOne(Model)(req, res, next);
    });
});

