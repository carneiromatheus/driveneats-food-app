function selectClickedItem(item) {
  item.classList.add("selected");
}

function removeSelectedItems(elements) {
  elements.forEach((element) => element.classList.remove("selected"));
}

function getAllElementsSection(section) {
  const nodeList = document.querySelectorAll(`#${section} > .item`);
  return nodeList;
}

function toggleItemSelection(element) {
  const item = element;
  const section = item.parentElement.id;
  const elementsNodeList = getAllElementsSection(section);

  removeSelectedItems(elementsNodeList);
  selectClickedItem(item);
}
