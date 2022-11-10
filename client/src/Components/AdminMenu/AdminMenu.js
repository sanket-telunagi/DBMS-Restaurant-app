import React, {useState} from 'react'
import "./AdminMenu.css";

export const AdminMenu = () => {

    const [itemFood, setItemFood] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDesc, setItemDesc] = useState('');
    const [itemImg, setItemImg] = useState('');
    const [itemPrice, setItemPrice] = useState(0);

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
                // getMenu();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='Menu'>
        <div className='container-addmenu'>
            
            <h2>Add Menu</h2>
            <form onSubmit={(e) => postIems(e)}>

                <div className='inputBox'>
                    <input type='text' value={itemFood} onChange={(e) => setItemFood(e.target.value)} placeholder="Item name" />
                    
                </div>
                
                <div className='inputBox'>
                    <input type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="type product name" />
                    
                </div>

                <div className='inputBox'>
                    <input type='text' value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} placeholder="product description" />
                    
                </div>

                <div className='inputBox'>
                    <input type='text' value={itemImg} onChange={(e) => setItemImg(e.target.value)} placeholder="enter image url" />
                    
                </div>

                <div className='inputBox'>
                    <input type='number' value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} placeholder="product price" />
                    
                </div>

                <div className='inputBox'>
                    <input type="submit" value="Add to menu"/>
                </div>
            </form>
        </div>
    </div>

    //     <div className="Menu">
    //     <div className="container-addmenu">
    //       <h2>Menu</h2>
    //       <form action="">
    //         <div className="inputBox">
    //           <input type="text" required />
    //           <span className='admin-menu'>Item food</span>
    //         </div>
    //         <div className="inputBox">
    //           <input type="text" required />
    //           <span className='admin-menu'>Item name</span>
    //         </div>
    //         <div className="inputBox">
    //           <input type="text" required />
    //           <span className='admin-menu'>Item description</span>
    //         </div>
    //         <div className="inputBox">
    //           <input type="text" required />
    //           <span className='admin-menu'>Item price</span>
    //         </div>
    //         <div className="inputBox">
    //           <input type="submit" value="Add Item" />
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    )
}
