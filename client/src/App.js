import { useState } from 'react';
import Inventory from "./Components/Inventory/Inventory";
import Menu from './Components/Menu/Menu';
import Order from './Components/Order/Order';
import Home from "./Components/Home/Home"
import NavBar from './Components/Navbar/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminMenu } from './Components/AdminMenu/AdminMenu';

const App = () => {
  const [isMenu,setIsMenu] =useState(3);
  return (

    <div style={{background : ""}}>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          {/* <Route path="/" element={<NavBar />}> */}

            <Route index element={<Home />} />
            <Route exact path="/menu" element={<Menu />} />
            <Route exact path="/admin/inventory" element={<Inventory />} />
            <Route exact path="/admin/order" element={<Order />} />
            <Route exact path="/admin/menu" element={<AdminMenu />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    {/* <button onClick={()=>setIsMenu(0)}>Menu</button>
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
    }*/}
    </div>
  );
}

export default App;
