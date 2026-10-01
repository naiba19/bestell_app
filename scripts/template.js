function createMealTemplate(meal) {
      return `
      <article class="product-card">
           <img src="${meal.image}" alt="${meal.name}" class="product-image">
            <div class="product-info">
                <h3>${meal.name}</h3>
                <p>${meal.description}</p>
            </div>
            <div class="product-action">
                <span class="product-price">${meal.price.toFixed(2).replace(".", ",")}€</span>
                <button class="add-button" aria-label="Add to basket">
                    +
                </button>
            </div>
        </article>
    `;
}