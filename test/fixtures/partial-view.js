import outer from './outer-template.hbs';

export default class View {
  render() {
    return outer({name: 'world'});
  }
}
