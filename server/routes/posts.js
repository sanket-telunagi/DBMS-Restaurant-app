import express from "express";
import { getItems,createItem,updateItem,getMenu,createMenu,updateMenu,getOrders,createOrder,getTable,createTable,getPayments,createPayment} from "../contollers/posts.js";
const router=express.Router();

router.get('/',getItems);
router.post('/',createItem);
router.put('/:id',updateItem);
router.get('/menu',getMenu);
router.post('/menu',createMenu);
router.put('/menu/:id',updateMenu);
router.get('/order',getOrders);
router.post('/order',createOrder);
router.get('/table',getTable);
router.post('/table',createTable);
router.get('/payment',getPayments);
router.post('/payment',createPayment);
export default router;