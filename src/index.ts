import { initRouter, Route } from './core/Router';
import diff from './core/Diff';
import Main from './pages/Main';
import Component from '@/core/Component';
import './scss/index.scss';
import Sub from './pages/Sub';

declare global {
  interface Window {
    virtualDOM: HTMLElement;
  }
}

const routes: Route[] = [
  { path: '/', page: Main as typeof Component },
  { path: '/sub', page: Sub as typeof Component },
];

const $app = document.querySelector('#app');
export const updateRealDOM = () => {
  window.requestAnimationFrame(() => {
    if ($app) diff(document.body, $app, window.virtualDOM);
  });
};

if ($app) {
  window.virtualDOM = document.createElement('div');
  window.virtualDOM.id = 'app';
  initRouter({ $app: window.virtualDOM, routes });
}

window.addEventListener('forceRender', () => {
  updateRealDOM();
});
