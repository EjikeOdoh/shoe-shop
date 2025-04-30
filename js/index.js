const productsContainer = document.querySelector('.products-container')
const cartItemsContainer = document.querySelector('#cartItems')

let productsContent = ""
let cartsArr = JSON.parse(localStorage.getItem('cart')) || []

cartItemsContainer.textContent = cartsArr.length;

for(let i = 0; i < updatedItems.length; i++) {
    productsContent = productsContent + `<div class="product-card">
                    <div class="product-img">
                        <img src=${updatedItems[i].img}>
                        <button onclick="addToCart(${updatedItems[i].id})"><img src="./icons/cart.png"></button>
                    </div>
                    <div class="product-texts">
                        <h3>${updatedItems[i].name}</h3>
                        <div class="rating-container">
                            <span>Rating</span>
                            <span>${updatedItems[i].rating}/5</span>
                        </div>
                        <div class="price-container">
                            <h2 class="price">$${updatedItems[i].discountedPrice}</h2> 
                            ${
                                updatedItems[i].discount ? `<h2 class="dp">$${updatedItems[i].price}</h2>
                            <p class="discount">-${updatedItems[i].discount}%</p>` : ""
                            }
                        </div>
                    </div>
                </div>`
}

productsContainer.innerHTML = productsContent


function addToCart(id) {
    const currentItem = updatedItems.find((item)=>{
        return item.id === id
    })
    
    const isAlreadyInCart = cartsArr.find((item)=>{
        return item.id === id
    })

    if (isAlreadyInCart) {
        return
    } else {
        cartsArr.push(currentItem)
        localStorage.setItem('cart', JSON.stringify(cartsArr))
        cartItemsContainer.textContent = cartsArr.length;
    }

}