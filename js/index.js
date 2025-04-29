const productsContainer = document.querySelector('.products-container')

let productsContent = ""

for(let i = 0; i < updatedItems.length; i++) {
    productsContent = productsContent + `<div class="product-card">
                    <div class="product-img">
                        <img src=${updatedItems[i].img}>
                        <button><img src="./icons/cart.png"></button>
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