const classes = {
  main: 'autocom',
  list: 'options',
  listItem: 'options__item',
  listItemEmpty: 'options__item_empty',
  listItemSelected: 'options__item_selected',
  clearButton: 'autocom__clear-button'
};

const dataAttributes = {
  value: 'data-value',
  index: 'data-index'
};

const keys = {
  ENTER: 13,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
};

const getInput = selector => document.querySelector(selector);

const createMain = (input, list, clearButton) => {
  const mainNode = document.createElement('div');
  mainNode.classList.add(classes.main);
  input.after(mainNode);
  mainNode.append(input);
  if (clearButton) {
    const clearButton = createClearButton(input, list);
    mainNode.append(clearButton);
  }
  mainNode.append(list);
};

const createClearButton = (input, list) => {
  const clearButton = document.createElement('button');
  clearButton.classList.add(classes.clearButton);
  clearButton.addEventListener('click', (event) => handleClickClearButton(event, input, list));

  return clearButton;
}

const createList = (input) => {
  let listNode = document.createElement('ul');
  listNode.classList.add(classes.list);
  listNode.addEventListener('click', (event) => {
    handleClickOptions(event, input)
  });

  return listNode;
};

const createLi = (value, content, index) => {
  const liNode = document.createElement('li');
  liNode.classList.add(classes.listItem);
  liNode.setAttribute(dataAttributes.value, value);
  liNode.setAttribute(dataAttributes.index, index);
  liNode.innerText = content;

  return liNode;
};

const addListItemToList = (data, listNode) => {
  const fragment = document.createDocumentFragment();
  clearList(listNode);

  if (data.length) {
    data.forEach((item, index) => {
      const liNode = createLi(item.value, item.content, index);

      fragment.append(liNode);
    });
  } else {
    const liNode = createLi('', 'Ничего не найдено', 0);
    liNode.classList.add(classes.listItemEmpty);
    fragment.append(liNode);
  }
  listNode.append(fragment);
};

const clearList = (listNode) => listNode.innerHTML = '';

const navigation = (input, list) => {
  // Locals
  const li = list.childNodes,
    liLength = li.length - 1;
  let liSelected = undefined,
    next;
  // Remove selection class
  const removeSelection = direction => {
    liSelected.classList.remove(classes.listItemSelected);
    if (direction === 1) {
      next = liSelected.nextSibling;
    } else {
      next = liSelected.previousSibling;
    }
  };
  // Add selection class
  const highlightSelection = current => {
    liSelected = current;
    liSelected.classList.add(classes.listItemSelected);
  };
  // Keyboard action
  input.onkeydown = event => {
    if (li.length > 0) {
      switch (event.keyCode) {
        // Arrow Up
        case keys.ARROW_UP:
          if (liSelected) {
            removeSelection(0);
            if (next) {
              highlightSelection(next);
            } else {
              highlightSelection(li[liLength]);
            }
          } else {
            highlightSelection(li[liLength]);
          }
          break;
        // Arrow Down
        case keys.ARROW_DOWN:
          if (liSelected) {
            removeSelection(1);
            if (next) {
              highlightSelection(next);
            } else {
              highlightSelection(li[0]);
            }
          } else {
            highlightSelection(li[0]);
          }
          break;
        case keys.ENTER:
          if (liSelected) {
            onSelection(event, input, list, liSelected.innerText);
          }
      }
    }
  };
};

const onSelection = (event, input, list, value) => {
  input.value = value;
  list.innerHTML = '';
};

const handleClickClearButton = (event, input, list) => {
  event.preventDefault();

  input.value = '';
  input.focus();
  clearList(list);
};

const handleClickOptions = (event, input) => {
  if (event.target.classList.contains(classes.listItem)) {
    onSelection(event, input, event.currentTarget, event.target.innerText)
  }
};

export const autoComView = {
  getInput,
  createMain,
  createList,
  addListItemToList,
  clearList,
  navigation
};
