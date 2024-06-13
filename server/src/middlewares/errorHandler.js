export const errorHandler = (err, req, res, next) => {
    // Log the error for debugging
    console.error(err.stack);

    // Handle specific Mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    // Handle MongoDB specific errors
    if (err.name === 'MongoError') {
        return res.status(500).json({ message: 'MongoDB Error: ' + err.message });
    }

    // Default error handling
    res.status(500).json({ message: 'Internal Server Error' });
};
