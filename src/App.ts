import { $ } from './utils/selector';
import Component from './core/Component';
import { Route, Router } from './core/Router';
// import "./styles/index.scss";
// import "./styles/theme.scss";
import Main from './pages/Main/index';

export default class App extends Component {
  $app: HTMLElement;

  constructor() {
    super({});
    this.$app = this.getRootApp();
    this.init();
  }

  getRootApp(): HTMLElement {
    const $app = document.getElementById('app');

    if (!$app) {
      console.error(`html doesn't have #app element`);
    }

    return $app ?? document.createElement('error');
  }

  componentDidMount() {
    this.setEvents();
    this.$app.append(this.$element);
    this.setRouter();
  }

  setEvents() {
    this.$element.addEventListener('click', (e: Event) => {
      const aTarget = (e.target as HTMLElement).closest('.route-btn');
      if (!aTarget) return;

      window.history.pushState({}, '', '2');
    });
  }

  setRouter() {
    const $content = $('.content', this.$element);

    if ($content) {
      const route: Route = {
        '/': new Main(),
      };
      new Router(route, $content);
    }
  }

  render(): string {
    return `<div class="app-body">
      <div class='content'></div>
    </div>`;
  }
}
