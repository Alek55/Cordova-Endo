import NativeStorageError from '../../cordova/node_modules/cordova-plugin-nativestorage/www/NativeStorageError';

const nativeStorageMainKey = 'cordova-app-config';

let localStorageWrapper = {
  _cachedConfig: null,

  _readConfigAsync() {
    if (this._cachedConfig === null) {
      return (new Promise((resolve, reject) => {
        window.NativeStorage.getItem(nativeStorageMainKey, resolve, reject);
      }))
        .then(configStringed => {
          this._cachedConfig = JSON.parse(configStringed);
          return this._cachedConfig;
        })
        .catch(error => {
          if (error.code === NativeStorageError.ITEM_NOT_FOUND) {
            this._cachedConfig = {};
            return this._cachedConfig;
          } else {
            console.error('Unrecoverable error with NativeStorage');
            console.error(error);
          }
        });
    } else {
      return Promise.resolve(this._cachedConfig);
    }
  },
  _writeConfigAsync(config) {
    const configStringed = JSON.stringify(config);

    return (new Promise((resolve, reject) => {
      window.NativeStorage.setItem(nativeStorageMainKey, configStringed, resolve, reject);
    }))
      .then(() => {
        this._cachedConfig = config;
        return config;
      })
      .catch(error => {
        console.error('Unrecoverable error with NativeStorage');
        console.error(error);
      });
  },

  setItemAsync(key, value) {
    //window.console.log(`Setting ${key} to ${value}`);
    return this._readConfigAsync()
      .then(config => {
        config[key] = value;
        return this._writeConfigAsync(config);
      })
      .then(config => config[key]);
  },

  getItemAsync(key, defaultValue) {
    return this._readConfigAsync()
      .then(config => {
        if (!(key in config)) {
          if (typeof defaultValue !== typeof undefined) {
            //window.console.log(`Getting ${key} is (default) ${defaultValue}`);
            config[key] = defaultValue;
            return this._writeConfigAsync(config);
          } else {
            throw new Error(`No ${key} found in NativeStorage, and no fallback value provided!`);
          }
        } else {
          //window.console.log(`Getting ${key} is ${config[key]}`);
          return config;
        }
      })
      .then(config => config[key]);
  },

  keysAsync() {
    return this._readConfigAsync()
      .then(config => Object.keys(config));
  },

  removeAsync(key) {
    return this._readConfigAsync()
      .then(config => {
        delete config[key];
        return config;
      })
      .then(config => this._writeConfigAsync(config));
  },
};

let LocalStorageWrapper = new Proxy(localStorageWrapper, {
  set(target, prop, value) {
    if (prop !== '_cachedConfig') {
      target.setItemAsync(prop, value);
    } else {
      target[prop] = value;
    }
    return true;
  }
});

window.LocalStorageWrapper = LocalStorageWrapper;
export default LocalStorageWrapper;
