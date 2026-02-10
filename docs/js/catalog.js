loadProductsFromSheet().then(PRODUCTS => {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    Object.values(PRODUCTS).forEach(product => {
        grid.appendChild(createProductCard(product));
    });
});
