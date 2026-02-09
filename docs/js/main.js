const PRODUCTS = {
  "HandBag": {
    name: "Riñonara Femenina",
    price: "$25.000",
    description: "Riñonera artesanal de cuero genuino, hecho a mano con atención al detalle. Ideal para uso diario.",
    images: [
      "assets/products/HandBags/HandBag-blackGreen.webp",
      "assets/products/HandBags/HandBag-blackRainbow.webp",
      "assets/products/HandBags/HandBag-blackYellow.webp",
      "assets/products/HandBags/HandBag-green.webp",
      "assets/products/HandBags/HandBag-rainbow.webp",
      "assets/products/HandBags/HandBag-red.webp",
      "assets/products/HandBags/HandBag-yellow.webp",
      "assets/products/HandBags/HandBag-black.webp"
    ],
    whatsapp: "https://wa.me/2964522833"
  },
  "FannyPack": {
    name: "Riñonara Masculina",
    price: "$20.000",
    description: "Riñonera artesanal de cuero genuino, hecho a mano con atención al detalle. Ideal para uso diario.",
    images: [
      "assets/products/FannyPacks/Fanny-brown.webp",
      "assets/products/FannyPacks/Fanny-black_01.webp",
    ],
    whatsapp: "https://wa.me/2964522833"
  }
};

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId || !PRODUCTS[productId]) {
  console.error("Producto no encontrado");
} else {
  loadProduct(PRODUCTS[productId]);
}

function loadProduct(product) {
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = product.price;
  document.getElementById("productDescription").textContent = product.description;
  document.getElementById("whatsappBtn").href = product.whatsapp;

  const mainImage = document.getElementById("mainImage");
  const thumbnailRow = document.getElementById("thumbnailRow");

  mainImage.src = product.images[0];
  thumbnailRow.innerHTML = "";

  product.images.forEach((imgSrc, index) => {
    const thumb = document.createElement("img");
    thumb.src = imgSrc;
    thumb.alt = product.name;
    if (index === 0) thumb.classList.add("active");

    thumb.addEventListener("click", () => {
      mainImage.src = imgSrc;

      document.querySelectorAll(".thumbnail-row img")
        .forEach(img => img.classList.remove("active"));

      thumb.classList.add("active");
    });

    thumbnailRow.appendChild(thumb);
  });
}