import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    // itemFood:Boolean,
    // itemName:String,
    // itemDesc:String,
    // itemImg:String,
    // tableNumber:Number,
    orderItems:Array,
    orderStatus:Boolean,
    createdAt:{
        type:Date,
        default:new Date()
    }
});
const Order=mongoose.model('Order', postSchema);
export default Order;