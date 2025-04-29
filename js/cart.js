let cartsArr = JSON.parse(localStorage.getItem('cart')) || []
console.log(cartsArr);

const cartItemsContainer = document.querySelector('.items')
const subTotalContainer = document.querySelector('#subtotal')
const discountContainer = document.querySelector('.det>p>span')
const discountAmountContainer = document.querySelector('#discount')
const deliveryFeeContainer = document.querySelector('#delivery-fee')
const totalContainer = document.querySelector('#total')

function renderCartItems(arr) {
    let cartsContent = ""
    for (let i = 0; i < arr.length; i++) {
        cartsContent = cartsContent + `<div class="item-card">
                        <div class="item-img">
                            <img src=${arr[i].img} alt=${arr[i].name}>
                        </div>
                        <div class="item-texts">
                            <div class="up">
                                <div class="up-texts">
                                    <h2>${arr[i].name}</h2>
                                    <p>Size: <span>${arr[i].size}</span></p>
                                    <p>Color: <span>${arr[i].color}</span></p>
                                </div>
                                <button onclick="removeFromCart(${arr[i].id})">
                                    <img src="./icons/bin.png">
                                </button>
                            </div>
                            <div class="down">
                                <p>$${arr[i].discountedPrice}</p>
                                <div class="btns">
                                    <button onclick="decrease(${arr[i].id})">
                                        -
                                    </button>
                                    <span>${arr[i].qty}</span>
                                    <button onclick="increase(${arr[i].id})">+</button>
                                </div>
                            </div>
                        </div>
                    </div>`
    }

    cartItemsContainer.innerHTML = cartsContent
    updateOrderSummary()
}

renderCartItems(cartsArr)

function increase(id) {
    cartsArr = cartsArr.map((item) => {
        if (item.id === id) {
            return { ...item, qty: item.qty + 1 }
        } else {
            return item
        }
    })
    localStorage.setItem('cart', JSON.stringify(cartsArr))
    renderCartItems(cartsArr)
}

function decrease(id) {
    const currentItem = cartsArr.find((item) => {
        return item.id === id
    })

    if (currentItem.qty > 1) {
        cartsArr = cartsArr.map((item) => {
            if (item.id === id) {
                return { ...item, qty: item.qty - 1 }
            } else {
                return item
            }
        })
        localStorage.setItem('cart', JSON.stringify(cartsArr))
        renderCartItems(cartsArr)
    } else {
        return
    }
}

function removeFromCart(id) {
    cartsArr = cartsArr.filter((item) => {
        return item.id !== id
    })
    localStorage.setItem('cart', JSON.stringify(cartsArr))
    renderCartItems(cartsArr)
}


function updateOrderSummary() {

    const subTotal = cartsArr.reduce((x, y) => {
        const totalCost = y.qty * y.price
        return x + totalCost
    }, 0)


    const discountAmount = cartsArr.reduce((x, y) => {
        const totalDiscount = y.qty * (y.price - y.discountedPrice)
        console.log(totalDiscount)
        return x + totalDiscount
    }, 0)

    const discount = ((discountAmount) / subTotal) * 100
    console.log(discount)
    const deliveryFee = 20

    const totalAmount = subTotal + deliveryFee - discountAmount

    subTotalContainer.textContent = `$${subTotal.toFixed(2)}`
    discountAmountContainer.textContent = `$${discountAmount.toFixed(2)}`
    discountContainer.textContent = `(-${discount.toFixed(2)}%)`
    deliveryFeeContainer.textContent = `$${deliveryFee.toFixed(2)}`
    totalContainer.textContent = `$${totalAmount.toFixed(2)}`
}


