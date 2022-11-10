import mongoose from "mongoose";
import Menu from "../models/Menu.js";
import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";
import Table from "../models/Table.js";
import Payment from "../models/Payment.js";
export const getItems = async (req, res) => {
    try {
        const postMessage = await Inventory.find();
        // res.send("hiee");
        console.log("get Items request");
        res.status(200).json({ postMessage });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}
export const createItem = async (req, res) => {
    const item = req.body;
    const newItem = new Inventory(item);
    try {
        await newItem.save();
        res.status(201).json(newItem);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
    res.send('Sent Request');
}
export const updateItem = async (req, res) => {
    console.log('in update', req.params);
    const { id: _id } = req.params;
    const item = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No item with that is');

    const updateItem = await Inventory.findByIdAndUpdate(_id, item, { new: true });
    res.json(updateItem);
}

export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        // res.send("hiee");
        console.log("get Menu request");
        res.status(200).json({ menu });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createMenu = async (req, res) => {
    const item = req.body;
    const newItem = new Menu(item);
    try {
        await newItem.save();
        res.status(201).json(newItem);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
    res.send('Sent Request');
}
export const updateMenu = async (req, res) => {
    console.log('in update', req.params);
    const { id: _id } = req.params;
    const item = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No item with that is');

    const updateItem = await Menu.findByIdAndUpdate(_id, item, { new: true });
    res.json(updateItem);
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        // res.send("hiee");
        console.log("get orders request");
        res.status(200).json({ orders });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}
export const createOrder = async (req, res) => {
    const item = req.body;
    console.log(item);
    const newItem = new Order(item);
    try {
        await newItem.save();
        res.status(201).json(newItem);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
    // res.send('Sent Request');
}

export const getTable = async (req, res) => {
    try {
        const table = await Table.find();
        // res.send("hiee");
        console.log("get table request");
        res.status(200).json({ table });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}
export const createTable = async (req, res) => {
    let { tableNumber, tableOrders } = req.body;
    console.log(req.body, tableNumber);
    // const newItem =new Table(item);
    try {
        const table = await Table.findOne({ tableNumber });
        // res.send("hiee");
        // console.log("get table request",table, table.length,table.tableNumber,table.tableOrders);
        console.log("get table request",table);
        if (table) {
            let temp = table.tableOrders;
            // tableOrders=table.tableOrders;
            temp.push(tableOrders);
            console.log('lengtyh not zero', temp);
            try {
                const updateItem = await Table.updateOne({ tableNumber }, { tableOrders:temp });
                console.log('in update item ',updateItem);
                res.json(updateItem);
            }
            catch (err) {
                res.status(404).json({ message: err.message });
            }
        }
        else {

            const newItem = new Table({ tableNumber, tableOrders });
            console.log('in newitem ',newItem)
            await newItem.save();
            res.status(201).json(newItem);

        }
        // res.status(200).json({ table });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
    // console.log(JSON.stringify(ans));
    // try{
    //     // await newItem.save();
    //     await Table.find({tableNumber:item.tableNumber})
    //     res.status(201).json(newItem);
    // }
    // catch (err){
    //     res.status(409).json({message:err.message});
    // }
    // res.send('Sent Request');
}

export const getPayments = async (req, res) => {
    try {
        const payment = await Payment.find();
        // res.send("hiee");
        console.log("get payment request");
        res.status(200).json({ payment });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}
export const createPayment = async (req, res) => {
    let { tableNumber } = req.body;
    console.log(req.body, tableNumber);
    // const newItem =new Table(item);
    try {
        let cost=0;let items=[],orders_id=[];
        const table = await Table.findOneAndDelete({ tableNumber });
        // res.send("hiee");
        // console.log("get table request",table, table.length,table.tableNumber,table.tableOrders);
        console.log("get table request",table.tableOrders,table.tableOrders[0]);
        await Promise.all(table.tableOrders.map(async (data)=>{
            const order=await Order.findByIdAndUpdate(data,{orderStatus:true})
            orders_id.push(data);
            // console.log('order id is',order);
            await Promise.all(order.orderItems.map(async (data_order,index)=>{
                const menu= await Menu.findById(data_order.id);
                // console.log(index,'menu is ',menu.itemName);
                const indx=items.findIndex(x => x.itemName === menu.itemName);
                if(indx===-1)
                items.push({itemName:menu.itemName,count:data_order.count});
                else items[indx].count+=data_order.count;
                cost+=((menu.itemPrice)*(data_order.count))             
                // console.log(cost,menu.itemPrice,data_order.count,((menu.itemPrice)*(data_order.count)),items)
            }))      
        }))
        const pay=new Payment({tableNumer:tableNumber,paymentStatus:false,paymentCost:cost,paymentItems:orders_id})
        await pay.save();
        console.log('respose is sent',cost,items)
        return res.json({cost,items});
        
    }
    catch (err) {
        res.status(404).json({ message: err.message,error:'no order for that table number' });
    }
    // console.log(JSON.stringify(ans));
    // try{
    //     // await newItem.save();
    //     await Table.find({tableNumber:item.tableNumber})
    //     res.status(201).json(newItem);
    // }
    // catch (err){
    //     res.status(409).json({message:err.message});
    // }
    // res.send('Sent Request');
}