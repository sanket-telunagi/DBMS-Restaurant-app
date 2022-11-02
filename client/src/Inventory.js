import { useState, useEffect } from 'react';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [item_name,setItem_Name]=useState('');
  const [quantity,setQuantity]=useState(0);
  const [price,setPrice]=useState(0);
  const getItems = () => {
    fetch('http://localhost:5000/name')
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        setItems(res.postMessage)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const postIems = (event) => {
    event.preventDefault();
    const data={name:item_name,quantity,price};
    console.log(data);
    fetch('http://localhost:5000/name', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        getItems();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const increaseQty=(e)=>{
    console.log(e.target.id)
    const data={quantity:items[e.target.id].quantity+1};
    const id=items[e.target.id]._id;
    fetch(`http://localhost:5000/name/${id}`, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        getItems();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const decreaseQty=(e)=>{
    console.log(e)
    const data={quantity:items[e.target.id].quantity-1};
    const id=items[e.target.id]._id;
    fetch(`http://localhost:5000/name/${id}`, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        getItems();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  useEffect(() => {
    getItems()
  }, [])
  return (
    <div >
      <h1>
        Items available
      </h1>
      {
        items.map((data, index) => (
          <div><h3>{index + 1}</h3><p>name:{data.name}</p><p>quantity:{data.quantity}</p>
          <button id={index} onClick={(e)=>increaseQty(e)}>+</button><button id={index} onClick={(e)=>decreaseQty(e)}>-</button>
          <p>price: Rs.{data.price}</p></div>
        ))
      }
      <form onSubmit={(e)=>postIems(e)}>
      <label> Item Name</label><input type='text' value={item_name} onChange={(e) => setItem_Name(e.target.value)} placeholder="type product name" /> 
      <label> Item quantity</label><input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="enter number of quantity" /> 
      <label> Item price</label><input type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder="enter price for item" /> 
      <button >
        To add item
      </button>
      </form>
    </div>
  );
}

export default Inventory;
