const basket = [];
function renderMeals() {
    const burgerList = document.querySelector("#burger-list");

    burgerList.innerHTML = "";

    meals
        .filter((meal) => meal.category === "Burger & Sandwiches")
        .forEach((meal) => {
            burgerList.innerHTML += createMealTemplate(meal);
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

        basketItem.innerHTML = `
            <span>${meal.quantity} x ${meal.name} - ${meal.price.toFixed(2)}€</span>
            <button class="minus-button">−</button>
            <button class="plus-button">+</button>
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

    const deliveryFee = 4.99;
    const total = subtotal + deliveryFee;
    const subtotalElement = document.querySelector(".subtotal");
    const totalElement = document.querySelector(".total");
    subtotalElement.textContent = `${subtotal.toFixed(2).replace(".", ",")}€`;
    totalElement.textContent = `${total.toFixed(2).replace(".", ",")}€`;

    console.log("Subtotal:", subtotal);
    console.log("Total:", total);
}


document.addEventListener("click", addToBasket);



// Update total
// Change quantity
// Buy order
// Show confirmation
// Hide confirmation
// Event listener
renderMeals();