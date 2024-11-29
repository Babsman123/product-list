"use strict";

fetch("data.json")
  .then((response) => response.json())
  .then((data) => displayDesserts(data))
  .catch((error) => console.error("Error loading JSON:", error));

function displayDesserts(data) {
  const menu = document.getElementById("dessertMenu");

  let totalPrice = 0;

  console.log(totalPrice);
  function addToTotal(priceTotal) {
    let addMore = Number(priceTotal);
    return {
      increaseTotal: function () {
        totalPrice += addMore;
        return `Total price: $${totalPrice.toFixed(2)}`;
      },

      decreaseTotal: function () {
        totalPrice -= addMore;
        return `Total price: $${totalPrice.toFixed(2)}`;
      },
    };
  }

  const confirmOrder = document.createElement("div");
  confirmOrder.classList.add("confirm-order");
  const confirmText = document.createElement("button");
  confirmText.classList.add("confirm-text");
  confirmText.textContent = `Confirm Order`;

  confirmOrder.appendChild(confirmText);

  const carbon = document.createElement("div");
  carbon.classList.add("carbon");

  const carbonImg = document.createElement("img");
  carbonImg.src = "assets/images/icon-carbon-neutral.svg";

  const carbonText = document.createElement("div");

  const boldtext = document.createElement("span");
  boldtext.textContent = `carbon-style`;
  boldtext.classList.add("carbon-span");

  const boldtext2 = document.createElement("span");
  boldtext2.textContent = ` delivery`;

  carbonText.textContent = `This is a `;
  carbonText.appendChild(boldtext);
  carbonText.appendChild(boldtext2);

  console.log();
  carbon.appendChild(carbonImg);
  carbon.appendChild(carbonText);

  console.log(carbonText);

  data.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    //CREATE PICTURE ELEMENT
    const picture = document.createElement("picture");

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

    //CART NUMBER FOR THE LIST ITEM CONTENT
    let addNum = 1;
    const currentPrice = item.price.toFixed(2);
    //ENDS HERE

    const cartOrder = document.createElement("div");
    cartOrder.classList.add("cart-order");

    const cartOrderItem = document.createElement("div");
    const productOrder = document.querySelector(".product-order");

    const listItem = document.createElement("p");
    listItem.textContent = `${addNum}x @ $${currentPrice} $${item.price.toFixed(
      2
    )}`;
    listItem.classList.add("order-price");

    const listName = document.createElement("p");
    listName.textContent = item.name;
    listName.classList.add("order-name");

    cartOrderItem.appendChild(listName);
    cartOrderItem.appendChild(listItem);
    cartOrderItem.appendChild(cancelOrder);

    cartOrder.appendChild(cartOrderItem);
    // cartOrder.appendChild(listName);
    // cartOrder.appendChild(listItem);
    // cartOrder.appendChild(cancelOrder);

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
          }
        },

        decrement: function () {
          let itemNew = Number(orderNum.textContent) - numNew;
          orderNum.textContent = itemNew;

          if (itemNew === 0) {
            removeListOrder.classList.remove("list-order-remove");
          }
        },
      };
    }

    //INCREASE/DECREASE THE PRICE THROUGH THE INCREASE BUTTON (START HERE)
    let listPrice = item.price;
    let priceNum = Number(listPrice);

    function addPrice() {
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
    //(END HERE)

    //CAALING OF BOTTH THE ADDPRICE AND NUMCART FUNCTION
    const callCart = numCart();
    const priceIn = addPrice();

    const totalPriceDisplay = document.getElementById("total-price");

    //BUTTON ADD TO CART EVENT HAPPENS HERE
    cart.addEventListener("click", () => {
      callCart.increment();
      order.appendChild(cartOrder);
      productOrder.appendChild(carbon);
      productOrder.appendChild(confirmOrder);
      itemNum.classList.add("item-num-display");
      cart.classList.add("add-cart-display");
      picture.classList.add("hover-img");

      const price = Number(item.price);
      const priceOperate = addToTotal(price);
      console.log(confirmOrder);

      // const newTotalPrice = total.increaseTotal();
      totalPriceDisplay.textContent = priceOperate.increaseTotal();
    });

    //INCREASE BUTTON INCREASE START HERE (TO INCREASE THE PRICE AND ITEM PICKED NUMBERS)
    increase.addEventListener("click", () => {
      addNum++;
      cartNum.textContent = addNum;
      const newPrice = priceIn.priceHigh();

      listItem.textContent = ` ${cartNum.textContent}x @ $${currentPrice} ${newPrice}`;

      const price = Number(item.price);
      const priceOperate = addToTotal(price);

      // const newTotalPrice = total.increaseTotal();
      totalPriceDisplay.textContent = priceOperate.increaseTotal();

      callCart.increment();
    });

    //DECREASE BUTTON START HERE (TO DECREASE THE PRICE AND ITEM PICKED NUMBERS)
    decrease.addEventListener("click", () => {
      addNum--;
      cartNum.textContent = addNum;

      const newPrice = priceIn.priceLow();
      listItem.textContent = `${cartNum.textContent}x @ $${currentPrice} ${newPrice}`;

      const price = Number(item.price);
      const priceOperate = addToTotal(price);

      // const newTotalPrice = total.increaseTotal();
      // ${cartNum.textContent}x @ $${currentPrice}
      totalPriceDisplay.textContent = priceOperate.decreaseTotal();

      callCart.decrement();

      //WHEN NUMCART IS EQUAL TO ZERO THIS SHOULD HAPPEN (CARTNUM CONTENT)
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
      }
    });

    cancelOrder.addEventListener("click", () => {
      let cancelNum =
        Number(orderNum.textContent) - Number(cartNum.textContent);
      orderNum.textContent = cancelNum;
      cartOrder.remove();
      cartNum.textContent = 1;
      addNum = 1;

      let cancelPrice = Number(priceNum);
      console.log(cancelPrice);

      listItem.textContent = ` ${
        cartNum.textContent
      }x @ $${currentPrice} $${item.price.toFixed(2)}`;

      priceNum = item.price;

      itemNum.classList.remove("item-num-display");
      cart.classList.remove("add-cart-display");
      picture.classList.remove("hover-img");

      totalPrice -= cancelPrice;
      totalPriceDisplay.textContent = `Total price: $${totalPrice.toFixed(2)}`;

      if (cancelNum === 0) {
        removeListOrder.classList.remove("list-order-remove");
        confirmOrder.remove();
        carbon.remove();
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

  // const btn = document.querySelectorAll(".btn");
  // btn.forEach((button, index) => {
  //   button.addEventListener("click", () => {
  //     console.log(data[index]);
  //   });
  // });
}
