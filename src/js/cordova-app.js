var cordovaApp = {
  f7: null,
  exitAppModalShown: false,
  /*
  This method hides splashscreen once ready
  */
  handleSplashscreen: function() {
    var f7 = cordovaApp.f7;
    if (!window.navigator.splashscreen || f7.device.electron) return;
    const autoHeightCalcEventListener = () => {
      setTimeout(window.navigator.splashscreen.hide, 1000);
      window.removeEventListener('autoHeightCalculated', autoHeightCalcEventListener);
    };
    window.addEventListener('autoHeightCalculated', autoHeightCalcEventListener);
  },
  /*
  This method prevents back button tap to exit from app on android.
  And asks a confirmation to exit app, or return to a previous page inside the app.
  */
  handleAndroidBackButton: function () {
    var f7 = cordovaApp.f7;
    if (f7.device.electron) return;

    document.addEventListener('backbutton', function (e) {
      if (f7.views.main.router.history.length === 1) {
        if (window.navigator.app && window.navigator.app.exitApp) {
          if (!cordovaApp.exitAppModalShown) {
            f7.dialog.confirm(
              'Выйти из приложения?',
              'Выход',
              () => window.navigator.app.exitApp(),
              () => cordovaApp.exitAppModalShown = false
            );
            cordovaApp.exitAppModalShown = true;
          }
        }
      } else {
        f7.views.main.router.back();
      }

      e.preventDefault();
      return false;
    }, false);
  },
  /*
  This method does the following:
    - provides cross-platform view "shrinking" on keyboard open/close
    - hides keyboard accessory bar for all inputs except where it required
  */
  handleKeyboard: function () {
    var f7 = cordovaApp.f7;
    if (!window.Keyboard || !window.Keyboard.shrinkView || f7.device.electron) return;
    var $ = f7.$;
    window.Keyboard.shrinkView(false);
    window.Keyboard.disableScrollingInShrinkView(true);
    window.Keyboard.hideFormAccessoryBar(true);
    window.addEventListener('keyboardWillShow', () => {
      f7.input.scrollIntoView(document.activeElement, 0, true, true);
    });
    window.addEventListener('keyboardDidShow', () => {
      f7.input.scrollIntoView(document.activeElement, 0, true, true);
    });
    window.addEventListener('keyboardDidHide', () => {
      if (document.activeElement && $(document.activeElement).parents('.messagebar').length) {
        return;
      }
      window.Keyboard.hideFormAccessoryBar(false);
    });
    window.addEventListener('keyboardHeightWillChange', (event) => {
      var keyboardHeight = event.keyboardHeight;
      if (keyboardHeight > 0) {
        // Keyboard is going to be opened
        document.body.style.height = `calc(100% - ${keyboardHeight}px)`;
        $('html').addClass('device-with-keyboard');
      } else {
        // Keyboard is going to be closed
        document.body.style.height = '';
        $('html').removeClass('device-with-keyboard');
      }

    });
    $(document).on('touchstart', 'input, textarea, select', function (e) {
      var nodeName = e.target.nodeName.toLowerCase();
      var type = e.target.type;
      var showForTypes = ['datetime-local', 'time', 'date', 'datetime'];
      if (nodeName === 'select' || showForTypes.indexOf(type) >= 0) {
        window.Keyboard.hideFormAccessoryBar(false);
      } else {
        window.Keyboard.hideFormAccessoryBar(true);
      }
    }, true);
  },
  init: function (f7) {
    // Save f7 instance
    cordovaApp.f7 = f7;

    // Handle Android back button
    cordovaApp.handleAndroidBackButton();

    // Handle Statusbar
    cordovaApp.handleSplashscreen();

    // Handle Keyboard
    cordovaApp.handleKeyboard();
  },
};
export default cordovaApp;
