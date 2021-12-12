import { updateRealDOM } from '../index';
import Component from '@/core/Component';
import { customEventEmitter } from '@/utils/helpers';

export type Route = {
  path: string;
  page: typeof Component;
  redirect?: string;
};

class Router {
  $app: HTMLElement;
  routes: {
    [key: string]: typeof Component;
  } = {};
  fallback: string = '/';

  constructor({
    $app,
    routes,
    fallback = '/',
  }: {
    $app: HTMLElement;
    routes: Route[];
    fallback?: string;
  }) {
    this.$app = $app;
    this.fallback = fallback;

    this.generateRoutes(routes);

    this.initEvent();
  }

  generateRoutes(routes: Route[]): void {
    this.routes = {};

    routes.forEach((route: Route) => {
      this.routes[route.path] = route.page;
    });
  }

  initEvent() {
    document.addEventListener(
      'moveroutes',
      this.moveroutesHandler.bind(this) as EventListener,
    );
    window.addEventListener(
      'popstate',
      this.popstateHandler.bind(this) as EventListener,
    );
  }

  hasRoute(path: string) {
    return typeof this.routes[path] !== 'undefined';
  }

  getNotFoundRouter() {
    return this.routes['not_found'];
  }

  getRouter(path: string) {
    return this.routes[path];
  }

  moveroutesHandler(event: CustomEvent) {
    const path: string = event.detail.path;
    history.pushState(event.detail, '', path);

    this.renderComponent(path);
  }

  popstateHandler() {
    this.renderComponent(history.state.path);
  }

  renderComponent(path: string) {
    let route = this.getNotFoundRouter();
    const regex = /\w{1,}$/;

    if (this.hasRoute(path)) {
      route = this.getRouter(path);
    } else if (regex.test(path)) {
      route = this.getRouter(path.replace(regex, ':id'));
    } else {
      route = this.getRouter(this.fallback);
    }

    const page = new route({});
    if (this.$app.lastElementChild)
      this.$app.replaceChild(page.$dom, this.$app.lastElementChild);
    else this.$app.appendChild(page.$dom);
    updateRealDOM();
  }

  push(path: string) {
    customEventEmitter('moveroutes', {
      ...history.state,
      path,
    });
  }
}

export let $router: {
  push: (path: string) => void;
};

export function initRouter({
  $app,
  routes,
}: {
  $app: HTMLElement;
  routes: Route[];
}): void {
  const router = new Router({ $app, routes });

  $router = {
    push: path => router.push(path),
  };

  customEventEmitter(
    'moveroutes',
    history.state ?? {
      path: '/',
    },
  );
}
