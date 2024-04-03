const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");
const {createChannel,publishMesssage}=require('../utils/messageQueues');
const{REMINDER_BINDING_KEY}=require('../config/serverconfig');
const bookingService = new BookingService();
class BookingController{
  constructor(channel){
    

  }
  async sendMessageToQueue(req,res){
const channel=await createChannel();
const data={
  message:"success"
}
publishMesssage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
return res.status(200).json({
  message:"successfully published the event"
})
  }
  async create(req,res){
    try {
      
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Succesfully completed booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      
      return res.status(error.statusCode).json({
        message:error.message,
        success:false,
        err:error.explanation,
        data: {},
       
      });
  }
}
}

const create = async (req, res) => {
  try {
    console.log(req.body);
    const response = await bookingService.createBooking(req.body);
    return res.status(StatusCodes.OK).json({
      message: "Succesfully completed booking",
      success: true,
      err: {},
      data: response,
    });
  } catch (error) {
    
    return res.status(error.statusCode).json({
      message:error.message,
      success:false,
      err:error.explanation,
      data: {},
     
    });
  }
};

module.exports =BookingController;

