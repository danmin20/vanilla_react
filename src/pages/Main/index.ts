import Component from '../../core/Component';
import './style';

export default class MainPage extends Component {
  constructor() {
    super({});

    this.init();
  }

  render(): string {
    return `
      <div class="main-page">
        main page
      </div>
      `;
  }
}
