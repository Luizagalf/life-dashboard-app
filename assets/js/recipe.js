const jsonRecipes = require("./jsonRecipes.js");
const getId = require("./utils");

let recipe = getId("recipe");
let allRecipes = [];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    let recipes = JSON.parse(jsonRecipes);

    recipes.forEach(recipe => {
        allRecipes.push(`
            <figure class="image" style="margin-left: auto; margin-right: auto;">
                <img style="" alt="" src="${recipe.img}">
            </figure>
            <a href="${recipe.url}"><p class="title is-4">${recipe.name}</p>
            <p class="content">${recipe.description}</p></a>
    `);
    });

    randomRecipe();
});



heartBtn.addEventListener('click', () => {
    let unLiked = getId("recipeUnlikedHeart");
    let liked = getId("recipeLikedHeart");
    if (unLiked.style.display == "block") {
        liked.style.display = "block";
        unLiked.style.display = "none";
        localStorage.setItem(`likedHeart-${currentIndex}`, `block none`);
    } else {
        liked.style.display = "none";
        unLiked.style.display = "block";
        localStorage.setItem(`likedHeart-${currentIndex}`, `none block`);
    }
})

let randomRecipe = () => {
    let unLiked = getId("recipeUnlikedHeart");
    let liked = getId("recipeLikedHeart");
    let random = Math.floor(Math.random() * allRecipes.length);
    if (currentIndex != random) {
        currentIndex = random;
        recipe.innerHTML = allRecipes[currentIndex];
        let likedHeart = localStorage.getItem(`likedHeart-${currentIndex}`);
        if (likedHeart == null) {
            liked.style.display = "none";
            unLiked.style.display = "block";
        } else {
            liked.style.display = likedHeart.split(" ")[0];
            unLiked.style.display = likedHeart.split(" ")[1];
        }
    } else {
        randomRecipe();
    }
}

btnRecipe.addEventListener('click', () => {
    randomRecipe();
})

module.exports = randomRecipe