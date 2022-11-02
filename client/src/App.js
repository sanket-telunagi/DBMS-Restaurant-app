import { useState } from 'react';
import Inventory from './Inventory';
import Menu from './Menu';
import Order from './Order';
import Home from './Home';
const App = () => {
  const [isMenu,setIsMenu] =useState(3);
  return (
    <div >
    <button onClick={()=>setIsMenu(0)}>Menu</button>
    <button onClick={()=>setIsMenu(1)}>Inventory</button>
    <button onClick={()=>setIsMenu(2)}>Orders</button>
    <button onClick={()=>setIsMenu(3)}> Home </button>
    {
      isMenu===0
      ?
        <Menu/>
      :
        isMenu===1
        ?
        <Inventory/>
        :
        isMenu===2
        ?
        <Order/>
        :
        <Home/>
    }
    </div>
  );
}

export default App;
