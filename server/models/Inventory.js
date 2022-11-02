import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    name:String,
    quantity:Number,
    price:Number,
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
const Inventory=mongoose.model('Inventory', postSchema);
export default Inventory;