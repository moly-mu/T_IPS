export const errorHandler = (err, _req, res, _next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Error interno',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};