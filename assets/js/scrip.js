let productsArray = [
    { id: 1, title: "Coffee", image: "./assets/images/71ivuglvY+L.jpg", price: 25000, count: 1, categoryName: "HotDrinks" },
    { id: 2, title: "Americano", image: "./assets/images/americano.jpg", price: 64000, count: 1, categoryName: "HotDrinks" },
    { id: 3, title: "Turkish coffee", image: "./assets/images/turk-coffee.jpg", price: 30000, count: 1, categoryName: "HotDrinks" },
    { id: 6, title: "Latte", image: "./assets/images/images.jpg", price: 78000, count: 1, categoryName: "HotDrinks" },
    { id: 4, title: "Mocha", image: "./assets/images/mocha.jpg", price: 45000, count: 1, categoryName: "HotDrinks" },
    { id: 5, title: "Masala tea", image: "./assets/images/masala.jpg", price: 20000, count: 1, categoryName: "HotDrinks" },
    { id: 7, title: "Tea", image: "./assets/images/tea.jpg", price: 15000, count: 1, categoryName: "HotDrinks" },

    { id: 8, title: "Mocktail", image: "./assets/images/mocktail.jpg", price: 95000, count: 1, categoryName: "ColdDrinks" },
    { id: 9, title: "Mojito", image: "./assets/images/Mojito.jpg", price: 56000, count: 1, categoryName: "ColdDrinks" },
    { id: 10, title: "Milkshake", image: "./assets/images/Milkshake-Feature-1.jpg", price: 48000, count: 1, categoryName: "ColdDrinks" },
    { id: 11, title: "Lemonade", image: "./assets/images/lemonade.jpg", price: 35000, count: 1, categoryName: "ColdDrinks" },
    { id: 12, title: "Natural Juice", image: "./assets/images/natural-juice.jpg", price: 60000, count: 1, categoryName: "ColdDrinks" },
    { id: 13, title: "Strawberry Syrup", image: "./assets/images/Jowhareh_galleries_2_poster_3053c3e1-2819-4dcc-b48c-fc330bbebc2b.jpeg", price: 75000, count: 1, categoryName: "ColdDrinks" },

    { id: 14, title: "Mixed Pizza", image: "./assets/images/steak-pizza.jpg", price: 140000, count: 1, categoryName: "Pizza" },
    { id: 15, title: "Sicilian Pizza", image: "./assets/images/پیتزا-سیسیلی.jpg", price: 250000, count: 1, categoryName: "Pizza" },
    { id: 16, title: "Pepperoni Pizza", image: "assets/images/3-1.jpg", price: 180000, count: 1, categoryName: "Pizza" },

    { id: 17, title: "Tiramisu", image: "./assets/images/tiramisu-cake.webp", price: 38000, count: 1, categoryName: "Cake" },
    { id: 18, title: "Panini", image: "./assets/images/PANINI.jpg", price: 42000, count: 1, categoryName: "Cake" },
    { id: 19, title: "Charlotte Royale Cake", image: "./assets/images/Charlotte-Royale-Cake.webp", price: 84000, count: 1, categoryName: "Cake" },
    { id: 20, title: "Pancake", image: "./assets/images/pancake.jpg", price: 44000, count: 1, categoryName: "Cake" },
];

let $ = document;
const shoppingCartContainer = $.querySelector("#shoppingCart-container");
const openShoppingBtn = $.querySelector(".open-shopping");
const closeShoppingBtn = $.querySelector('.close-shopping');
const totalQuantityBasket = $.querySelector(".total-quantity");
const listItemsCategories = $.querySelector(".list-items");
const totalAverageBasket = $.querySelector('.total-average');
const searchInputProducts = $.querySelector(".search-input");

openShoppingBtn.addEventListener("click", function () {
    $.body.classList.add("active");
});

closeShoppingBtn.addEventListener("click", function () {
    $.body.classList.remove("active");
});

function allProdaucts(productsArray) {
    shoppingCartContainer.innerHTML = "";
    let ProductCart, ProductCartImageWraper, ProductCartImage, ProductCartContent, ProductCartTitle, ProductCartPrice, ProductCartButton;
    for (let product of productsArray) {
        ProductCart = $.createElement("div");
        ProductCartImageWraper = $.createElement("div");
        ProductCartImage = $.createElement("img");
        ProductCartContent = $.createElement("div");
        ProductCartTitle = $.createElement("h6");
        ProductCartPrice = $.createElement("h6");
        ProductCartButton = $.createElement("button");

        ProductCart.classList.add("cart");
        ProductCartImageWraper.classList.add("cart-image");
        ProductCartImage.setAttribute("src", product.image);
        ProductCartContent.className = "cart-content d-flex align-items-center justify-content-between px-2";
        ProductCartTitle.classList.add("cart-title");
        ProductCartPrice.classList.add("cart-price");
        ProductCartButton.classList.add("addToCart");

        ProductCartTitle.innerHTML = product.title;
        ProductCartPrice.innerHTML = "$" + product.price;
        ProductCartButton.innerHTML = "add to Cart";

        ProductCartImageWraper.append(ProductCartImage);
        ProductCartContent.append(ProductCartTitle, ProductCartPrice);
        ProductCart.append(ProductCartImageWraper, ProductCartContent, ProductCartButton);
        ProductCartButton.addEventListener("click", function () {
            addProductToBasketArray(product.id)
        });
        shoppingCartContainer.append(ProductCart);
    };
};

function filterProducts() {
    allProdaucts(productsArray);
    let categoryButtons = $.querySelectorAll(".category-value");
    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            $.querySelector(".category-value.active").classList.remove("active");
            this.classList.add("active");
            let dataNameButtons = event.target.dataset.name;
            let filterArray = productsArray.filter(function (x) {
                return x.categoryName === dataNameButtons;
            });
            if (dataNameButtons === "All") {
                allProdaucts(productsArray);
            }
            else {
                allProdaucts(filterArray);
            };
        });
    });

    searchInputProducts.addEventListener("keyup", function (event) {
        let searchInputValue = event.target.value;
        let filteredSearchInput = productsArray.filter(function (product) {
            return product.title.toLowerCase().startsWith(searchInputValue.toLowerCase());
        });
        allProdaucts(filteredSearchInput);
    });
};
filterProducts();

let userBasket = [];
function addProductToBasketArray(productId) {
    let mainProducts = productsArray.find(function (product) {
        return product.id === productId;
    });
    let productData;
    let isInBasket = userBasket.some(function (product) {
        if (product.id === productId) {
            productData = product;
            return true;
        };
    });
    if (isInBasket) {
        alert("این محصول درسبدخریدشماموجودمی باشد.");
        productData.count++;
    } else {
        mainProducts.count = 1;
        userBasket.push(mainProducts);
        totalQuantityBasket.innerHTML = userBasket.length;
    };
    addProductGenerate(userBasket);
    setLocalStorage(userBasket);
    calcTotalPrice(userBasket);
};

function addProductGenerate(userBasketArray) {
    listItemsCategories.innerHTML = "";
    let liItem, cartItemWrapper, cartItemImage, cartItemTitle, cartPriceWrapper, cartItemPrice, cartQuantityWrapper, cartItemPlusBtn, cartQuantitySpan, cartItemMinusBtn, cartItemRemoveBtn;
    userBasketArray.forEach(function (product) {
        liItem = $.createElement("li");
        cartItemWrapper = $.createElement("div");
        cartItemImage = $.createElement("img");
        cartItemTitle = $.createElement("span");
        cartPriceWrapper = $.createElement("div");
        cartItemPrice = $.createElement("span");
        cartQuantityWrapper = $.createElement("div");
        cartItemPlusBtn = $.createElement("button");
        cartQuantitySpan = $.createElement("span");
        cartItemMinusBtn = $.createElement("button");
        cartItemRemoveBtn = $.createElement("button");

        liItem.classList.add("liItem");
        cartItemWrapper.className = "product cart-column d-flex align-items-center";
        cartItemImage.classList.add("cart-item-image");
        cartItemTitle.className = "cart-item-title ms-3";
        cartPriceWrapper.classList.add("price");
        cartItemPrice.classList.add("cart-item-price");
        cartQuantityWrapper.className = "quantity cart-column d-flex align-items-center";
        cartItemPlusBtn.classList.add("plus-btn");
        cartQuantitySpan.classList.add("cart-quantity-span");
        cartItemMinusBtn.classList.add("minus-btn");
        cartItemRemoveBtn.className = "remove-item-btn ms-auto";

        cartItemImage.setAttribute("src", product.image);
        cartItemTitle.innerHTML = product.title;
        cartItemPrice.innerHTML = "$ " + product.price * product.count;
        cartQuantitySpan.innerHTML = product.count;
        cartItemPlusBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        cartItemMinusBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
        cartItemRemoveBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

        cartItemWrapper.append(cartItemImage, cartItemTitle);
        cartPriceWrapper.append(cartItemPrice);
        cartQuantityWrapper.append(cartItemPlusBtn, cartQuantitySpan, cartItemMinusBtn, cartItemRemoveBtn);

        liItem.append(cartItemWrapper, cartPriceWrapper, cartQuantityWrapper);

        listItemsCategories.append(liItem);

        cartItemRemoveBtn.addEventListener("click", () => {
            removeItemFromBasket(product.id);
        });
        cartItemMinusBtn.addEventListener("click", () => {
            minusCountItem(product.id);
        });
        cartItemPlusBtn.addEventListener("click", () => {
            plusCountItem(product.id);
        });
    });
};

function plusCountItem(productId) {
    userBasket.forEach(function (product) {
        if (product.id === productId) {
            product.count++;
            product.price * product.count;
            addProductGenerate(userBasket);
            setLocalStorage(userBasket);
            calcTotalPrice();
        };
    });
};

function minusCountItem(productId) {
    userBasket.forEach(function (product) {
        if (product.id === productId) {
            if (product.count !== 1) {
                product.count--;
                addProductGenerate(userBasket);
                setLocalStorage(userBasket);
                calcTotalPrice();
            };
        };
    });
};

function removeItemFromBasket(productId) {
    let mainIndexProduct = userBasket.findIndex(function (product) {
        return product.id === productId;
    });
    userBasket.splice(mainIndexProduct, 1);
    addProductGenerate(userBasket);
    setLocalStorage(userBasket);
    calcTotalPrice();
    totalQuantityBasket.innerHTML = userBasket.length;
};

function setLocalStorage(userBasketArray) {
    localStorage.setItem("product", JSON.stringify(userBasketArray));
};

function calcTotalPrice() {
    let totalAverage = 0;
    userBasket.forEach(function (product) {
        totalAverage = totalAverage + (product.price * product.count);
    });
    totalAverageBasket.innerHTML = "$ " + totalAverage;
};

function getLocalStorage() {
    let localStorageBasket = JSON.parse(localStorage.getItem("product"));
    if (localStorageBasket) {
        userBasket = localStorageBasket;
    } else {
        userBasket = [];
    };
    addProductGenerate(userBasket);
    calcTotalPrice();
    totalQuantityBasket.innerHTML = userBasket.length;
};

window.addEventListener("load", getLocalStorage);
