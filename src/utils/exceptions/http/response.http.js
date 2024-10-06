

const responseObject = (response, code, status,message, data, ) => {
    if (!data) {
        return response.status(code).json({
            status,
            message,
        });
    } else {
        return response.status(code).json({
            status,
            // resultCount: data ? data.length : 0,
            data,
            message,
        });
    }
};

module.exports={responseObject}