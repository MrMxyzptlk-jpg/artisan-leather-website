const productContainer = document.getElementById("productDetail");

if (productContainer) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  loadProductsFromSheet().then(PRODUCTS => {
    if (!productId || !PRODUCTS[productId]) {
      console.error("Producto no encontrado");
      return;
    }

    loadProduct(PRODUCTS[productId]);
  });
}

function loadProduct(product) {
    const mainImage = document.getElementById("mainImage");
    const thumbnailRow = document.getElementById("thumbnailRow");
    const colorList = document.getElementById("colorList");
    const agotadoBadge = document.getElementById("agotadoBadge");
    const whatsappBtn = document.getElementById("whatsappBtn");
    const whatsappNumber = "542964522833";

    mainImage.loading = "eager";
    mainImage.decoding = "async";

    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = product.price;
    document.getElementById("productDescription").textContent = product.description;

    function setActive(index) {
        const img = product.images[index];
        mainImage.src = img.full;

        thumbnails.forEach(t => t.classList.remove("active"));
        colors.forEach(c => c.classList.remove("active"));

        thumbnails[index].classList.add("active");
        colors[index].classList.add("active");
        agotadoBadge.classList.toggle("hidden", img.available);

        const productURL = window.location.href;

        const message =
`Hola! Me interesa este producto:
${product.name}
Color: ${img.color}
Precio: ${product.price}
¿Está disponible?`;

        const encodedMessage = encodeURIComponent(message);
        whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    }

    thumbnailRow.innerHTML = "";
    colorList.innerHTML = "";

    const thumbnails = [];
    const colors = [];

    product.images.forEach((img, index) => {
        const thumb = document.createElement("img");
        thumb.src = img.thumb;
        thumb.loading = "lazy";
        thumb.decoding = "async";
        thumb.onclick = () => setActive(index);
        if (!img.available) thumb.classList.add("agotado-thumb");

        thumbnailRow.appendChild(thumb);
        thumbnails.push(thumb);

        const li = document.createElement("li");
        li.textContent = img.color;
        if (!img.available) li.classList.add("agotado-color");
        li.onclick = () => setActive(index);

        colorList.appendChild(li);
        colors.push(li);
    });

    setActive(0);
}
