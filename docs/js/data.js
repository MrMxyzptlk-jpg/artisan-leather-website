const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRwmBHdvjqSTq6xSAagHoCKXJ6CJ7KOMKM4BJfTO38HdnprkklhYFpS7gEb7fKcW-PGrVVUXdW4YRXQ/pub?output=csv";
const CACHE_KEY = "cataleya_products";
const CACHE_TIME = 1000; // adjust later

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
            destacado:
                row.destacado === "TRUE" ||
                row.destacado === "✓" ||
                row.destacado === "1"
            };
        }

        PRODUCTS[key].colors.push(row.color);

        PRODUCTS[key].images.push({
            color: row.color,
            available: row.disponible === "TRUE",
            full: `assets/products/${key}s/full/${row.image_base}.webp`,
            thumb: `assets/products/${key}s/thumb/${row.image_base}.webp`
        });
        });

    return PRODUCTS;
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

window.loadProductsFromSheet = loadProductsFromSheet;
