function select(element) {
  element.classList.add("selected");
}

function getSelected(id) {
  const elements = document.querySelector(`#${id} > .item.selected`);

  return elements;
}

function getAllSelected() {
  const elements = document.querySelectorAll(".selected");

  return elements;
}

function deselect(id) {
  const element = getSelected(id);

  element?.classList.remove("selected");
}

function enableCheckoutBtn() {
  const button = document.getElementById("checkout-btn");

  button.removeAttribute("disabled");
  button.innerHTML = "Fechar pedido";
}

function checkSelected() {
  const selected = getAllSelected();
  const selectedQuantity = selected.length;

  selectedQuantity === 3 && enableCheckoutBtn();
}

function toggleSelection(element) {
  const item = element;
  const parentID = item.parentElement.id;

  deselect(parentID);
  select(item);
  checkSelected();
}

function formatToNumber(string) {
  const numericValue = parseFloat(string.replace("R$ ", "").replace(",", "."));
  return numericValue;
}

function formatToString(num) {
  const formattedValue = "R$ " + num.toFixed(2).replace(".", ",");
  return formattedValue;
}

function sumPrices(...prices) {
  const total = prices.reduce((acc, price) => acc + formatToNumber(price), 0);
  return formatToString(total);
}

function getSelectedItemInfo(category) {
  const item = getSelected(category);
  const name = item.getElementsByClassName("name")[0].innerText;
  const price = item.getElementsByClassName("price")[0].innerText;
  return { name, price };
}

function getCustomerInfo() {
  const customerName = prompt("Por favor, digite seu nome: ");
  const customerAddress = prompt("Agora, por favor, digite seu endereço: ");
  return { name: customerName, address: customerAddress };
}

function sendMessageToWpp(message) {
  const number = "31993866415";
  const text = encodeURIComponent(message);
  const link = `https://wa.me//55${number}?text=${text}`;

  window.open(link);
}

function orderCheckout() {
  const dish = getSelectedItemInfo("dishes");
  const drink = getSelectedItemInfo("drinks");
  const dessert = getSelectedItemInfo("desserts");
  const total = sumPrices(dish.price, drink.price, dessert.price);
  const customerInfo = getCustomerInfo();
  const orderMessage = `
    Olá, gostaria de fazer o pedido:
  
    - Prato: ${dish.name},
    - Bebida: ${drink.name},
    - Sobremesa: ${dessert.name}
    
    Total: ${total}
    
    Nome: ${customerInfo.name}
    Endereço: ${customerInfo.address}
  `;

  sendMessageToWpp(orderMessage);
}
