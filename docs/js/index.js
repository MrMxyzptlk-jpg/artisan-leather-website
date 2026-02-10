loadProductsFromSheet().then(PRODUCTS => {
    const grid = document.getElementById("featuredGrid");
    if (!grid) return;

    const destacados = Object.values(PRODUCTS)
        .filter(p => p.destacado === true);

    destacados.slice(0,4).forEach(product => {
        grid.appendChild(createProductCard(product));
    });
});
