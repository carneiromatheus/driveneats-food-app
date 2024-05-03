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

function toggleItemSelection(element) {
  const item = element;
  const section = item.parentElement.id;

  removeSelectedItems(section);
  selectClickedItem(item);
}
