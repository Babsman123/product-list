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
        return `$${totalPrice.toFixed(2)}`;
      },

      decreaseTotal: function () {
        totalPrice -= addMore;
        return `$${totalPrice.toFixed(2)}`;
      },
    };
  }

  //CONFIRM ORDER BUTTON STARTS HERE
  const confirmOrder = document.createElement("div");
  confirmOrder.classList.add("confirm-order");
  const confirmText = document.createElement("button");
  confirmText.classList.add("confirm-text");
  confirmText.textContent = `Confirm Order`;

  confirmOrder.appendChild(confirmText);

  //BLUR OVERLAY
  const overlay = document.querySelector(".overlay");

  //CARBON-DELIVERY BUTTON IS HERE
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

  const totalPriceDetails = document.createElement("div");
  totalPriceDetails.classList.add("total-price-details");

  const showOrder = document.createElement("span");
  showOrder.textContent = `Order Total`;
  showOrder.classList.add("show-order");

  const showPrice = document.createElement("span");
  showPrice.textContent = totalPrice;
  showPrice.classList.add("show-price");

  const blurLayout = document.createElement("div");
  blurLayout.classList.add("blur");

  //TOTAL PRICE FOR  RECEIPT FOR THE TOTAL AMOUNT OF PRODUCT PICKED
  const receiptTotalPrice = document.createElement("div");
  receiptTotalPrice.classList.add("receipt-total-price");

  const receiptTotalOrder = document.createElement("span");
  receiptTotalOrder.textContent = showOrder.textContent;
  receiptTotalOrder.classList.add("receipt-total-order");

  const receiptTotalAmount = document.createElement("span");
  receiptTotalAmount.classList.add("receipt-total-amount");

  receiptTotalPrice.appendChild(receiptTotalOrder);
  receiptTotalPrice.appendChild(receiptTotalAmount);

  //TOTAL PRICE FOR RECEIPT END HERE
  const customerOrder = document.querySelector(".customer-order");
  console.log(customerOrder);

  const resetOrder = document.querySelector(".new-order");
  console.log(resetOrder);

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
    cartNum.classList.add("cart-num");
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

    //SHOW ORDER PAGE
    const cartOrder = document.createElement("div");
    cartOrder.classList.add("cart-order");

    const cartOrderItem = document.createElement("div");
    const productOrder = document.querySelector(".product-order");

    const listItem = document.createElement("div");

    const itemTimes = document.createElement("span");
    itemTimes.textContent = `${addNum}X`;
    itemTimes.classList.add("item-times");

    const itemDetails = document.createElement("span");
    itemDetails.textContent = `@ $${currentPrice}`;
    itemDetails.classList.add("item-details");

    const itemDetailsPrice = document.createElement("span");
    itemDetailsPrice.textContent = `$${item.price.toFixed(2)}`;
    itemDetailsPrice.classList.add("item-details-price");

    listItem.appendChild(itemTimes);
    listItem.appendChild(itemDetails);
    listItem.appendChild(itemDetailsPrice);
    listItem.classList.add("order-price");

    const listName = document.createElement("p");
    listName.textContent = item.name;
    listName.classList.add("order-name");

    cartOrderItem.appendChild(listName);
    cartOrderItem.appendChild(listItem);

    cartOrder.appendChild(cartOrderItem);
    cartOrder.appendChild(cancelOrder);

    totalPriceDetails.appendChild(showOrder);
    totalPriceDetails.appendChild(showPrice);

    let orderNum = document.querySelector(".order-num");
    //CLOSURE FOR THE NUMBER OF CARTS PICKED AND SHOWING NUMBER
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
            confirmOrder.remove();
            carbon.remove();
            totalPriceDetails.remove();
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

    // const totalPriceDisplay = document.getElementById("total-price");
    const orderList = document.createElement("div");
    orderList.classList.add("order-list");

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    const productTotalPrice = document.createElement("p");
    productTotalPrice.textContent = itemDetailsPrice.textContent;
    productTotalPrice.classList.add("product-price");

    const orderItem = document.createElement("div");

    const orderText = document.createElement("p");
    orderText.classList.add("product-name");
    orderText.textContent = listName.textContent;

    const orderDetails = document.createElement("P");
    orderDetails.classList.add("order-details");

    const orderTimes = document.createElement("span");
    orderTimes.textContent = itemTimes.textContent;
    orderDetails.textContent = itemDetails.textContent;

    orderDetails.appendChild(orderTimes);

    orderItem.appendChild(orderText);
    orderItem.appendChild(orderDetails);

    const orderImg = document.createElement("img");
    orderImg.src = item.image.mobile;
    orderImg.alt = item.name;

    productDetails.appendChild(orderImg);
    productDetails.appendChild(orderItem);

    orderList.appendChild(productDetails);
    orderList.appendChild(productTotalPrice);

    //BUTTON ADD TO CART EVENT HAPPENS HERE
    cart.addEventListener("click", () => {
      callCart.increment();
      order.appendChild(cartOrder);
      productOrder.appendChild(totalPriceDetails);
      productOrder.appendChild(carbon);
      productOrder.appendChild(confirmOrder);
      itemNum.classList.add("item-num-display");
      cart.classList.add("add-cart-display");
      picture.classList.add("hover-img");

      const price = Number(item.price);
      const priceOperate = addToTotal(price);
      showPrice.textContent = priceOperate.increaseTotal();

      confirmOrder.addEventListener("click", () => {
        overlay.classList.remove("hidden");

        customerOrder.appendChild(orderList);
        customerOrder.appendChild(receiptTotalPrice);
        console.log(customerOrder);
        receiptTotalAmount.textContent = showPrice.textContent;
      });
    });

    //INCREASE BUTTON INCREASE START HERE (TO INCREASE THE PRICE AND ITEM PICKED NUMBERS)
    increase.addEventListener("click", () => {
      addNum++;
      cartNum.textContent = addNum;
      const newPrice = priceIn.priceHigh();

      itemTimes.textContent = `${cartNum.textContent}X`;
      itemDetails.textContent = ` @ $${currentPrice} `;
      itemDetailsPrice.textContent = `${newPrice}`;

      const price = Number(item.price);
      const priceOperate = addToTotal(price);

      orderTimes.textContent = itemTimes.textContent;
      productTotalPrice.textContent = `${newPrice}`;
      showPrice.textContent = priceOperate.increaseTotal();

      callCart.increment();
      receiptTotalAmount.textContent = showPrice.textContent;
    });

    //DECREASE BUTTON START HERE (TO DECREASE THE PRICE AND ITEM PICKED NUMBERS)
    decrease.addEventListener("click", () => {
      addNum--;
      cartNum.textContent = addNum;

      const newPrice = priceIn.priceLow();

      itemTimes.textContent = `${cartNum.textContent}X`;
      itemDetails.textContent = ` @ $${currentPrice}`;
      itemDetailsPrice.textContent = `${newPrice}`;

      const price = Number(item.price);
      const priceOperate = addToTotal(price);

      showPrice.textContent = priceOperate.decreaseTotal();

      callCart.decrement();
      orderTimes.textContent = itemTimes.textContent;
      productTotalPrice.textContent = `${newPrice}`;
      receiptTotalAmount.textContent = showPrice.textContent;

      //WHEN NUMCART IS EQUAL TO ZERO THIS SHOULD HAPPEN (CARTNUM CONTENT)
      if (addNum === 0) {
        const newPrice = priceIn.priceHigh();
        itemTimes.textContent = `1X`;
        itemDetails.textContent = ` @ $${currentPrice}`;
        itemDetailsPrice.textContent = `${newPrice}`;

        orderTimes.textContent = itemTimes.textContent;
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

      itemTimes.textContent = `${cartNum.textContent}X`;
      itemDetails.textContent = ` @ $${currentPrice}`;
      itemDetailsPrice.textContent = `$${item.price.toFixed(2)}`;

      priceNum = item.price;
      console.log(document.querySelector(".order-list"));

      itemNum.classList.remove("item-num-display");
      cart.classList.remove("add-cart-display");
      picture.classList.remove("hover-img");

      totalPrice -= cancelPrice;
      showPrice.textContent = `$${totalPrice.toFixed(2)}`;

      confirmOrder.addEventListener("click", () => {
        orderList.remove();
      });

      if (cancelNum === 0) {
        removeListOrder.classList.remove("list-order-remove");
        confirmOrder.remove();
        carbon.remove();
        totalPriceDetails.remove();
      }
    });

    resetOrder.addEventListener("click", () => {
      console.log("i want to reset the order now");
      overlay.classList.add("hidden");
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
}

// productOrder.appendChild(totalPriceDetails);
