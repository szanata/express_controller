const run = require('run');

function addRoute(method, url, cb) {
  var handler;
  if (cb.constructor.name === 'GeneratorFunction') {
    handler = function handler() {
      run( cb.bind( null, ...arguments ) ).catch(e => {
        arguments[arguments.length - 1](e);
      });
    }
  } else {
    handler = cb;
  }
  this._router[method](`${this.prefix}${url}`, this.filters, handler);
}

module.exports = class Controller {

  constructor(routePrefix) {
    this._router = require('express').Router({ strict: true });
    this.prefix = routePrefix ? routePrefix.replace(/\/$/, '') : '';
    this.filters = [];
  }

  restrict(filter) {
    this.filters.push(filter);
  }

  get(url, cb) { addRoute.call(this, 'get', url, cb); }
  post(url, cb) { addRoute.call(this, 'post', url, cb); }
  put(url, cb) { addRoute.call(this, 'put', url, cb); }
  delete(url, cb) { addRoute.call(this, 'delete', url, cb); }

  get routes() {
    return this._router;
  }
}
