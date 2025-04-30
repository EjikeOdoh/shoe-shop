const productsContainer = document.querySelector('.products-container')
const cartItemsContainer = document.querySelector('#cartItems')


let cartsArr = JSON.parse(localStorage.getItem('cart')) || []

cartItemsContainer.textContent = cartsArr.length;

function renderShoes(arr) {
    let productsContent = ""
   for(let i = 0; i < arr.length; i++) {
    productsContent = productsContent + `<div class="product-card">
                    <div class="product-img">
                        <img src=${arr[i].img}>
                      <button ${arr[i].selected ? "disabled" : ""} onclick="addToCart(${arr[i].id})"><img src="./icons/cart.png"></button>
                        
                    </div>
                    <div class="product-texts">
                        <h3>${arr[i].name}</h3>
                        <div class="rating-container">
                            <span>Rating</span>
                            <span>${arr[i].rating}/5</span>
                        </div>
                        <div class="price-container">
                            <h2 class="price">$${arr[i].discountedPrice}</h2> 
                            ${
                                arr[i].discount ? `<h2 class="dp">$${arr[i].price}</h2>
                            <p class="discount">-${arr[i].discount}%</p>` : ""
                            }
                        </div>
                    </div>
                </div>`
} 

productsContainer.innerHTML = productsContent
}

renderShoes(updatedItems)





function addToCart(id) {
    const currentItem = updatedItems.find((item)=>{
        return item.id === id
    })
    const isAlreadyInCart = cartsArr.find((item)=>{
        return item.id === id
    })

    updatedItems = updatedItems.map(item=>{
        if(item.id == id) {
            return {...item, selected: true}
        } else {
            return item
        }
    })
    console.log(updatedItems)
    console.log('Hi')
 renderShoes(updatedItems)
    if (isAlreadyInCart) {
        return
    } else {
        cartsArr.push(currentItem)
        localStorage.setItem('cart', JSON.stringify(cartsArr))
        cartItemsContainer.textContent = cartsArr.length;
    }

   

}