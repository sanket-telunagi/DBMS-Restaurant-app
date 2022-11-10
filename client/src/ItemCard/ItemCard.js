import React from 'react'

export const ItemCard = (props) => {
  return (
    <div class="container">
        <h2>Menu</h2>
        <div class="img-container">
            <img class="item-img" src="test.jpeg" alt=""/>
        </div>
        <button class="btn" type="submit">Add to cart</button>
    </div>
  )
}
