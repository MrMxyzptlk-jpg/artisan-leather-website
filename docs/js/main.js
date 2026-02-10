const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRwmBHdvjqSTq6xSAagHoCKXJ6CJ7KOMKM4BJfTO38HdnprkklhYFpS7gEb7fKcW-PGrVVUXdW4YRXQ/pub?output=csv";
const CACHE_KEY = "cataleya_products";
const CACHE_TIME = 1000 //* 60 * 30; // 30 minutes

function parseCSV(text) {
    const rows = [];
    let row = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const next = text[i + 1];

        if (char === '"' && next === '"') {
        current += '"';
        i++;
        } else if (char === '"') {
        insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
        row.push(current.trim());
        current = "";
        } else if (char === "\n" && !insideQuotes) {
        row.push(current.trim());
        rows.push(row);
        row = [];
        current = "";
        } else {
        current += char;
        }
    }

    row.push(current.trim());
    rows.push(row);

    return rows;
}


async function loadProductsFromSheet() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { time, data } = JSON.parse(cached);
        if (Date.now() - time < CACHE_TIME) return data;
    }

    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const parsed = parseCSV(text);

    const headers = parsed.shift();
    const rows = parsed.map(r =>
        Object.fromEntries(headers.map((h, i) => [h, r[i]]))
    );

    const PRODUCTS = buildProducts(rows);

    localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ time: Date.now(), data: PRODUCTS })
    );

    return PRODUCTS;
}

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

loadProductsFromSheet().then(PRODUCTS => {
    if (!productId || !PRODUCTS[productId]) {
        console.error("Producto no encontrado");
        return;
    }

    loadProduct(PRODUCTS[productId]);
});

function buildProducts(rows) {
    const PRODUCTS = {};

    rows
        .sort((a, b) => Number(a.orden) - Number(b.orden))
        .forEach(row => {
        const key = row.product_key;

        if (!PRODUCTS[key]) {
            PRODUCTS[key] = {
            key,
            name: row.nombre,
            category: row.categoria,
            price: `$${Number(row.precio).toLocaleString("es-AR")}`,
            description: row.detalles || "",
            colors: [],
            images: [],
            };
        }

        PRODUCTS[key].colors.push(row.color);

        PRODUCTS[key].images.push({
            color: row.color,
            available: row.disponible === "TRUE",
            full: `assets/products/${key}s/full/${row.color_key}.webp`,
            thumb: `assets/products/${key}s/thumb/${row.color_key}.webp`
        });
        });

    return PRODUCTS;
}


function loadProduct(product) {
    const mainImage = document.getElementById("mainImage");
    const thumbnailRow = document.getElementById("thumbnailRow");
    const colorList = document.getElementById("colorList");
    const agotadoBadge = document.getElementById("agotadoBadge");

    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = product.price;
    document.getElementById("productDescription").textContent = product.description;

    function setActive(index) {
    const img = product.images[index];
        mainImage.src = product.images[index].full;

        document.querySelectorAll(".thumbnail-row img").forEach(i => i.classList.remove("active"));
        document.querySelectorAll(".color-list li").forEach(i => i.classList.remove("active"));

        thumbnails[index].classList.add("active");
        colors[index].classList.add("active");
        agotadoBadge.classList.toggle("hidden", img.available);
    }

    thumbnailRow.innerHTML = "";
    colorList.innerHTML = "";

    const thumbnails = [];
    const colors = [];

    product.images.forEach((img, index) => {
        const thumb = document.createElement("img");
        thumb.src = img.thumb;
        thumb.alt = img.color;
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
