"use strict";

fetch("data.json")
  .then((response) => response.json())
  .then((data) => displayDesserts(data))
  .catch((error) => console.error("Error loading JSON:", error));

function displayDesserts(data) {
  const menu = document.getElementById("dessertMenu");

  data.forEach((item) => {
    // console.log(item.name);

    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    //CREATE PICTURE ELEMENT
    const picture = document.createElement("picture");
    // console.log(picture);

    //TABLET AND DESKTOP
    const sourceTablet = document.createElement("source");
    sourceTablet.media = "(min-width: 768px)";
    sourceTablet.srcset = item.image.tablet;
    // console.log(sourceTablet);

    const sourceDesktop = document.createElement("source");
    sourceDesktop.media = "(min-width: 1024px)";
    sourceDesktop.srcset = item.image.desktop;
    // console.log(sourceDesktop);

    //FALLBACK IMG TO PHONE SIZE
    const img = document.createElement("img");
    img.src = item.image.mobile;
    img.alt = item.name;

    picture.appendChild(sourceDesktop);
    picture.appendChild(sourceTablet);
    picture.appendChild(img);

    //NAME OF THE PRODUCT
    const name = document.createElement("h3");
    name.textContent = item.name;

    //CATEGORY OF PRODUCT
    const category = document.createElement("p");
    category.textContent = `${item.category}`;

    //PRICE
    const price = document.createElement("p");
    price.textContent = `$ ${item.price}`;
    price.classList.add("price");

    //CART
    const cart = document.createElement("div");
    cart.classList.add("add-cart");

    //ADD CART CONTENT
    const cartImg = document.createElement("img");
    cartImg.src = "assets/images/icon-add-to-cart.svg";

    const cartPara = document.createElement("p");
    cartPara.textContent = `Add To Cart`;

    //CART NUMBER
    const itemNum = document.createElement("div");
    itemNum.classList.add("item-num");

    const decrease = document.createElement("img");
    decrease.src = "assets/images/icon-decrement-quantity.svg";

    const cartNum = document.createElement("p");
    cartNum.textContent = 1;

    const increase = document.createElement("img");
    increase.src = "assets/images/icon-increment-quantity.svg";

    itemNum.appendChild(decrease);
    itemNum.appendChild(cartNum);
    itemNum.appendChild(increase);

    const order = document.querySelector(".product-order");

    cart.addEventListener("click", () => {
      console.log(item);
      console.log(newOrder);
      itemNum.classList.add("item-num-display");
      cart.classList.add("add-cart-display");
    });

    let addNum = 1;
    increase.addEventListener("click", () => {
      addNum++;
      cartNum.textContent = addNum;
    });
    decrease.addEventListener("click", () => {
      addNum--;
      cartNum.textContent = addNum;
      // cartNum.textContent = addNum < 1 ? (addNum = 1) : addNum--;
      // itemNum.classList.remove("item-num-display");
      // cart.classList.remove("add-cart-display");
      if (addNum < 1) {
        cartNum.textContent = 1;
        itemNum.classList.remove("item-num-display");
        cart.classList.remove("add-cart-display");
        order.style.backgroundColor = "yellow";
      } else {
        cartNum.textContent = addNum;
      }
    });

    cart.appendChild(cartImg);
    cart.appendChild(cartPara);

    menuItem.appendChild(picture);
    menuItem.appendChild(category);
    menuItem.appendChild(name);
    menuItem.appendChild(price);
    menuItem.appendChild(cart);
    menuItem.appendChild(itemNum);

    menu.appendChild(menuItem);
  });

  const btn = document.querySelectorAll(".btn");
  btn.forEach((button, index) => {
    button.addEventListener("click", () => {
      console.log(data[index]);
    });
  });
}
