
let cartArr = JSON.parse(localStorage.getItem('cart')) || []
console.log(cartArr)
const cartsContainer = document.querySelector('#cartItems')
const cartItemsContainer = document.querySelector('.items')
cartsContainer.textContent = cartArr.length;


const discountContainer = document.querySelector('.det>p>span')
const discountAmountContainer = document.querySelector('#discount')
const deliveryFeeContainer = document.querySelector('#delivery-fee')
const totalAmountContainer = document.querySelector('#total')


const discountAmount = cartArr.reduce((x, y)=>{
    return x + (y.qty * (y.price - y.discountedPrice))
}, 0)

const subTotal = cartArr.reduce((x, y)=>{
    return x + (y.qty * y.price )
}, 0)

const discount = (discountAmount/subTotal) * 100
const deliveryFee =  20;
const totalAmount = subTotal + deliveryFee - discountAmount

console.log(discountAmount, subTotal, discount, deliveryFee, totalAmount)


let cartContent = ""
for (let i = 0; i < cartArr.length; i++) {
    cartContent = cartContent + `<div class="det">
                            <p class="label">${cartArr[i].name} (x${cartArr[i].qty})</p>
                            <p id="subtotal" class="value">$${cartArr[i].discountedPrice * cartArr[i].qty}</p>
                        </div>`    
}

cartItemsContainer.innerHTML = cartContent
discountContainer.textContent = `(-${discount.toFixed(2)}%)`
discountAmountContainer.textContent = `-$${discountAmount.toFixed(2)}`
deliveryFeeContainer.textContent = `$${deliveryFee.toFixed(2)}`
totalAmountContainer.textContent = `$${totalAmount.toFixed(2)}`