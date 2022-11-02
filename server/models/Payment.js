import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    tableNumer:Number,
    paymentStatus:Boolean,
    paymentCost:Number,
    paymentItems:Array,
    // name:String,
    // quantity:Number,
    // price:Number,
    // title:String,
    // message:String,
    // creator:String,
    // tags:[String],
    // selectedFile:String,
    // likeCount:{
    //     type:Number,
    //     default:0
    // },
    createdAt:{
        type:Date,
        default:new Date()
    }
});
const Payment=mongoose.model('Payment', postSchema);
export default Payment;