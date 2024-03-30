const {StatusCodes}=require('http-status-codes');

class ValidationError extends Error{
   constructor(error){
    super();
    let explanation=[];
    error.error.forEach((err)=>{
        explanation.push(err.message);
    });


    this.name='ValidationError',
    this.message='Not able to validate the data sent in request',
this.explanation=explanation,
this.statusCode=StatusCodes.BAD_REQUEST   
}
}
module.exports=ValidationError;