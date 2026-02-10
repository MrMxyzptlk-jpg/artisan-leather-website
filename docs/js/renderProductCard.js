function createProductCard(product) {
    const firstImage = product.images[0];

    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
        <a href="product.html?id=${product.key}">
        <div class="product-image-frame">
            <img src="${firstImage.full}" alt="${product.name}" loading="lazy">
            ${firstImage.available === false ? `<span class="agotado-badge">AGOTADO</span>` : ``}
        </div>
        </a>

        <h3>
        <a href="product.html?id=${product.key}">
            ${product.name}
        </a>
        </h3>

        <p class="price">${product.price}</p>
    `;

    return card;
}

window.createProductCard = createProductCard;
