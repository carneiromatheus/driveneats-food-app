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

let summaryOrder = {
  dish: "Prato",
  drink: "Bebida",
  dessert: "Sobremesa",
  total: "total",
};

function sendMessageToWpp(args = summaryOrder) {
  const { dish, drink, dessert, total } = summaryOrder;
  const customerInfo = getCustomerInfo();
  const message = `
  Olá, gostaria de fazer o pedido:
  
  - Prato: ${dish},
  - Bebida: ${drink},
  - Sobremesa: ${dessert}
  
  Total: ${total}
  
  Nome: ${customerInfo.name}
  Endereço: ${customerInfo.address}
  `;
  const number = "31993866415";
  const text = encodeURIComponent(message);
  const link = `https://wa.me//55${number}?text=${text}`;
  const modal = document.getElementById("modal-container");

  modal.innerHTML = `
  <div id="modal">
    <h3 id="modal-title">
    🗸<br>Obrigado!
    </h3>
  </div>
  `;
  window.open(link);
}

function closeModal() {
  const modal = document.getElementById("modal-container");
  modal.remove();
}

function openModal(cart) {
  const { dish, drink, dessert } = cart;
  const total = sumPrices(dish.price, drink.price, dessert.price);
  summaryOrder = {
    dish: dish.name,
    drink: drink.name,
    dessert: dessert.name,
    total,
  };
  const modal = document.createElement("aside");
  const modeloModal = `
  <div id="modal">
    <h3 id="modal-title">Confirme seu pedido</h3>
    <table>
      <tbody>
        <tr>
          <td>${dish.name}</td>
          <td class="cell-price">${dish.price}</td>
        </tr>
        <tr>
          <td>${drink.name}</td>
          <td class="cell-price">${drink.price}</td>
        </tr>
        <tr>
          <td>${dessert.name}</td>
          <td class="cell-price">${dessert.price}</td>
        </tr>
        <tr>
          <th>Total</th>
          <th class="cell-price">${total}</th>
        </tr>
      </tbody>
    </table>
    <button class="modal-btn order-btn" type="button" onclick="sendMessageToWpp()">Tudo certo, pode pedir!</button>
    <button class="modal-btn cancel-btn" type="button" onclick="closeModal()">Cancelar</button>
  </div>
`;

  modal.id = "modal-container";
  modal.innerHTML = modeloModal;
  document.body.prepend(modal);
}

function orderCheckout() {
  const dish = getSelectedItemInfo("dishes");
  const drink = getSelectedItemInfo("drinks");
  const dessert = getSelectedItemInfo("desserts");
  const cart = { dish, drink, dessert };

  openModal(cart);
}
