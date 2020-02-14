import { autoComView } from "./autocom-view";

export default class AutoCom {
  constructor(config) {
    const {
      selector = '#autocom-field',
      data = {},
      characters = 2,
      clearButton = false,
    } = config;

    this.selector = selector;
    this.data = data;
    this.characters = characters;
    this.clearButton = clearButton;
    this.arrayMatches = [];
    this.input = autoComView.getInput(this.selector);
    this.list = autoComView.createList(this.input);

    this.init()
  }

  searchMatches(string) {
    this.arrayMatches = [];

    // for (let key in this.data) {
    //   if (this.data[key].toLowerCase().indexOf(string.toLowerCase()) >= 0) {
    //     this.arrayMatches.push({value: key, content: this.data[key]});
    //   }
    // }

    this.data.forEach(item => {
      if (item.name.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
        this.arrayMatches.push({value: item.city_id, content: item.name});
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
