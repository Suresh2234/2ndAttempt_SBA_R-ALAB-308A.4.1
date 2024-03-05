// import axios from "axios";
// import { clear } from "./index.js";

/**
 * Function to create a carousel item.
 * @param {string} imgSrc - Image source URL.
 * @param {string} imgAlt - Image alt text.
 * @param {string} imgId - Image ID.
 * @returns {HTMLElement} - Carousel item element.
 */
export function createCarouselItem(imgSrc, imgAlt, imgId) {
    const template = document.querySelector("#carouselItemTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);

    const img = clone.querySelector("img");
    img.src = imgSrc;
    img.alt = imgAlt;

    const favBtn = clone.querySelector(".favourite-button");
    favBtn.addEventListener("click", () => {
        favourite(imgId);
    });

    return clone;
}

/**
 * Function to clear all carousel items.
 */
export function clear() {
    const carousel = document.querySelector("#carouselInner");
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }
}

/**
 * Function to append a carousel item to the carousel.
 * @param {HTMLElement} element - Carousel item element.
 */
export function appendCarousel(element) {
    const carousel = document.querySelector("#carouselInner");

    const activeItem = document.querySelector(".carousel-item.active");
    if (!activeItem) element.classList.add("active");

    carousel.appendChild(element);
}

/**
 * Function to handle favouriting an image.
 * @param {string} imgId - Image ID.
 */
export async function favourite(imgId) {
    try {
        const response = await axios.post("https://api.thecatapi.com/v1/favourites", { image_id: imgId });
        console.log("Favourited:", response.data);
    } catch (error) {
        console.error("Error favouriting image:", error);
    }
}
