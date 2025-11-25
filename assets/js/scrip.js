let productsArray = [
    { id: 1, title: "Coffee", image: "./assets/images/71ivuglvY+L.jpg", price: 25000, count: 1, categoryName: "HotDrinks" },
    { id: 2, title: "Americano", image: "./assets/images/americano.jpg", price: 64000, count: 1, categoryName: "HotDrinks" },
    { id: 3, title: "Turkish coffee", image: "./assets/images/turk-coffee.jpg", price: 30000, count: 1, categoryName: "HotDrinks" },
    { id: 4, title: "Mocha", image: "./assets/images/mocha.jpg", price: 45000, count: 1, categoryName: "HotDrinks" },
    { id: 5, title: "Masala tea", image: "./assets/images/masala.jpg", price: 20000, count: 1, categoryName: "HotDrinks" },
    { id: 6, title: "Latte", image: "./assets/images/images.jpg", price: 78000, count: 1, categoryName: "HotDrinks" },
    { id: 7, title: "Tea", image: "./assets/images/tea.jpg", price: 15000, count: 1, categoryName: "HotDrinks" },

    { id: 8, title: "Mocktail", image: "./assets/images/mocktail.jpg", price: 95000, count: 1, categoryName: "ColdDrinks" },
    { id: 9, title: "Mojito", image: "./assets/images/Mojito.jpg", price: 56000, count: 1, categoryName: "ColdDrinks" },
    { id: 10, title: "Milkshake", image: "./assets/images/Milkshake-Feature-1.jpg", price: 48000, count: 1, categoryName: "ColdDrinks" },
    { id: 11, title: "Lemonade", image: "./assets/images/lemonade.jpg", price: 35000, count: 1, categoryName: "ColdDrinks" },
    { id: 12, title: "Natural Juice", image: "./assets/images/natural-juice.jpg", price: 60000, count: 1, categoryName: "ColdDrinks" },
    { id: 13, title: "Strawberry Syrup", image: "./assets/images/Jowhareh_galleries_2_poster_3053c3e1-2819-4dcc-b48c-fc330bbebc2b.jpeg", price: 75000, count: 1, categoryName: "ColdDrinks" },

    { id: 14, title: "Mixed Pizza", image: "./assets/images/steak-pizza.jpg", price: 140000, count: 1, categoryName: "Pizza" },
    { id: 15, title: "Sicilian Pizza", image: "./assets/images/پیتزا-سیسیلی.jpg", price: 250000, count: 1, categoryName: "Pizza" },
    { id: 16, title: "Pepperoni Pizza", image: "./assets/images/3-1.jpg", price: 180000, count: 1, categoryName: "Pizza" },

    { id: 17, title: "Tiramisu", image: "./assets/images/tiramisu-cake.webp", price: 38000, count: 1, categoryName: "Cake" },
    { id: 18, title: "Panini", image: "./assets/images/PANINI.jpg", price: 42000, count: 1, categoryName: "Cake" },
    { id: 19, title: "Charlotte Royale Cake", image: "./assets/images/Charlotte-Royale-Cake.webp", price: 84000, count: 1, categoryName: "Cake" },
    { id: 20, title: "Pancake", image: "./assets/images/pancake.jpg", price: 44000, count: 1, categoryName: "Cake" },
];

let $ = document;
const shoppingCartContainer = $.querySelector("#shoppingCart-container");
const openShoppingBtn = $.querySelector(".open-shopping");
const closeShoppingBtn = $.querySelector(".close-shopping");
const totalQuantityBasket = $.querySelector(".total-quantity");
const listItemsCategories = $.querySelector(".list-items");
const totalAverageBasket = $.querySelector('.total-average');
const searchInputProducts = $.querySelector(".search-input");
const paginationContainer = $.querySelector(".pagination-container");

let currentPage = 1;
let perPage = 4;
let filteredProducts = [...productsArray];

openShoppingBtn.addEventListener("click", () => $.body.classList.add("active"));
closeShoppingBtn.addEventListener("click", () => $.body.classList.remove("active"));

function allProducts(products) {
    shoppingCartContainer.innerHTML = "";
    products.forEach(product => {
        let card = $.createElement("div");
        card.className = "cart";
        card.innerHTML = `
            <div class="cart-image">
                <img src="${product.image}">
            </div>
            <div class="cart-content d-flex align-items-center justify-content-between px-2">
                <h6 class="cart-title">${product.title}</h6>
                <h6 class="cart-price">$${product.price}</h6>
            </div>
            <button class="addToCart">add to Cart</button>
        `;
        card.querySelector(".addToCart").addEventListener("click", () => addProductToBasket(product.id));
        shoppingCartContainer.append(card);
    });
};

function setupFilters() {
    filteredProducts = [...productsArray];
    renderPaginationProducts();
    setupPagination();

    let categoryButtons = $.querySelectorAll(".category-value");
    categoryButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            let active = $.querySelector(".category-value.active");
            if (active) active.classList.remove("active");
            button.classList.add("active");

            let cat = e.target.dataset.name;
            filteredProducts = cat === "All" ? [...productsArray] : productsArray.filter(p => p.categoryName === cat);

            currentPage = 1;
            renderPaginationProducts();
            setupPagination();
        });
    });

    searchInputProducts.addEventListener("keyup", (event) => {
        let value = event.target.value.toLowerCase().trim();
        filteredProducts = value === "" ? [...productsArray] : productsArray.filter(p => p.title.toLowerCase().startsWith(value));
        currentPage = 1;
        renderPaginationProducts();
        setupPagination();
    });
}

setupFilters();

let userBasket = [];

function addProductToBasket(id) {
    let exist = userBasket.find(p => p.id === id);
    if (exist) exist.count++;
    else userBasket.push({ ...productsArray.find(p => p.id === id), count: 1 });
    renderBasket();
    saveToLocalStorage();
};

function plusCount(id) {
    let item = userBasket.find(p => p.id === id);
    item.count++;
    renderBasket();
    saveToLocalStorage();
};

function minusCount(id) {
    let item = userBasket.find(p => p.id === id);
    if (item.count > 1) {
        item.count--;
        renderBasket();
        saveToLocalStorage();
    }
};

function removeItem(id) {
    userBasket = userBasket.filter(p => p.id !== id);
    renderBasket();
    saveToLocalStorage();
};

function renderBasket() {
    listItemsCategories.innerHTML = "";
    userBasket.forEach(product => {
        let li = $.createElement("li");
        li.className = "liItem";
        li.innerHTML = `
            <div class="product cart-column d-flex align-items-center">
                <img class="cart-item-image" src="${product.image}">
                <span class="cart-item-title ms-3">${product.title}</span>
            </div>
            <div class="price">
                <span class="cart-item-price">$ ${product.price * product.count}</span>
            </div>
            <div class="quantity cart-column d-flex align-items-center">
                <button class="plus-btn"><i class="fa-solid fa-plus"></i></button>
                <span class="cart-quantity-span">${product.count}</span>
                <button class="minus-btn"><i class="fa-solid fa-minus"></i></button>
                <button class="remove-item-btn ms-auto"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `;
        li.querySelector(".plus-btn").addEventListener("click", () => plusCount(product.id));
        li.querySelector(".minus-btn").addEventListener("click", () => minusCount(product.id));
        li.querySelector(".remove-item-btn").addEventListener("click", () => removeItem(product.id));
        listItemsCategories.append(li);
    });
    calcTotalPrice();
    totalQuantity();
};

function calcTotalPrice() {
    totalAverageBasket.innerHTML = "$ " + userBasket.reduce((total, value) => total + value.price * value.count, 0);
};

function totalQuantity() {
    totalQuantityBasket.innerHTML = userBasket.length;
};

function saveToLocalStorage() {
    localStorage.setItem("product", JSON.stringify(userBasket));
};

function loadLocalStorage() {
    let data = JSON.parse(localStorage.getItem("product"));
    if (data) {
        userBasket = data;
        renderBasket();
    }
}

window.addEventListener("load", loadLocalStorage);

function renderPaginationProducts() {
    const firstPageIndex = (currentPage - 1) * perPage;
    const lastPageIndex = firstPageIndex + perPage;
    allProducts(filteredProducts.slice(firstPageIndex, lastPageIndex));
};

function setupPagination() {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(filteredProducts.length / perPage);
    const prevButton = $.createElement("span");
    prevButton.innerHTML = '<i class="fa-notdog fa-solid fa-angle-left"></i>';
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPaginationProducts();
            setupPagination();
        };
    });
    paginationContainer.append(prevButton);
    for (let page = 1; page <= totalPages; page++) {
        let pageButton = $.createElement("button");
        pageButton.innerHTML = page;
        if (page === currentPage) pageButton.classList.add("active");
        pageButton.addEventListener("click", () => {
            currentPage = page;
            renderPaginationProducts();
            setupPagination();
        });
        paginationContainer.append(pageButton);
    };
    const nextButton = $.createElement("span");
    nextButton.innerHTML = '<i class="fa-notdog fa-solid fa-angle-right"></i>';
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPaginationProducts();
            setupPagination();
        };
    });
    paginationContainer.append(nextButton);
};

renderPaginationProducts();
setupPagination();
