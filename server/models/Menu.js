import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    itemFood:Boolean,
    itemName:String,
    itemDesc:String,
    itemImg:String,
    itemPrice:Number,
    createdAt:{
        type:Date,
        default:new Date()
    }
});
const Menu=mongoose.model('Menu', postSchema);
export default Menu;