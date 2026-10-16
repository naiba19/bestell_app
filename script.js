const basket = [];

function formatPrice(price) {
    return `${price.toFixed(2).replace(".", ",")}€`;
}

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
    renderBasket();
    updateBasket();
}

// Render basket
function renderBasket() {
    const basketItems = document.querySelector(".basket-items");

    basketItems.innerHTML = "";

    basket.forEach((meal, index) => {
        const basketItem = document.createElement("div");
        basketItem.classList.add("basket-item");

        basketItem.innerHTML = `
        <div class="basket-item-info">
        <strong>${meal.quantity} x ${meal.name}</strong>
        <div class="basket-controls">
            <button class="minus-button" data-meal-index="${index}">−</button>
            <span>${meal.quantity}</span>
            <button class="plus-button" data-meal-index="${index}">+</button>
        </div>
    </div>
    <span class="basket-item-price">
        ${formatPrice(meal.price)}
    </span>
`;

        basketItems.appendChild(basketItem);
    });
}

function updateBasketItem(event) {
    const button = event.target.closest(".plus-button, .minus-button");

    if (!button) {
        return;
    }

    const meal = basket[Number(button.dataset.mealIndex)];

    if (!meal) {
        return;
    }

    if (button.classList.contains("plus-button")) {
        meal.quantity++;
    } else if (meal.quantity > 1) {
        meal.quantity--;
    } else {
        basket.splice(Number(button.dataset.mealIndex), 1);
    }

    renderBasket();
    updateBasket();
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

    subtotalElement.textContent = formatPrice(subtotal);
    deliveryElement.textContent = formatPrice(deliveryFee);
    totalElement.textContent = formatPrice(total);
    document.querySelector("#mobile-basket-total").textContent = basket.reduce(
        (count, meal) => count + meal.quantity,
        0
    );

    const buyButton = document.querySelector(".buy-button");
    buyButton.textContent = `Buy now (${formatPrice(total)})`;
}

function buyOrder() {
    if (basket.length === 0) {
        return;
    }

    basket.length = 0;
    renderBasket();
    updateBasket();
    document.querySelector(".basket").classList.add("hidden");
    showConfirmation();
    scheduleConfirmationDismissal();
}

function showConfirmation() {
    const confirmation = document.querySelector(".confirmation");

    confirmation.classList.add("show");
}

function scheduleConfirmationDismissal() {
    const confirmation = document.querySelector(".confirmation");

    setTimeout(() => {
        confirmation.classList.remove("show");
        document.querySelector(".basket").classList.remove("hidden");
    }, 3000);
}

function initializeApp() {
    const basketElement = document.querySelector(".basket");
    const basketItems = document.querySelector(".basket-items");
    const confirmation = document.querySelector(".confirmation");
    let basketResizeTimer;

    document.addEventListener("click", addToBasket);
    basketItems.addEventListener("click", updateBasketItem);
    document.querySelector(".buy-button").addEventListener("click", buyOrder);
    document.querySelector(".close-confirmation").addEventListener("click", () => {
        confirmation.classList.remove("show");
    });
    document.querySelector("#mobile-basket-button").addEventListener("click", () => {
        basketElement.classList.toggle("mobile-open");
    });
    document.querySelector(".basket-close").addEventListener("click", () => {
        basketElement.classList.remove("mobile-open");
    });
    window.addEventListener("resize", () => {
        basketElement.classList.add("resizing");
        clearTimeout(basketResizeTimer);
        basketResizeTimer = setTimeout(() => {
            basketElement.classList.remove("resizing");
        }, 150);
    });

    renderMeals();
    renderBasket();
    updateBasket();
}

initializeApp();