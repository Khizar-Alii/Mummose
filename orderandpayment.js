// get user data from user info
// document.addEventListener("DOMContentLoaded", () => {
//   const params = new URLSearchParams(window.location.search);

//   const fullName = params.get("fullName");
//   const contactInfo = params.get("contactInfo");
//   const email = params.get("email");
//   const streetName = params.get("streetName");
//   const buildingNumber = params.get("buildingNumber");
//   const zipCode = params.get("zipCode");
//   const entranceCode = params.get("entranceCode");
//   const floor = params.get("floor");
//   const apartment = params.get("apartment");
//   const note = params.get("note");

//   console.log("Full Name:", fullName);
//   console.log("Contact Info:", contactInfo);
//   console.log("Email:", email);
//   console.log("Street Name:", streetName);
//   console.log("Building Number:", buildingNumber);
//   console.log("Zip Code:", zipCode);
//   console.log("Entrance Code:", entranceCode);
//   console.log("Floor:", floor);
//   console.log("Apartment:", apartment);
//   console.log("Note:", note);
// });

// Get items from the cart that are stored in local storage

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

  const deliveryOption = document.createElement("label");
  deliveryOption.innerHTML = `
      <input type="radio" class = "topping-radio-payment" name="deliveryOption" value="delivery" checked />
      Delivery
    `;

  const pickupOption = document.createElement("label");
  pickupOption.innerHTML = `
      <input type="radio" class = "topping-radio-payment" name="deliveryOption" value="pickup" />
      Pickup
    `;

  totalOrderCont.appendChild(deliveryOption);
  totalOrderCont.appendChild(pickupOption);
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
  // paymentContLeftTotalOrder.appendChild(totalAmountDiv);
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

  // Get the PaymentContRight container
  const paymentContRight = document.querySelector(".PaymentContRight");

  // Add Payment Information Heading
  const paymentHeading = document.createElement("h2");
  paymentHeading.textContent = "Payment Information";
  paymentHeading.classList.add("paymentHeading");
  paymentContRight.appendChild(paymentHeading);

  // Add Name on Card Label and Input
  const nameOnCardLabel = document.createElement("label");
  nameOnCardLabel.textContent = "Name on Card";
  nameOnCardLabel.classList.add("paymentLabel");
  paymentContRight.appendChild(nameOnCardLabel);

  const nameOnCardInput = document.createElement("input");
  nameOnCardInput.type = "text";
  nameOnCardInput.placeholder = "Name on Card";
  nameOnCardInput.classList.add("paymentInput");
  paymentContRight.appendChild(nameOnCardInput);

  // Add Card Information Label and Input
  const cardInfoLabel = document.createElement("label");
  cardInfoLabel.textContent = "Card Information";
  cardInfoLabel.classList.add("paymentLabel");
  paymentContRight.appendChild(cardInfoLabel);

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
  paymentContRight.appendChild(cardInfoInputContainer);

  // Add Expiry Date and CVC Inputs
  const expiryCvcContainer = document.createElement("div");
  expiryCvcContainer.classList.add("expiryCvcContainer");

  const expiryDateInput = document.createElement("input");
  expiryDateInput.type = "text";
  expiryDateInput.placeholder = "MM/YY";
  expiryDateInput.classList.add("paymentInput", "expiryDateInput");

  // cvv container
  const CvcContainer = document.createElement("div");
  CvcContainer.classList.add("cvcContainer");


  const cvcInput = document.createElement("input");
  cvcInput.type = "text";
  cvcInput.placeholder = "CVC";
  cvcInput.classList.add( "cvcInput");

  // img
  const cvvIcon = document.createElement("img");
  cvvIcon.src = "Assets/cvc 1.png"; // Replace with actual path
  cvvIcon.alt = "cvc";

  CvcContainer.appendChild(cvcInput)
  CvcContainer.appendChild(cvvIcon)

  expiryCvcContainer.appendChild(expiryDateInput);
  expiryCvcContainer.appendChild(CvcContainer);
  paymentContRight.appendChild(expiryCvcContainer);

  // Add Billing Address Checkbox
  const billingAddressCheckboxContainer = document.createElement("div");
  billingAddressCheckboxContainer.classList.add(
    "billingAddressCheckboxContainer"
  );

  const billingAddressCheckbox = document.createElement("input");
  billingAddressCheckbox.type = "checkbox";
  billingAddressCheckbox.id = "billingAddressCheckbox";
  billingAddressCheckbox.classList.add("topping-radio-payment")

  const billingAddressLabel = document.createElement("label");
  billingAddressLabel.textContent =
    "Billing address is same as Shipping Address";
  billingAddressLabel.setAttribute("for", "billingAddressCheckbox");

  billingAddressCheckboxContainer.appendChild(billingAddressCheckbox);
  billingAddressCheckboxContainer.appendChild(billingAddressLabel);
  paymentContRight.appendChild(billingAddressCheckboxContainer);

  // Add Proceed with Payment Button
  const proceedPaymentButton = document.createElement("button");
  proceedPaymentButton.textContent = "Proceed with Payment";
  proceedPaymentButton.classList.add("proceedPaymentButton");
  paymentContRight.appendChild(proceedPaymentButton);
});

// Function to validate the Name on Card
const validateNameOnCard = (name) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return name.trim() !== "" && nameRegex.test(name);
};

// Function to validate the Card Number
const validateCardNumber = (cardNumber) => {
  const cardNumberRegex = /^\d{16}$/;
  return cardNumberRegex.test(cardNumber);
};

// Function to validate the Expiry Date
const validateExpiryDate = (expiryDate) => {
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
  if (!expiryDateRegex.test(expiryDate)) return false;

  const [month, year] = expiryDate.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of the year
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

  if (parseInt(year) < currentYear) return false;
  if (parseInt(year) === currentYear && parseInt(month) < currentMonth)
    return false;
  return true;
};

// Function to validate the CVC
const validateCVC = (cvc) => {
  const cvcRegex = /^\d{3}$/;
  return cvcRegex.test(cvc);
};

// Function to display error messages
const displayError = (inputElement, message) => {
  const errorElement = document.createElement("div");
  errorElement.classList.add("errorMessage");
  errorElement.textContent = message;
  errorElement.style.color = "red";
  errorElement.style.fontSize = "12px";
  errorElement.style.marginTop = "5px";

  // Remove existing error message if any
  const existingError =
    inputElement.parentElement.querySelector(".errorMessage");
  if (existingError) existingError.remove();

  inputElement.parentElement.appendChild(errorElement);
};

// Function to clear error messages
const clearError = (inputElement) => {
  const existingError =
    inputElement.parentElement.querySelector(".errorMessage");
  if (existingError) existingError.remove();
};

// Add event listeners for validation
nameOnCardInput.addEventListener("input", () => {
  if (!validateNameOnCard(nameOnCardInput.value)) {
    displayError(
      nameOnCardInput,
      "Please enter a valid name (letters and spaces only)."
    );
  } else {
    clearError(nameOnCardInput);
  }
});

cardInfoInput.addEventListener("input", () => {
  if (!validateCardNumber(cardInfoInput.value.replace(/\s/g, ""))) {
    displayError(cardInfoInput, "Please enter a valid 16-digit card number.");
  } else {
    clearError(cardInfoInput);
  }
});

expiryDateInput.addEventListener("input", () => {
  if (!validateExpiryDate(expiryDateInput.value)) {
    displayError(expiryDateInput, "Please enter a valid expiry date (MM/YY).");
  } else {
    clearError(expiryDateInput);
  }
});

cvcInput.addEventListener("input", () => {
  if (!validateCVC(cvcInput.value)) {
    displayError(cvcInput, "Please enter a valid 3-digit CVC.");
  } else {
    clearError(cvcInput);
  }
});

// Add event listener for the Proceed with Payment button
proceedPaymentButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission for demo purposes

  // Validate all fields
  const isNameValid = validateNameOnCard(nameOnCardInput.value);
  const isCardNumberValid = validateCardNumber(
    cardInfoInput.value.replace(/\s/g, "")
  );
  const isExpiryDateValid = validateExpiryDate(expiryDateInput.value);
  const isCVCValid = validateCVC(cvcInput.value);

  if (!isNameValid) {
    displayError(
      nameOnCardInput,
      "Please enter a valid name (letters and spaces only)."
    );
  }
  if (!isCardNumberValid) {
    displayError(cardInfoInput, "Please enter a valid 16-digit card number.");
  }
  if (!isExpiryDateValid) {
    displayError(expiryDateInput, "Please enter a valid expiry date (MM/YY).");
  }
  if (!isCVCValid) {
    displayError(cvcInput, "Please enter a valid 3-digit CVC.");
  }

  // If all fields are valid, proceed with payment
  if (isNameValid && isCardNumberValid && isExpiryDateValid && isCVCValid) {
    alert("Payment successful! Redirecting to confirmation page...");
    // Redirect or perform further actions here
  }
});
