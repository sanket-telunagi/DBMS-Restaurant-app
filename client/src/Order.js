import { useState, useEffect } from 'react';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const getOrders = () => {
        fetch('http://localhost:5000/name/order')
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                setOrders(res.orders)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //   const postIems = (event) => {
    //     event.preventDefault();
    //     const data={itemFood,itemName,itemDesc,itemImg,itemPrice};
    //     data.itemFood=(itemFood==='false'?false:true);
    //     console.log(data);
    //     fetch('http://localhost:5000/name/menu', {
    //       method: 'POST', // or 'PUT'
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log('Success:', data);
    //         getMenu();
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //       });
    //   }
    //   const increaseQty=(e)=>{
    //     console.log(e.target.id)
    //     let indexOfStevie = cart.findIndex(i => i.id === e.target.id);
    //     console.log(indexOfStevie);
    //     let temp=cart; console.log(temp);
    //     if(indexOfStevie===-1){
    //         temp.push({id:e.target.id,count:1});
    //         setCart(cart);
    //     }
    //     else{
    //         temp[indexOfStevie].count+=1;
    //         // temp.push({id:e.target.id,count:1});
    //         setCart(cart);
    //     }
    //   }
    //   const decreaseQty=(e)=>{
    //     console.log(e)
    //     let indexOfStevie = cart.findIndex(i => i.id === e.target.id);
    //     console.log(indexOfStevie);
    //     let temp=cart; console.log(temp);
    //     if(indexOfStevie!==-1){
    //         if(temp[indexOfStevie].count===1) temp.splice(indexOfStevie, 1);
    //         else
    //         temp[indexOfStevie].count-=1;
    //         // temp.push({id:e.target.id,count:1});
    //         setCart(cart);
    //     }
    //   }
    //   const placeOrder=()=>{
    //     console.log('order placed at table number',tableNumber,cart);
    //   }
    useEffect(() => {
        getOrders()
    }, [])
    return (
        <div >
            <h1>
                Orders
            </h1>
            {/* <h2>Add Item To Menu</h2>
      <form onSubmit={(e)=>postIems(e)}>
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
      <label> Table Number</label><input type='number' value={tableNumber} onChange={(e)=>setTableNumber(e.target.value)} placeholder='type your table number'/>
      <button onClick={()=>placeOrder()}>Place Order</button> */}
            {
                orders?.map((data, index) => (
                    <div>
                        {/* orderItems:Array, orederStatus:Boolean, */}
                        <h3>{index}</h3>
                        <p> order id- {data._id}</p>
                        {
                            data?.orderItems.map((res, idx) => (
                                <div>
                                <p>item {idx}- {res.id} </p>
                                <p>count: {res.count} </p>
                                </div>
                            ))
                        }
                        <p>order status -{data.orderStatus?'true':'false'}</p><button id={data._id} >Change order status</button>
                        {/* <button id={index} onClick={(e)=>increaseQty(e)}>+</button><button id={index} onClick={(e)=>decreaseQty(e)}>-</button> */}
                    </div>
                ))
            }
        </div>
    );
}

export default Order;
