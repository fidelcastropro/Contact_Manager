// const { stack } = require("../routes/contactRoutes");
const constants = require("../constants")

const errorhandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
        res.json({Title : "Validation Error" , message : err.message , stackTrace : err.stack})
        case constants.UNAUTHORIZED:
        res.json({Title : "Unauthorized Error" , message : err.message , stackTrace : err.stack})
        case constants.FORBIDDEN:
        res.json({Title : "ForBidden Error" , message : err.message , stackTrace : err.stack})
        case constants.NOT_FOUND:
        res.json({Title : "Not Found Error" , message : err.message , stackTrace : err.stack})   
        case constants.SERVER_ERROR:
        res.json({Title : "Server Error" , message : err.message , stackTrace : err.stack}) 
        default:
        res.json({Title : "Unknown Error" ,  message : err.message , stackTrace : err.stack})
    }
}


module.exports = {errorhandler}