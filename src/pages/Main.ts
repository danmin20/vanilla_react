import Header from '@/components/Header';
import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/JSX';

export default class Main extends Component<PropsType, StateType> {
  $header: Element;

  constructor(props: PropsType) {
    super(props);

    this.$header = new Header({}).$dom;

    this.setDom();
  }

  render() {
    return jsx`
      <div class='main-page'>
        ${this.$header}
        MainPage
      </div>
    `;
  }
}
