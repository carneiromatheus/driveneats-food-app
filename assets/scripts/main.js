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
