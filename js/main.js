// Header Scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});
// Products Array
const products = [
  {
    id: 1,
    title: "FireWood Stone",
    price: 264.9,
    image:
      "https://static.wixstatic.com/media/6dd441_55999b72110e470e8388fc82efcc3991~mv2.png/v1/crop/x_71,y_58,w_1110,h_694/fill/w_876,h_548,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Miller%20FP%20Object.png",
  },
  {
    id: 2,
    title: "Eloise Stone Fireplace Surround",
    price: 295,
    image:
      "https://static.wixstatic.com/media/6dd441_2cb4f555b3f94492af77551ff7bc3bbc~mv2.jpg/v1/fill/w_572,h_572,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6dd441_2cb4f555b3f94492af77551ff7bc3bbc~mv2.jpg",
  },
  {
    id: 3,
    title: "Lexington Fireplace Mantel",
    price: 74.9,
    image:
      "https://stonemt.net/wp-content/uploads/2021/11/SMC-21043-Website-uai-2064x1474.png",
  },
  {
    id: 4,
    title: "Dayton",
    price: 80,
    image:
      "https://stonemt.net/wp-content/uploads/2021/06/SMC-05-Website-uai-2064x1474.jpg",
  },
  {
    id: 5,
    title: "Premiumn Stone Exterior Trim",
    price: 48.99,
    image:
      "https://stonemt.net/wp-content/uploads/2022/09/20190607_134107-scaled.jpg",
  },
  {
    id: 6,
    title: "Contemporary Design",
    price: 395,
    image:
      "https://stonemt.net/wp-content/uploads/2016/09/traditional-family-room-18-1.jpg",
  },
  {
    id: 7,
    title: "Custom Mnatel Panel",
    price: 48.99,
    image:
      "https://stonemt.net/wp-content/uploads/2016/09/IMG_5779.jpg",
  },
  {
    id: 8,
    title: "Stone Fireplace Mantel",
    price: 79.99,
    image:
      "https://stonemt.net/wp-content/uploads/2016/09/Panel-Surround.jpg",
  },
];

// Get the products list and elements
const productList = document.getElementById("productList");
const cartItemsElement = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");

// Store Cart Items In Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Products On Page
function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
    <div class="product">
    <img src="${product.image}" alt="${product.title}" class="product-img" />
    <div class="product-info">
      <h2 class="product-title">${product.title}</h2>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
    </div>
  </div>
    `
    )
    .join("");
  // Add to cart
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCart);
  }
}

// Add to cart
function addToCart(event) {
  const productID = parseInt(event.target.dataset.id);
  const product = products.find((product) => product.id === productID);

  if (product) {
    // If product already in cart
    const exixtingItem = cart.find((item) => item.id === productID);

    if (exixtingItem) {
      exixtingItem.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }
    // Change Add to cart text to added
    event.target.textContent = "Added";
    updateCartIcon();
    saveToLocalStorage();
    renderCartItems();
    calculateCartTotlal();
  }
}

// Remove from cart
function removeFromCart(event) {
  const productID = parseInt(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productID);
  saveToLocalStorage();
  renderCartItems();
  calculateCartTotlal();
  updateCartIcon();
}
// Quantity Change
function changeQuantity(event) {
  const productID = parseInt(event.target.dataset.id);
  const quantity = parseInt(event.target.value);

  if (quantity > 0) {
    const cartItem = cart.find((item) => item.id === productID);
    if (cartItem) {
      cartItem.quantity = quantity;
      saveToLocalStorage();
      calculateCartTotlal();
      updateCartIcon();
    }
  }
}
// SaveToLocalStorage
function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render Prodcuts On Cart Page
function renderCartItems() {
  cartItemsElement.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
    <img src="${item.image}" alt="${item.title}" />
    <div class="cart-item-info">
      <h2 class="cart-item-title">${item.title}</h2>
      <input
        class="cart-item-quantity"
        type="number"
        name=""
        min="1"
        value="${item.quantity}"
        data-id="${item.id}"
      />
    </div>
    <h2 class="cart-item-price">$${item.price}</h2>
    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
  </div>
    `
    )
    .join("");
  // Remove From Cart
  const removeButtons = document.getElementsByClassName("remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }
  // Quantity Change
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", changeQuantity);
  });
}

// Claculate Total
function calculateCartTotlal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Check If On Cart Page
if (window.location.pathname.includes("cart.html")) {
  renderCartItems();
  calculateCartTotlal();
} else if (window.location.pathname.includes("success.html")) {
  clearCart();
} else {
  renderProducts();
}
// Empty Cart on successfull payment
function clearCart() {
  cart = [];
  saveToLocalStorage();
  updateCartIcon;
}
// Cart Icon Quantity
const cartIcon = document.getElementById("cart-icon");

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + iyem.quantity, 0);
  cartIcon.setAttribute("data-quantity", totalQuantity);
}

updateCartIcon();

function updateCartIconOnCartChange() {
  updateCartIcon();
}

window.addEventListener("storage", updateCartIconOnCartChange);

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.setAttribute("data-quantity", totalQuantity);
}

renderProducts();
renderCartItems();
calculateCartTotlal();
