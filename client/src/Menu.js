import { useState, useEffect } from 'react';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [itemFood, setItemFood] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDesc, setItemDesc] = useState('');
    const [itemImg, setItemImg] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [cart, setCart] = useState([]);
    const [tableNumber, setTableNumber] = useState();
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
    const postIems = (event) => {
        event.preventDefault();
        const data = { itemFood, itemName, itemDesc, itemImg, itemPrice };
        data.itemFood = (itemFood === 'false' ? false : true);
        console.log(data);
        fetch('http://localhost:5000/name/menu', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                getMenu();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                console.log('Success:', data);
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
    const generateBill=()=>{
        console.log(JSON.stringify({tableNumber}));
        fetch('http://localhost:5000/name/payment', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tableNumber}),
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
        <div >
            <h1>
                MENU
            </h1>
            <h2>Add Item To Menu</h2>
            <form onSubmit={(e) => postIems(e)}>
                <label> Item Food</label><input type='text' value={itemFood} onChange={(e) => setItemFood(e.target.value)} placeholder="true if food or false if beverages" />
                <label> Item Name</label><input type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="type product name" />
                <label> Item Desc</label><input type='text' value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} placeholder="product description" />
                <label> Item Image</label><input type='text' value={itemImg} onChange={(e) => setItemImg(e.target.value)} placeholder="enter image url" />
                <label> Item price</label><input type='number' value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} placeholder="enter price for product" />
                <button >
                    To add item to menu
                </button>
            </form>
            <h2>ITEMs LIST</h2>
            <label> Table Number</label><input type='number' value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} placeholder='type your table number' />
            <button onClick={() => placeOrder()}>Place Order</button>
            <button onClick={() => generateBill()}>Generate Bill</button>
            {
                bill!==""
                ?
                <div>
                {bill.items.map((data)=>(
                    <div>
                        <p>item- {data.itemName}</p>
                        <p>count -{data.count}</p>
                    </div>
                ))}
                    <p>Total Cost -{bill.cost}</p>
                </div>
                :
                menu.map((data, index) => (
                    <div>
                        <p>{index + 1}  name: {data.itemName}</p>
                        <img src={data.itemImg} style={{ height: "200px", width: "200px" }} alt='item'></img>
                        <p>desc:{data.itemDesc}</p>
                        <p>price: Rs.{data.itemPrice}</p><button id={data._id} onClick={(e) => increaseQty(e)}>+</button>
                        <button id={data._id} onClick={(e) => decreaseQty(e)}>-</button>
                        {/* <button id={index} onClick={(e)=>increaseQty(e)}>+</button><button id={index} onClick={(e)=>decreaseQty(e)}>-</button> */}
                    </div>
                ))
            }
        </div>
    );
}

export default Menu;
