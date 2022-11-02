import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    // itemFood:Boolean,
    // itemName:String,
    // itemDesc:String,
    // itemImg:String,
    tableNumber:Number,
    tableOrders:Array,
    // orederStatus:Boolean,
    createdAt:{
        type:Date,
        default:new Date()
    }
});
const Table=mongoose.model('Table', postSchema);
export default Table;