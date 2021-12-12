import Header from '@/components/Header';
import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/JSX';

export default class Sub extends Component<PropsType, StateType> {
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
        SubPage

        <div class='info'>
          경희대학교 컴퓨터공학과
        <div>
        <div class='name'>
          2018102220 이정민
        <div>
      </div>
    `;
  }
}
