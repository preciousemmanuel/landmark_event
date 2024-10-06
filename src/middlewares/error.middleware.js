const { responseObject } = require("@utils/exceptions/http/response.http");



function errorMiddleware(
    error,
    req,
    res,
    next
    ){
        const status=error.status||500;
        const message=error.message||"Something went wrong";

        responseObject(res,status,"error",message);
       // res.status(status).send(message);
    }

    module.exports={errorMiddleware}