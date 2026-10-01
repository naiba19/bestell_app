const basket = [];
function renderMeals() {
    const burgerList = document.querySelector("#burger-list");
    const pizzaList = document.querySelector("#pizza-list");
    const saladList = document.querySelector("#salad-list");

    burgerList.innerHTML = "";
    pizzaList.innerHTML = "";
    saladList.innerHTML = "";

    meals
        .filter((meal) => meal.category === "Burger & Sandwiches")
        .forEach((meal) => {
            burgerList.innerHTML += createMealTemplate(meal);
        });
    meals
        .filter((meal) => meal.category === "Pizza")
        .forEach((meal) => {
            pizzaList.innerHTML += createMealTemplate(meal);
        });

    meals
        .filter((meal) => meal.category === "Salads")
        .forEach((meal) => {
            saladList.innerHTML += createMealTemplate(meal);
        });
}


// Add to basket
function addToBasket(event) {
    const button = event.target.closest(".add-button");

    if (!button) {
        return;
    }

    const productCard = button.closest(".product-card");

    const name = productCard.querySelector("h3").textContent;
    const priceText = productCard.querySelector(".product-price").textContent;

    const price = parseFloat(
        priceText.replace("€", "").replace(",", ".")
    );

    const existingMeal = basket.find((item) => item.name === name);

    if (existingMeal) {
        existingMeal.quantity++;
    } else {
        const meal = {
            name: name,
            price: price,
            quantity: 1
        };

        basket.push(meal);
    }
    console.log(basket);
    renderBasket();
    updateBasket();
}

// Render basket
function renderBasket() {
    const basketItems = document.querySelector(".basket-items");

    basketItems.innerHTML = "";

    basket.forEach((meal) => {
        const basketItem = document.createElement("div");
        basketItem.classList.add("basket-item");

        basketItem.innerHTML = `
        <div class="basket-item-info">
        <strong>${meal.quantity} x ${meal.name}</strong>
        <div class="basket-controls">
            <button class="minus-button">−</button>
            <span>${meal.quantity}</span>
            <button class="plus-button">+</button>
        </div>
    </div>
    <span class="basket-item-price">
        ${meal.price.toFixed(2).replace(".", ",")}€
    </span>
`;

        basketItems.appendChild(basketItem);
        const plusButton = basketItem.querySelector(".plus-button");

        plusButton.addEventListener("click", () => {
            meal.quantity++;
            renderBasket();
            updateBasket();
        });

        const minusButton = basketItem.querySelector(".minus-button");

        minusButton.addEventListener("click", () => {
            if (meal.quantity > 1) {
                meal.quantity--;
            } else {
                const index = basket.indexOf(meal);
                basket.splice(index, 1);
            }

            renderBasket();
            updateBasket();
        });

    });
}

// Update total
function updateBasket() {
    let subtotal = 0;

    basket.forEach((meal) => {
        subtotal += meal.price * meal.quantity;
    });

    const deliveryFee = basket.length > 0 ? 4.99 : 0;
    const total = subtotal + deliveryFee;

    const subtotalElement = document.querySelector(".subtotal");
    const deliveryElement = document.querySelector(".delivery-fee");
    const totalElement = document.querySelector(".total");

    subtotalElement.textContent = `${subtotal.toFixed(2).replace(".", ",")}€`;
    deliveryElement.textContent = `${deliveryFee.toFixed(2).replace(".", ",")}€`;
    totalElement.textContent = `${total.toFixed(2).replace(".", ",")}€`;
    mobileBasketTotal.textContent =
    `${total.toFixed(2).replace(".", ",")}€`;

    const buyButton = document.querySelector(".buy-button");
    buyButton.textContent = `Buy now (${total.toFixed(2).replace(".", ",")}€)`;

    console.log("Subtotal:", subtotal);
    console.log("Total:", total);
}


document.addEventListener("click", addToBasket);



// Update total
// Change quantity


// Buy order
// Buy order
function buyOrder() {
    if (basket.length === 0) {
        return;
    }

    basket.length = 0;
    renderBasket();
    updateBasket();
    document.querySelector(".basket").classList.add("hidden");
    showConfirmation();
    hideConfirmation();
}

const buyButton = document.querySelector(".buy-button");

buyButton.addEventListener("click", buyOrder);


// Show confirmation
function showConfirmation() {
    const confirmation = document.querySelector(".confirmation");

    confirmation.classList.add("show");
}
// Hide confirmation
function hideConfirmation() {
    const confirmation = document.querySelector(".confirmation");

    setTimeout(() => {
        confirmation.classList.remove("show");
        document.querySelector(".basket").classList.remove("hidden");
    }, 3000);
}
const closeConfirmation = document.querySelector(".close-confirmation");
closeConfirmation.addEventListener("click", () => {
    const confirmation = document.querySelector(".confirmation");

    confirmation.classList.remove("show");
});

const mobileBasketButton = document.querySelector("#mobile-basket-button");
const mobileBasketTotal = document.querySelector("#mobile-basket-total");
// Event listener
renderMeals();
renderBasket();



mobileBasketButton.addEventListener("click", () => {
    const basketElement = document.querySelector(".basket");

    basketElement.classList.toggle("mobile-open");
});