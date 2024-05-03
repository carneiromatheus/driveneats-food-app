function selectClickedItem(item) {
  item.classList.add("selected");
}

function getAllElements(prop) {
  const nodeList = document.querySelectorAll(prop);
  return nodeList;
}

function removeSelectedItems(section) {
  const elements = getAllElements(`#${section} > .item`);
  elements.forEach((element) => element.classList.remove("selected"));
}

function checksQuantitySelectedItems() {
  const elements = getAllElements(".selected");
  const quantitySelectedItems = elements.length;
  return quantitySelectedItems;
}

function enableCloseOrderBtn(buttonProp) {
  const button = document.querySelector(buttonProp);
  button.removeAttribute("disabled");
}

function updateTextButton(quantitySelectedItems) {
  switch (quantitySelectedItems) {
    case 1:
      return `Selecione os outros 2 itens para fechar o pedido`;
    case 2:
      return `Selecione o item restante para fechar o pedido`;
    case 3:
      enableCloseOrderBtn("#order-btn");
      return "Fechar pedido";
  }
}

function toggleText(elementProp, text) {
  const element = document.querySelector(elementProp);

  element.innerText = text;
}

function pageUpdate() {
  const quantitySelectedItems = checksQuantitySelectedItems();
  const newTextButton = updateTextButton(quantitySelectedItems);

  toggleText("#order-btn", newTextButton);
}

function toggleItemSelection(element) {
  const item = element;
  const section = item.parentElement.id;

  removeSelectedItems(section);
  selectClickedItem(item);
  pageUpdate();
}
