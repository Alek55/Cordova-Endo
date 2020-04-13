<template>
<f7-app :params="f7params" >
  <!-- Status bar overlay for fullscreen mode-->
  <f7-statusbar></f7-statusbar>

  <!-- Left panel with cover effect-->
  <f7-panel left cover>
    <f7-view>
      <f7-page>
        <img src="static/img/endo_logo_rus.svg" style="display: block; margin: 18px auto; max-height: 20vh;" />
        <f7-list>
          <f7-list-item view=".view-main" title="Главная" link="/" reload-all panel-close="left"></f7-list-item>
          <f7-list-item view=".view-main" title="Новости" link="/news/" panel-close="left"></f7-list-item>
          <f7-list-item view=".view-main" title="Мероприятия" link="/events/" panel-close="left"></f7-list-item>
          <f7-list-item view=".view-main" title="Общение" link="/messages/" panel-close="left"></f7-list-item>
          <f7-list-item view=".view-main" title="Задать вопрос" link="/questions/" panel-close="left"></f7-list-item>
          <f7-list-item view=".view-main" title="Голосование" link="/poll/" panel-close="left"></f7-list-item>
          <f7-list-item title="Журнал" external no-chevron link="http://endovascular.ru/journal" panel-close="left"></f7-list-item>
          <f7-list-item title="Видеоматериалы" external no-chevron link="http://endovascular.ru/page/video" panel-close="left"></f7-list-item>
          <f7-list-item title="TCT RUSSIA 2019" external no-chevron class="system" :link="mobileAppsLinks['TCT RUSSIA 2019']" panel-close="left"></f7-list-item>
          <f7-list-item title="TCT RUSSIA 2018" external no-chevron class="system" :link="mobileAppsLinks['TCT RUSSIA 2018']" panel-close="left"></f7-list-item>
          <f7-list-item title="TCT RUSSIA 2017" external no-chevron class="system" :link="mobileAppsLinks['TCT RUSSIA 2017']" panel-close="left"></f7-list-item>
          <f7-list-item title="Продажа книг" external no-chevron link="http://endovascular.ru/shop/index" panel-close="left"></f7-list-item>
          <f7-list-item title="Сайт Общества" external no-chevron link="http://endovascular.ru/" panel-close="left"></f7-list-item>
          <f7-list-item view=".view-main" title="Спонсоры" link="/sponsors/" panel-close="left"></f7-list-item>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Right panel with reveal effect-->
  <f7-panel right reveal theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="Демо"></f7-navbar>
        <f7-block>
          <f7-block-title>Navigation</f7-block-title>
          <f7-list>
            <f7-list-item link="/about/" view=".view-main" panel-close="right" title="About"></f7-list-item>
            <f7-list-item link="/form/" view=".view-main" panel-close="right" title="Form"></f7-list-item>
          </f7-list>

          <f7-block-title>Modals</f7-block-title>
          <f7-block strong>
            <f7-row>
              <f7-col width="50">
                <f7-button fill raised popup-open="#my-popup">Popup</f7-button>
              </f7-col>
              <f7-col width="50">
                <f7-button fill raised login-screen-open="#my-login-screen">Login Screen</f7-button>
              </f7-col>
            </f7-row>
          </f7-block>


          <f7-list>
            <f7-list-item
              title="Dynamic (Component) Route"
              link="/dynamic-route/blog/45/post/125/?foo=bar#about"
              view=".view-main"
              panel-close="right"
            ></f7-list-item>
            <f7-list-item
              title="Default Route (404)"
              link="/load-something-that-doesnt-exist/"
              view=".view-main"
              panel-close="right"
            ></f7-list-item>
            <f7-list-item
              title="Request Data & Load"
              link="/request-and-load/user/123456/"
              view=".view-main"
              panel-close="right"
            ></f7-list-item>
          </f7-list>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/" stackPages></f7-view>


  <!-- Popup -->
  <f7-popup id="my-popup">
    <f7-view>
      <f7-page>
        <f7-navbar title="Popup">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <p>Popup content goes here.</p>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-popup>

  <f7-login-screen id="my-login-screen">
    <f7-view>
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            name="username"
            placeholder="Your username"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Your password"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-list-button title="Sign In" login-screen-close @click="alertLoginData"></f7-list-button>
          <f7-block-footer>
            Some text about login information.<br>Click "Sign In" to close Login Screen
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-login-screen>
</f7-app>
</template>
<script>
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';

  export default {
    data() {
      // TCT RUSSIA mobile apps links
      window.mobileAppsLinks = {
        'TCT RUSSIA 2017': this.$device.ios ? 'https://apps.apple.com/us/app/tct-russia-2017/id1240995328' : 'https://play.google.com/store/apps/details?id=ru.vandco.tct2017',
        'TCT RUSSIA 2018': this.$device.ios ? 'https://apps.apple.com/us/app/tct-russia-2018/id1377442435' : 'https://play.google.com/store/apps/details?id=ru.vandco.tct2018',
        'TCT RUSSIA 2019': this.$device.ios ? 'https://apps.apple.com/us/app/tct-russia-2019/id1467616907' : 'https://play.google.com/store/apps/details?id=ru.vandco.tct20192',
      };

      window.onXHRError = function(xhr, url, ajaxData, $root, cbYes) {
        console.log('XHR error', xhr);
        const xhrSerialized = JSON.stringify({
          requestedURL: url,
          requestedData: JSON.stringify(ajaxData),
          readyState: xhr.readyState,
          xhrStatus: xhr.status,
          xhrStatusText: xhr.statusText,
          httpCode: xhr.statusCode(),
          httpResponseHeaders: xhr.getAllResponseHeaders(),
          httpResponseBody: xhr.responseText,
        });
        console.log('XHR serialized: ', xhrSerialized);
        const errorReportID = `xhr-error-${(new Date()).getTime()}`;
        window.localStorage[errorReportID] = xhrSerialized;

        $root.$f7.dialog.create({
          closeByBackdropClick: false,
          destroyOnClose: true,
          title: 'Ошибка связи',
          text: 'Повторить попытку?',
          buttons: [
            {
              text: 'Да',
              bold: true,
              close: true,
              onClick: cbYes,
            },
            {
              text: 'Нет',
              bold: true,
              close: true,
              onClick: () => $root.$f7.views.main.router.back(),
            },
            {
              text: 'Отчёт',
              bold: false,
              close: true,
              onClick: () => $root.$f7.views.main.router.navigate(`/error-report/${errorReportID}`, {reloadCurrent: true}),
            },
          ],
        }).open();
      };

      return {
        // Framework7 Parameters
        f7params: {
          id: 'ru.vandco.endovascular', // App bundle ID
          name: 'Endovascular', // App name
          theme: 'auto', // Automatic theme detection
          language: 'ru-RU',
          dialog: {
            buttonCancel: 'Отмена',
          },
          // App root data
          data: function () {
            return {
              user: {
                firstName: 'John',
                lastName: 'Doe',
              },

            };
          },

          // App routes
          routes: routes,



          // Input settings
          input: {
            scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
            scrollIntoViewCentered: this.$device.cordova && !this.$device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            overlay: this.$device.cordova && this.$device.ios || 'auto',
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },

          panel: {
            swipe: 'left',
          },
        },

        // Login screen data
        username: '',
        password: '',

        // TCT RUSSIA mobile apps links
        mobileAppsLinks: window.mobileAppsLinks,
      }
    },
    methods: {
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password);
      }
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (f7.device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here

        $(document).on('click', 'a.external', function(e) {
          e.preventDefault();
          e.stopPropagation();
          const $a = $(e.target).closest('a.external');
          let href = $a.attr('href');

          // find wrapper of .system class
          let $system = $a.closest('.system');
          if ($system.length) {
            window.open(href, '_system');
          } else {
            SafariViewController.isAvailable(available => {
              if (available) {
                SafariViewController.show({
                  url: href,
                  transition: 'curl', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
                  //tintColor: "#00ffff", // default is ios blue
                  //barColor: "#0000ff", // on iOS 10+ you can change the background color as well
                  //controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor
                },
                // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
                result => {
                  if (result.event === 'opened') {
                    console.log('opened');
                  } else if (result.event === 'loaded') {
                    console.log('loaded');
                  } else if (result.event === 'closed') {
                    console.log('closed');
                  }
                },
                errorMsg => {
                  console.log("KO: " + errorMsg);
                });
              } else {
                window.open(href, '_system');
              }
            });
          }

          // close panel if needed
          if ($a.hasClass('panel-close')) {
            f7.panel.close($a.data('panel'));
          }

          return false;
        });
      });
    }
  }
</script>