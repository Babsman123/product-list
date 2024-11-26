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
    category.classList.add("category");

    //PRICE
    const price = document.createElement("p");
    price.textContent = `$${item.price}`;
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
    increase.classList.add("increase");

    itemNum.appendChild(decrease);
    itemNum.appendChild(cartNum);
    itemNum.appendChild(increase);

    const order = document.querySelector(".product-order");
    const removeListOrder = document.querySelector(".list-order");

    const cancelOrder = document.createElement("img");
    cancelOrder.src = "assets/images/icon-remove-item.svg";

    //CART NUMBER
    let addNum = 1;
    const currentPrice = item.price.toFixed(2);

    const cartOrder = document.createElement("div");

    const listItem = document.createElement("p");
    listItem.textContent = `${addNum}x @ $${currentPrice} $${item.price.toFixed(
      2
    )}`;
    listItem.classList.add("order-price");

    const listName = document.createElement("p");
    listName.textContent = item.name;
    listName.classList.add("order-name");

    cartOrder.appendChild(listName);
    cartOrder.appendChild(listItem);
    cartOrder.appendChild(cancelOrder);

    // order.appendChild(cartOrder);
    let orderNum = document.querySelector(".order-num");

    function numCart() {
      let numNew = 1;

      return {
        increment: function () {
          let itemNew = Number(orderNum.textContent) + numNew;
          orderNum.textContent = itemNew;

          if (itemNew > 0) {
            removeListOrder.classList.add("list-order-remove");

            cancelOrder.addEventListener("click", () => {
              let itemNew = Number(orderNum.textContent) + itemNew;
              console.log(itemNew);
              console.log("i clicked here");
            });
          }
        },

        decrement: function () {
          let itemNew = Number(orderNum.textContent) - numNew;
          orderNum.textContent = itemNew;

          if (itemNew === 0) {
            removeListOrder.classList.remove("list-order-remove");
            console.log("carNum needs to show");
          }
        },
      };
    }

    let listPrice = item.price;

    function addPrice() {
      let priceNum = Number(listPrice);

      return {
        priceHigh: function () {
          priceNum += item.price;
          return `$${priceNum.toFixed(2)}`;
        },

        priceLow: function () {
          priceNum -= item.price;
          return `$${priceNum.toFixed(2)}`;
        },
      };
    }

    const priceIn = addPrice();
    const callCart = numCart();

    cart.addEventListener("click", () => {
      callCart.increment();
      order.appendChild(cartOrder);
      removeListOrder.classList.add("list-order-remove");
      itemNum.classList.add("item-num-display");
      cart.classList.add("add-cart-display");
      picture.classList.add("hover-img");
    });

    increase.addEventListener("click", () => {
      addNum++;
      cartNum.textContent = addNum;

      const newPrice = priceIn.priceHigh();
      listItem.textContent = `${cartNum.textContent}x @ $${currentPrice} ${newPrice}`;

      callCart.increment();
    });

    decrease.addEventListener("click", () => {
      addNum--;
      cartNum.textContent = addNum;

      const newPrice = priceIn.priceLow();
      listItem.textContent = `${cartNum.textContent}x @ $${currentPrice} ${newPrice}`;

      callCart.decrement();

      if (addNum === 0) {
        console.log("im now zero");

        listItem.textContent = `$${item.price}`;
        const newPrice = priceIn.priceHigh();
        listItem.textContent = `1x @ $${currentPrice} ${newPrice}`;
        console.log(listItem);
      }
      if (addNum < 1) {
        cartNum.textContent = 1;
        addNum++;
        itemNum.classList.remove("item-num-display");
        cart.classList.remove("add-cart-display");
        cartOrder.remove();
        picture.classList.remove("hover-img");
      } else {
        cartNum.textContent = addNum;
        // listItem.textContent = item.price;
      }
    });

    cancelOrder.addEventListener("click", () => {
      cartNum.textContent = 1;
      addNum = 1;
      listItem.textContent;
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

  // const btn = document.querySelectorAll(".btn");
  // btn.forEach((button, index) => {
  //   button.addEventListener("click", () => {
  //     console.log(data[index]);
  //   });
  // });
}

// function numCart() {
//   let numNew = 1;

//   return {
//     increment: function () {
//       let itemNew = Number(orderNum.textContent) + numNew;
//       orderNum.textContent = itemNew;

//       if (itemNew > 0) {
//         removeListOrder.classList.add("list-order-remove");

//         cancelOrder.addEventListener("click", () => {
//           itemNew -= addNum;
//           orderNum.textContent = itemNew;
//         });
//       }
//     },

//     decrement: function () {
//       let itemNew = Number(orderNum.textContent) - numNew;
//       orderNum.textContent = itemNew;

//       if (itemNew === 0) {
//         removeListOrder.classList.remove("list-order-remove");
//         console.log("carNum needs to show");
//       }
//     },
//   };
// }
