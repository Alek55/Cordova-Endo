# Endovascular

## Prerequisites
### Common:
- [Node.js & NPM](https://nodejs.org/)
- Cordova (via `npm install -g cordova`)
- Framework7 (via `npm install -g framework7-cli`)
### iOS:
- Xcode
### Android:
- Android Studio
- Gradle
- Android SDK **no newer than** ver.27 (might be newer versions are now already compatible too, but at the moment of composing this README weren't &ndash; **not tested**)

## NPM Scripts

* `npm run build-cordova-ios-prod` - build cordova iOS app for production
* `npm run build-cordova-ios-dev` - build cordova iOS app using development mode (faster build without minification and optimization)
* `npm run build-cordova-android-prod` - build cordova Android app for production
* `npm run build-cordova-android-dev` - build cordova Android app using development mode (faster build without minification and optimization)
* `npm run install-android` - installs cordova Android app build using development mode (keeping app data storage if already installed, like updating app)
* `npm run reinstall-android` - re-installs cordova Android app build using development mode (clearing app data storage if already installed, so the app will be installed from the scratch)
* `npm run reset-android` - clears cordova Android app data storage on the device, not re-pushing the .apk file onto device itself (like "Clear data" button in App Manager in Android device settings)

**No NPM scripts are for deploy to iOS.** All deploying for iOS shall be done via Xcode (run `npm run build-cordova-ios-`**`<prod|dev>`**, then open `cordova/platforms/ios/Endovascular.xcworkspace`).

## Development

There is a webpack bundler setup. It compiles and bundles all "front-end" resources. **You should work only with files located in `/src` folder.** Webpack config located in `build/webpack.config.js`.

Webpack has specific way of handling static assets (CSS files, images, audios). You can learn more about correct way of doing things on [official webpack documentation](https://webpack.js.org/guides/asset-management/).

## Cordova

Cordova project located in `cordova` folder. **You shouldn't modify content of `cordova/www` folder.** Its content will be correctly generated when you call `npm run build-cordova-`**`<...>`**.



## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 generate-assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 generate-assets --ui
```

## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)
* [Framework7 Vue Documentation](https://framework7.io/vue/)

* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on patreon:
https://patreon.com/vladimirkharlampidi