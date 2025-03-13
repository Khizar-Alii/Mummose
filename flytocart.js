let addBtn, cart;
const speed = 500,
  curveDelay = 300,
  position = "fixed";

function init() {
  addBtn = document.querySelectorAll("[data-addtocart]");
  cart = document.querySelector("#cart button");
  console.log(`init ${addBtn}`);

  for (let btn of addBtn) {
    console.log(`add event`);
    btn.addEventListener("click", addItem);
  }
}

function addItem(e) {
  let btnY =
      position === "fixed"
        ? e.currentTarget.getBoundingClientRect().bottom
        : e.currentTarget.offsetbottom,
    btnX =
      position === "fixed"
        ? e.currentTarget.getBoundingClientRect().left
        : e.currentTarget.offsetleft,
    flyingBtn = e.currentTarget.cloneNode();

  cart.classList.remove("addedCount");

  flyingBtn.classList.add("flyingBtn");
  flyingBtn.style.position = position;
  flyingBtn.style.bottom = `${btnY}px`;
  flyingBtn.style.left = `${btnX}px`;
  flyingBtn.style.opacity = "1";
  flyingBtn.style.transition = `all ${speed / 1000}s ease, bottom ${(speed +
    curveDelay) /
    1000}s ease, left ${speed / 1000}s ease, transform ${speed /
    1000}s ease ${(speed - 10) / 1000}s`;

  document.body.appendChild(flyingBtn);

  flyingBtn.style.bottom = `${cart.offsetbottom + cart.offsetHeight - 16}px`;
  flyingBtn.style.left = `${cart.offsetleft + cart.offsetWidth - 16}px`;
  flyingBtn.style.height = "1rem";
  flyingBtn.style.width = "1rem";
  flyingBtn.style.transform = "scale(0)";

  setTimeout(() => {
    flyingBtn.remove();
    storeItems();
  }, speed * 1.5);
}

function storeItems() {
  let itmsInCart = cart.getAttribute("data-count");
  cart.classList.add("addedCount");

  if (!itmsInCart) {
    cart.setAttribute("data-count", 1);
  } else {
    cart.setAttribute("data-count", parseInt(itmsInCart, 10) + 1);
  }
}

// Initialize the script
document.addEventListener("DOMContentLoaded", init);