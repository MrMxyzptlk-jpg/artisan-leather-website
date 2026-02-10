# Leather Goods Catalog Website

A responsive, static catalog website built for a local leather artisan to showcase handmade handbags, purses, and fanny packs.
The project combines a clean visual design with a **dynamic product system powered by Google Sheets**, making it easy for non-technical users to manage products, prices, and featured items.

This repository also serves as a real-world freelance and portfolio project.

---

## Project Overview

This website provides a simple and effective digital presence for a small leather goods venture.
Rather than implementing a full e-commerce solution, the focus is on:

* Clear product presentation
* Performance and fast load times
* Maintainability
* Ease of content updates without touching code

The site includes:

* A landing page with brand introduction and featured products
* A product catalog with variants, colors, and prices
* Contact information for direct inquiries

---

## Dynamic Product System

Products are managed externally using **Google Sheets**, which acts as a lightweight CMS.
The website fetches and parses the sheet at runtime and builds the catalog automatically.

Each row in the sheet represents a **product variant + color**, allowing:

* Centralized price updates
* Easy availability toggling
* Featured product selection
* No redeploy needed for content changes

### Key Features

* Products are grouped by `product_key` and `variant_key`
* Prices and descriptions update automatically from the sheet
* Available colors are rendered dynamically
* Featured products ("destacados") are shown on the landing page
* The featured image corresponds to the selected featured color

### Featured Products (Destacados)

A product variant is considered **featured** if **any of its rows** in the Google Sheet has the `destacado` column enabled.

* Multiple colors can be marked as featured
* The last featured color in the sheet is used as the landing page image
* This behavior is deterministic and safe

---

## Technologies Used

* HTML5 (semantic markup)
* CSS3 (Flexbox and Grid)
* Vanilla JavaScript (modular, progressive enhancement)
* Google Sheets (CSV publishing) as a data source
* WebP images for optimized performance
* LocalStorage for lightweight caching
* GitHub Pages for deployment

---

## Design Principles

* Clean and minimal layout
* Mobile-first, responsive design
* Emphasis on product imagery
* Neutral color palette inspired by leather tones
* Fast loading and low bandwidth usage
* No framework dependencies

---

## Image Optimization

All product images are optimized using the **WebP** format to reduce file size and improve loading times.

* Images are resized and compressed before deployment
* Separate `full` and `thumb` versions are used
* Lazy loading is applied where appropriate

Image paths are generated dynamically based on product and variant keys.

---

## Caching Strategy

To improve performance and reduce unnecessary network requests:

* Product data is cached using `localStorage`
* Cache expiration is configurable
* The site gracefully falls back to fresh data when needed

---

## Deployment

The website is deployed using **GitHub Pages** and is accessible at:

[> *Live demo link*](https://mrmxyzptlk-jpg.github.io/artisan-leather-website/)

---

## Purpose

This project was created as:

* A real, usable website for a local artisan venture
* A freelance-style portfolio project
* A practical example of using Google Sheets as a CMS
* A learning exercise focused on clean structure, performance, and maintainability

---

## Future Improvements

* Product filtering by category
* Image gallery / lightbox for product views
* Accessibility audit and improvements
* Optional multilingual support
* Admin-friendly validation for Google Sheet data

---

## Author

Built by **Jeronimo AP** \
Freelance project for a local artisan venture.
