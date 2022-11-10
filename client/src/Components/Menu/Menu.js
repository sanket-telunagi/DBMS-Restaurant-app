import { useState, useEffect } from 'react';
import "./Menu.css";


const Menu = () => {
    const [menu, setMenu] = useState([]);

    const [cart, setCart] = useState([]);
    const [tableNumber, setTableNumber] = useState(0);
    const [bill, setbill] = useState("");
    const getMenu = () => {
        fetch('http://localhost:5000/name/menu')
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                setMenu(res.menu)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const increaseQty = (e) => {
        console.log(e.target.id)
        let indexOfStevie = cart.findIndex(i => i.id === e.target.id);
        console.log(indexOfStevie);
        let temp = cart; console.log(temp);
        if (indexOfStevie === -1) {
            temp.push({ id: e.target.id, count: 1 });
            setCart(cart);
        }
        else {
            temp[indexOfStevie].count += 1;
            // temp.push({id:e.target.id,count:1});
            setCart(cart);
        }
    }
    const decreaseQty = (e) => {
        console.log(e)
        let indexOfStevie = cart.findIndex(i => i.id === e.target.id);
        console.log(indexOfStevie);
        let temp = cart; console.log(temp);
        if (indexOfStevie !== -1) {
            if (temp[indexOfStevie].count === 1) temp.splice(indexOfStevie, 1);
            else
                temp[indexOfStevie].count -= 1;
            // temp.push({id:e.target.id,count:1});
            setCart(cart);
        }
    }
    const placeOrder = () => {
        console.log('order placed at table number', tableNumber, cart);
        const data = { orderItems: cart, orderStatus: false };
        // data.itemFood=(itemFood==='false'?false:true);
        console.log(data);
        fetch('http://localhost:5000/name/order', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data, { tableOrders: data._id, tableNumber });
                fetch('http://localhost:5000/name/table', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tableOrders: data._id, tableNumber }),
                })
                    .then((response) => response.json())
                    .then((data_table) => {
                        setCart([]);
                        console.log(data_table)
                    })
                    .catch(err => console.log(err))
                // getMenu();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const generateBill = () => {
        console.log(JSON.stringify({ tableNumber }));
        fetch('http://localhost:5000/name/payment', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableNumber }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Generated', data);
                setbill(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        getMenu()
    }, [])
    return (
        <div className='body' >
        {console.log(cart)}
            <span>MENU</span>
            <div className='table-reg'>
            <label> Table Number</label>
            <input className='table-num' type='number' value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} placeholder='type your table number' />
            <button className='table-btn' onClick={() => placeOrder()}>Place Order</button>
            <button className='table-btn' onClick={() => generateBill()}>Generate Bill</button>
            </div>
            {
                bill !== ""
                    ?
                    <div>
                        {bill.items.map((data) => (
                            <div>
                                <p>item- {data.itemName}</p>
                                <p>count -{data.count}</p>
                            </div>
                        ))}
                        <p>Total Cost -{bill.cost}</p>
                    </div>
                    :
                    <div className='main'>
                    {console.log(cart)}
                        {menu.map((data, index) => (

                            <div className='container'>
                                <h2>{index + 1}  name: {data.itemName}</h2>
                                <img className='item-img' src={data.itemImg} style={{ height: "200px", width: "200px" }} alt='item'></img>
                                <h4>desc:{data.itemDesc}</h4>
                                <p>price: Rs.{data.itemPrice}</p>
                                
        {/* {cart.findIndex(i => i.id === data._id) === -1 ? 0 : console.log(cart[cart.findIndex(i => i.id === data._id)].count)} */}
        {/* {console.log(cart[cart.findIndex(i => i.id === data._id)].count)} */}
        
                                
                                <button className='btn' id={data._id} onClick={(e) => increaseQty(e)}>+</button>
                                <button className='' id={data._id} onClick={(e) => decreaseQty(e)}>-</button>
                                {/* <button id={index} onClick={(e)=>increaseQty(e)}>+</button><button id={index} onClick={(e)=>decreaseQty(e)}>-</button> */}
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
}

export default Menu;
