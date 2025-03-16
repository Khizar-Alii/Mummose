document.addEventListener("DOMContentLoaded", () => {
  // Retrieve cart items from localStorage
  const storedCartItems = localStorage.getItem("cart");
  const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

  console.log("Items : ", cartItems);

  // Function to calculate the total price for an item
  const calculateItemTotal = (item) => {
    const basePrice = parseFloat(
      item.price.replace(" SEK", "").replace(" :-", "")
    );
    const toppingPrice = item.topping
      ? parseFloat(item.topping.price.replace(" :-", ""))
      : 0;
    const gramPrice = item.gram
      ? parseFloat(item.gram.price.replace(" :-", ""))
      : 0;
    return (basePrice + toppingPrice + gramPrice) * item.quantity;
  };

  // Calculate total order, sales tax, and total amount
  let totalOrder = 0;
  cartItems.forEach((item) => {
    totalOrder += calculateItemTotal(item);
  });

  const salesTax = totalOrder * 0.12;
  const deliveryCharges = 100;
  const totalAmount = totalOrder + salesTax + deliveryCharges;

  // Get the PaymentContLeft container
  const paymentContLeft = document.querySelector(".PaymentContLeft");

  // Add Cart Items to PaymentContLeft
  cartItems.forEach((item) => {
    const itemTotal = calculateItemTotal(item);

    // Create the PaymentContLeftTop container
    const paymentContLeftTop = document.createElement("div");
    paymentContLeftTop.classList.add("PaymentContLeftTop");

    // Create the Left Side (Image and Content)
    const paymentContLeftTopLeft = document.createElement("div");
    paymentContLeftTopLeft.classList.add("PaymentContLeftTopLeft");

    const itemImage = document.createElement("img");
    itemImage.src = "/Assets/food1.jpg";
    itemImage.alt = item.title;

    const paymentContLeftTopContent = document.createElement("div");
    paymentContLeftTopContent.classList.add("PaymentContLeftTopContent");

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = item.title;

    const itemCategory = document.createElement("h1");
    itemCategory && itemCategory.classList.add("se");
    itemCategory.textContent = item.category;

    const itemQuantity = document.createElement("p");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    paymentContLeftTopContent.appendChild(itemTitle);
    paymentContLeftTopContent.appendChild(itemCategory);
    paymentContLeftTopContent.appendChild(itemQuantity);

    paymentContLeftTopLeft.appendChild(itemImage);
    paymentContLeftTopLeft.appendChild(paymentContLeftTopContent);

    // Create the Right Side (Subtotal)
    const paymentContLeftTopRight = document.createElement("div");
    paymentContLeftTopRight.classList.add("PaymentContLeftTopRight");

    const subtotalLabel = document.createElement("p");
    subtotalLabel.textContent = "Subtotal:";

    const subtotalValue = document.createElement("span");
    subtotalValue.textContent = `${itemTotal.toFixed(2)} SEK`;

    paymentContLeftTopRight.appendChild(subtotalLabel);
    paymentContLeftTopRight.appendChild(subtotalValue);

    // Append Left and Right to Top Container
    paymentContLeftTop.appendChild(paymentContLeftTopLeft);
    paymentContLeftTop.appendChild(paymentContLeftTopRight);

    // Append Top Container to Left Container
    paymentContLeft.appendChild(paymentContLeftTop);
  });

  // Add Order Options (Delivery/Pickup)
  const paymentContLeftOrderOptions = document.createElement("div");
  paymentContLeftOrderOptions.classList.add("PaymentContLeftOrderOptions");

  // total order
  const totalOrderHeading = document.createElement("h3");
  totalOrderHeading.innerHTML = "Order Options";
  totalOrderHeading.classList.add("totalOrderHeading");
  paymentContLeftOrderOptions.appendChild(totalOrderHeading);

  const totalOrderCont = document.createElement("div");
  totalOrderCont.classList.add("totalOrderCont");
  paymentContLeftOrderOptions.appendChild(totalOrderCont);

  const totalOrderContWrap = document.createElement("div");
  totalOrderContWrap.classList.add("totalOrderContWrap");

  const deliveryOption = document.createElement("label");
  deliveryOption.innerHTML = `
      <input type="radio" class="topping-radio-payment" name="deliveryOption" value="delivery" checked />
      Delivery
    `;

  const pickupOption = document.createElement("label");
  pickupOption.innerHTML = `
      <input type="radio" class="topping-radio-payment" name="deliveryOption" value="pickup" />
      Pickup
    `;

  totalOrderContWrap.appendChild(deliveryOption);
  totalOrderContWrap.appendChild(pickupOption);
  totalOrderCont.appendChild(totalOrderContWrap);
  paymentContLeft.appendChild(paymentContLeftOrderOptions);

  // Add Total Order Section
  const paymentContLeftTotalOrder = document.createElement("div");
  paymentContLeftTotalOrder.classList.add("PaymentContLeftTotalOrder");

  const totalOrderDiv = document.createElement("div");
  totalOrderDiv.innerHTML = `
      <span class="totalOrdermain">Total Order</span>
      <span id="totalOrder">SEK ${totalOrder.toFixed(2)} :-</span>
    `;

  const salesTaxDiv = document.createElement("div");
  salesTaxDiv.innerHTML = `
      <span class="totalOrderprice">Sales Tax (12%)</span>
      <span id="salesTax">SEK ${salesTax.toFixed(2)} :-</span>
    `;

  const deliveryChargesDiv = document.createElement("div");
  deliveryChargesDiv.innerHTML = `
      <span class="totalOrderprice">Delivery Charges</span>
      <span id="deliveryCharges">SEK ${deliveryCharges.toFixed(2)} :-</span>
    `;

  const totalAmountDiv = document.createElement("div");
  totalAmountDiv.classList.add("totalAmountDiv");
  totalAmountDiv.innerHTML = `
      <span>Total Amount</span>
      <span id="totalAmount">SEK ${totalAmount.toFixed(2)} :-</span>
    `;

  paymentContLeftTotalOrder.appendChild(totalOrderDiv);
  paymentContLeftTotalOrder.appendChild(salesTaxDiv);
  paymentContLeftTotalOrder.appendChild(deliveryChargesDiv);
  paymentContLeft.appendChild(paymentContLeftTotalOrder);
  paymentContLeft.appendChild(totalAmountDiv);

  // Add Date Picker
  const paymentContLeftDatePicker = document.createElement("div");
  paymentContLeftDatePicker.classList.add("PaymentContLeftDatePicker");

  const datePickerLabel = document.createElement("span");
  datePickerLabel.textContent = "Delivery Date";

  const datePickerInput = document.createElement("input");
  datePickerInput.type = "date";
  datePickerInput.id = "deliveryDate";
  datePickerInput.min = new Date().toISOString().split("T")[0];

  // Disable weekends
  datePickerInput.addEventListener("change", () => {
    const selectedDate = new Date(datePickerInput.value);
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      alert("Delivery is not available on weekends. Please select a weekday.");
      datePickerInput.value = "";
    }
  });

  // Open date picker when clicking anywhere in the date container
  paymentContLeftDatePicker.addEventListener("click", () => {
    datePickerInput.showPicker();
  });

  paymentContLeftDatePicker.appendChild(datePickerLabel);
  paymentContLeftDatePicker.appendChild(datePickerInput);
  paymentContLeft.appendChild(paymentContLeftDatePicker);

  // Add Time Picker
  const paymentContLeftTimePicker = document.createElement("div");
  paymentContLeftTimePicker.classList.add("PaymentContLeftTimePicker");

  const timePickerLabel = document.createElement("span");
  timePickerLabel.textContent = "Delivery Time";

  const timePickerInput = document.createElement("input");
  timePickerInput.type = "time";
  timePickerInput.id = "deliveryTime";

  // Open time picker when clicking anywhere in the time container
  paymentContLeftTimePicker.addEventListener("click", () => {
    timePickerInput.showPicker();
  });

  paymentContLeftTimePicker.appendChild(timePickerLabel);
  paymentContLeftTimePicker.appendChild(timePickerInput);
  paymentContLeft.appendChild(paymentContLeftTimePicker);

  // Add Special Instructions
  const paymentContLeftSpecialInst = document.createElement("div");
  paymentContLeftSpecialInst.classList.add("PaymentContLeftSpecialInst");

  const specialInstructionsLabel = document.createElement("h2");
  specialInstructionsLabel.textContent = "Special Instructions";

  const specialInstructionsTextarea = document.createElement("textarea");
  specialInstructionsTextarea.id = "specialInstructions";
  specialInstructionsTextarea.rows = 4;
  specialInstructionsTextarea.placeholder =
    "Enter Special Instructions Here...";

  paymentContLeftSpecialInst.appendChild(specialInstructionsLabel);
  paymentContLeftSpecialInst.appendChild(specialInstructionsTextarea);
  paymentContLeft.appendChild(paymentContLeftSpecialInst);

  // Payment Container Right
  const paymentContRight = document.querySelector(".PaymentContRight");

  // Add Payment Information Heading
  const paymentHeading = document.createElement("h2");
  paymentHeading.textContent = "Payment Information";
  paymentHeading.classList.add("paymentHeading");
  paymentContRight.appendChild(paymentHeading);

  const paymentContRightWrapper = document.createElement("div");
  paymentContRightWrapper.classList.add("paymentContRightWrapper");
  paymentContRight.appendChild(paymentContRightWrapper);

  // Add Name on Card Label and Input
  const nameOnCardLabel = document.createElement("label");
  nameOnCardLabel.textContent = "Name on Card";
  nameOnCardLabel.classList.add("paymentLabel");
  paymentContRightWrapper.appendChild(nameOnCardLabel);

  const nameOnCardInput = document.createElement("input");
  nameOnCardInput.type = "text";
  nameOnCardInput.placeholder = "Name on Card";
  nameOnCardInput.classList.add("paymentInput");
  paymentContRightWrapper.appendChild(nameOnCardInput);

  // Add Card Information Label and Input
  const cardInfoLabel = document.createElement("label");
  cardInfoLabel.textContent = "Card Information";
  cardInfoLabel.classList.add("paymentLabel");
  paymentContRightWrapper.appendChild(cardInfoLabel);

  const cardInfoInputContainer = document.createElement("div");
  cardInfoInputContainer.classList.add("cardInfoInputContainer");

  const cardInfoInput = document.createElement("input");
  cardInfoInput.type = "text";
  cardInfoInput.placeholder = "1234 1234 1234 1234";
  cardInfoInput.classList.add("paymentInput", "cardInfoInput");

  const cardIcons = document.createElement("div");
  cardIcons.classList.add("cardIcons");

  const visaIcon = document.createElement("img");
  visaIcon.src = "Assets/visaCard.png"; // Replace with actual path
  visaIcon.alt = "Visa";

  const mastercardIcon = document.createElement("img");
  mastercardIcon.src = "Assets/masterCard.png"; // Replace with actual path
  mastercardIcon.alt = "Mastercard";

  const amexIcon = document.createElement("img");
  amexIcon.src = "Assets/americanExpress.png"; // Replace with actual path
  amexIcon.alt = "American Express";

  cardIcons.appendChild(visaIcon);
  cardIcons.appendChild(mastercardIcon);
  cardIcons.appendChild(amexIcon);

  cardInfoInputContainer.appendChild(cardInfoInput);
  cardInfoInputContainer.appendChild(cardIcons);
  paymentContRightWrapper.appendChild(cardInfoInputContainer);

  // Add Expiry Date and CVC Inputs
  const expiryCvcContainer = document.createElement("div");
  expiryCvcContainer.classList.add("expiryCvcContainer");

  const expiryDateInput = document.createElement("input");
  expiryDateInput.type = "text";
  expiryDateInput.placeholder = "MM/YY";
  expiryDateInput.classList.add("paymentInput", "expiryDateInput");

  const CvcContainer = document.createElement("div");
  CvcContainer.classList.add("cvcContainer");

  const cvcInput = document.createElement("input");
  cvcInput.type = "text";
  cvcInput.placeholder = "CVC";
  cvcInput.classList.add("cvcInput");

  const cvvIcon = document.createElement("img");
  cvvIcon.src = "Assets/cvc 1.png"; // Replace with actual path
  cvvIcon.alt = "cvc";

  CvcContainer.appendChild(cvcInput);
  CvcContainer.appendChild(cvvIcon);

  expiryCvcContainer.appendChild(expiryDateInput);
  expiryCvcContainer.appendChild(CvcContainer);
  paymentContRightWrapper.appendChild(expiryCvcContainer);

  // Add Billing Address Checkbox
  const billingAddressCheckboxContainer = document.createElement("div");
  billingAddressCheckboxContainer.classList.add(
    "billingAddressCheckboxContainer"
  );

  const billingAddressCheckbox = document.createElement("input");
  billingAddressCheckbox.type = "checkbox";
  billingAddressCheckbox.id = "billingAddressCheckbox";
  billingAddressCheckbox.classList.add("topping-radio-payment");

  const billingAddressLabel = document.createElement("label");
  billingAddressLabel.textContent =
    "Billing address is same as Shipping Address";
  billingAddressLabel.setAttribute("for", "billingAddressCheckbox");

  billingAddressCheckboxContainer.appendChild(billingAddressCheckbox);
  billingAddressCheckboxContainer.appendChild(billingAddressLabel);
  paymentContRightWrapper.appendChild(billingAddressCheckboxContainer);

  // Add Proceed with Payment Button
  const proceedPaymentButton = document.createElement("button");
  proceedPaymentButton.textContent = "Proceed with Payment";
  proceedPaymentButton.classList.add("proceedPaymentButton");
  paymentContRightWrapper.appendChild(proceedPaymentButton);

  // Function to update delivery charges based on selected option
  function updateDeliveryCharges() {
    const deliveryCharges = 100; // Delivery charges
    const totalOrder = calculateTotalOrder(); // Calculate total order without delivery charges
    const salesTax = totalOrder * 0.12; // Calculate sales tax

    let totalAmount;

    if (deliveryOptionInput.checked) {
      // If delivery is selected, add delivery charges
      totalAmount = totalOrder + salesTax + deliveryCharges;
      document.getElementById("deliveryCharges").textContent = `SEK ${deliveryCharges.toFixed(2)} :-`;
    } else {
      // If pickup is selected, exclude delivery charges
      totalAmount = totalOrder + salesTax;
      document.getElementById("deliveryCharges").textContent = `SEK 0.00 :-`;
    }

    // Update the total amount displayed
    document.getElementById("totalAmount").textContent = `SEK ${totalAmount.toFixed(2)} :-`;
  }

  // Function to calculate the total order without delivery charges
  function calculateTotalOrder() {
    let totalOrder = 0;
    cartItems.forEach((item) => {
      totalOrder += calculateItemTotal(item);
    });
    return totalOrder;
  }

  // Add event listeners to delivery options
  const deliveryOptionInput = document.querySelector('input[name="deliveryOption"][value="delivery"]');
  const pickupOptionInput = document.querySelector('input[name="deliveryOption"][value="pickup"]');

  deliveryOptionInput.addEventListener("change", updateDeliveryCharges);
  pickupOptionInput.addEventListener("change", updateDeliveryCharges);

  // Set initial delivery charges and total amount on page load
  updateDeliveryCharges();
});