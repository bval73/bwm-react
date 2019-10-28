//import camelCase from 'camel-case';

let instance = null; //singleton

export class Cacher {
  
  cache = {};

  constructor() {
    if(!instance) {
      instance = this;
    }

    return instance;
  }

  isValueCached(key) {
    return this.getCachedValue(key);
  }

  cacheValue(key, value) {
    this.cache[key] = value;
  }

  getCachedValue(key) {
    return this.cache[key];
  }

}
