import template from './template.hbs';

export default class View{
  render() {
    return template({name: 'world'});
  }
}
