const PRODUCTS = {
  "HandBag": {
    name: "Riñonara Femenina",
    price: "$25.000",
    description: "Riñonera artesanal de cuero genuino, hecho a mano con atención al detalle. Ideal para uso diario.",
    images: [
      {
        full: "assets/products/HandBags/full/HandBag-blackGreen.webp",
        thumb: "assets/products/HandBags/thumb/HandBag-blackGreen.webp",
        label: "Negro / Verde"
      },
      {
        full: "assets/products/HandBags/full/HandBag-blackRainbow.webp",
        thumb: "assets/products/HandBags/thumb/HandBag-blackRainbow.webp",
        label: "Negro / Verde"
      },
      {
        full: "assets/products/HandBags/full/HandBag-blackYellow.webp",
        thumb: "assets/products/HandBags/thumb/HandBag-blackYellow.webp",
        label: "Negro / Verde"
      },
      {
        full: "assets/products/HandBags/full/HandBag-green.webp",
        thumb: "assets/products/HandBags/thumb/HandBag-green.webp",
        label: "Negro / Verde"
      },
      {
        full: "assets/products/HandBags/full/HandBag-rainbow.webp",
        thumb: "assets/products/HandBags/thumb/HandBag-rainbow.webp",
        label: "Negro / Verde"
      },
      {
        full: "assets/products/HandBags/full/HandBag-red.webp",
        thumb: "assets/products/HandBags/thumb/HandBag-red.webp",
        label: "Negro / Verde"
      },
      {
        full: "assets/products/HandBags/full/HandBag-yellow.webp",
        thumb: "assets/products/HandBags/thumb/HandBag-yellow.webp",
        label: "Negro / Verde"
      },
      {
        full: "assets/products/HandBags/full/HandBag-black.webp",
        thumb: "assets/products/HandBags/thumb/HandBag-black.webp",
        label: "Negro / Verde"
      },
    ],
    whatsapp: "https://wa.me/2964522833"
  },
  "FannyPack": {
    name: "Riñonara Masculina",
    price: "$20.000",
    description: "Riñonera artesanal de cuero genuino, hecho a mano con atención al detalle. Ideal para uso diario.",
    images: [
      {
        full: "assets/products/FannyPacks/full/Fanny-brown.webp",
        thumb: "assets/products/FannyPacks/thumb/Fanny-brown.webp",
        label: "Negro / Verde"
      },
      {
        full: "assets/products/FannyPacks/full/Fanny-black.webp",
        thumb: "assets/products/FannyPacks/thumb/Fanny-black.webp",
        label: "Negro / Verde"
      },
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

    // Load only ONE large image initially
    mainImage.src = product.images[0].full;
    mainImage.alt = product.name;

    thumbnailRow.innerHTML = "";

    product.images.forEach((img, index) => {
        const thumb = document.createElement("img");

        thumb.src = img.thumb;
        thumb.alt = img.label || product.name;
        thumb.loading = "lazy";

        if (index === 0) thumb.classList.add("active");

        thumb.addEventListener("click", () => {
        mainImage.src = img.full;

        document
            .querySelectorAll("#thumbnailRow img")
            .forEach(i => i.classList.remove("active"));

        thumb.classList.add("active");
        });

        thumbnailRow.appendChild(thumb);
    });
}
