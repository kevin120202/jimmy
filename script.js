const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: 0,
        price: 14,
        emoji: "🍕"
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔",
        id: 1
    },
    {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        emoji: "🍺",
        id: 2
    }
]

let totalPrice = 0
let cart = []

function handleAddToCartBtn(id) {
    item = {}
    for (let food of menuArray) {
        if (food.id === Number(id)) {
            cart.push(food)
            totalPrice += food.price
        }
    }
    renderFoodToCart()
    renderTotalPrice()
}

function removeFromCart(index) {
    const removedFood = cart.splice(index, 1)[0]
    totalPrice -= removedFood.price
    renderFoodToCart()
    renderTotalPrice()
}

function renderFoodToCart() {
    html = ""
    for (let food of cart) {
        html += `
        <div class="food-in-cart">
            <h3>${food.name} <span class="remove" data-index=${cart.indexOf(food)}>remove</span></h3>
            <p class="price-in-cart">$${food.price}</p>
        </div>
    `
    }
    document.querySelector(".food-in-cart-container").innerHTML = html
}

function renderTotalPrice() {
    document.querySelector(".total-price").textContent = `$${totalPrice}`
}

function handleCompleteOrderBtn() {
    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")
    addToCartBtns.forEach(btn => {
        btn.disabled = true;
    })
    document.querySelector(".modal").style.display = "block"
}

function render() {
    html = ""
    for (let i = 0; i < menuArray.length; i++) {
        html += `
        <div class="food-item">
            <p class="food-img">${menuArray[i].emoji}</p>
            <div class="description">
                <h3>${menuArray[i].name}</h3>
                <p class="ingredients">${menuArray[i].ingredients}</p>
                <p class="price">$${menuArray[i].price}</p>
            </div>
            <button class="add-to-cart-btn" data-id=${menuArray[i].id}>+</button>
        </div>
    `
    }
    document.querySelector(".menu-container").innerHTML += html
}

render()

document.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        handleAddToCartBtn(e.target.dataset.id)
    } else if (e.target.dataset.index) {
        removeFromCart(e.target.dataset.index)
    } else if (e.target.id === "complete-order-btn") {
        handleCompleteOrderBtn()
    }
})

const consentForm = document.getElementById("consent-form")
consentForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const consentFormData = new FormData(consentForm)
    const fullName = consentFormData.get('fullName')
    document.querySelector(".modal").style.display = "none"
    document.querySelector(".cart-container").innerHTML =
        `
    <div class="confirmation-container">
        <h3>Thanks, ${fullName}! Your order is on its way!</h3>
    </div>
    `
})

