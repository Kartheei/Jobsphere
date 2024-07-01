export const errorHandler = (error, req, res, next) => {
    console.error('Error caught by errorHandler middleware:', error);
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = error.message;
    } else if (error.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    } else if (error.name === 'MongoError' && error.code === 11000) {
        statusCode = 400;
        message = 'Duplicate key error';
    } else if (error.message && error.message.startsWith('MongoError:')) {
        statusCode = 500;
        message = 'MongoDB error';
    } else if (error.name === 'MongooseError' && error.reason && error.reason.name === 'MongoNetworkError') {
        // Handle MongoDB network errors (e.g., connection timeout)
        statusCode = 500;
        message = 'MongoDB connection error';
    }

    res.status(statusCode).json({ error: message });
};
