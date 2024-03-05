// import axios from "axios";
// import * as Carousel from "./Carousel.js";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");

/**
 * Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using Axios.
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *   - Each option should have a value attribute equal to the id of the breed.
 *   - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
async function initialLoad() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    const breeds = response.data;
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    // Call event handler for breed selection
    breedSelect.addEventListener("change", handleBreedSelection);
    // Call handleBreedSelection immediately with the default selected breed
    handleBreedSelection();
  } catch (error) {
    console.error("Error fetching breeds:", error);
  }
}

/**
 * Event handler for breedSelect that retrieves information on the selected breed from the cat API.
 * - Retrieves data of the selected breed from the API using Axios.
 * - Clears existing carousel items and populates with new data.
 */
async function handleBreedSelection() {
  try {
    const selectedBreedId = breedSelect.value;
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=10`);
    const breedData = response.data;
    Carousel.clear();
    breedData.forEach(item => {
      const imgSrc = item.url;
      const imgAlt = item.breeds[0].name;
      const imgId = item.id;
      const carouselItem = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);
      Carousel.appendCarousel(carouselItem);
    });
  } catch (error) {
    console.error("Error fetching breed data:", error);
  }
}

// Call initialLoad function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", initialLoad);
