import menu from './menu';

export const routesDictionary = new Map();

menu.forEach(item => {
  routesDictionary.set(item.path, item.breadCrumb);
});
