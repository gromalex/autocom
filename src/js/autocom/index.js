import {autoComView} from './autocom-view';

export default class AutoCom {
  constructor(config) {
    const {
      selector = '#autocom-field',
      data = {},
      characters = 2,
      clearButton = false,
      propertySearch,
      propertyValue
    } = config;

    this.selector = selector;
    this.data = data;
    this.propertySearch = propertySearch;
    this.propertyValue = propertyValue;
    this.characters = characters;
    this.clearButton = clearButton;
    this.arrayMatches = [];
    this.input = autoComView.getInput(this.selector);
    this.list = autoComView.createList(this.input);

    this.init()
  }

  searchMatches(query) {
    this.arrayMatches = [];
    const pattern = new RegExp(`${query}`, 'gi');

    this.data.forEach(item => {
      if (item[this.propertySearch].search(pattern) === 0) {
        this.arrayMatches.push({value: item[this.propertyValue], content: item[this.propertySearch]});
      }
    })
  }

  handleInput(event) {
    const value = event.target.value;

    if (value.length < this.characters) {
      autoComView.clearList(this.list);
      return;
    }

    this.searchMatches(value);
    autoComView.addListItemToList(this.arrayMatches, this.list);
    autoComView.navigation(this.input, this.list);
  }

  init() {
    autoComView.createMain(this.input, this.list, this.clearButton);
    this.input.addEventListener('input', this.handleInput.bind(this));
  }
}
