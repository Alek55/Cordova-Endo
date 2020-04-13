<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Endovascular</f7-nav-title>
    </f7-navbar>

    <!-- Page content-->
    <f7-block strong no-hairlines style="padding-top: 0;">
      <f7-row>
        <f7-col width="50">
          <a href="/news/" style="color: #000;">
            <f7-card class="auto-height display-flex justify-content-center align-items-stretch web-card">
              <f7-card-content>
                <img height="60" style="display: block; margin: 0 auto 9px; " src="static/img/btn-icons/current-events-512.png" />
                <span style="display: block; margin: 0 auto; text-align: center;">Новости</span>
              </f7-card-content>
            </f7-card>
          </a>
        </f7-col>
        <f7-col width="50">
          <a href="/events/" style="color: #000;">
            <f7-card class="auto-height display-flex justify-content-center align-items-stretch web-card">
              <f7-card-content>
                <img height="60" style="display: block; margin: 0 auto 9px;" src="static/img/btn-icons/school-sport-day-009-512.png" />
                <span style="display: block; margin: 0 auto; text-align: center;">Мероприятия</span>
              </f7-card-content>
            </f7-card>
          </a>
        </f7-col>
      </f7-row>

      <f7-row style="margin-top: 18px;">
        <f7-col width="50">
          <a href="/messages/" style="color: #000;">
            <f7-card class="auto-height display-flex justify-content-center align-items-stretch web-card">
              <f7-card-content>
                <img height="60" style="display: block; margin: 0 auto 9px;" src="static/img/btn-icons/chatting_B-512.png" />
                <span style="display: block; margin: 0 auto; text-align: center;">Общение</span>
              </f7-card-content>
            </f7-card>
          </a>
        </f7-col>
        <f7-col width="50">
          <a href="/questions/" style="color: #000;">
            <f7-card class="auto-height display-flex justify-content-center align-items-stretch web-card">
              <f7-card-content>
                <img height="60" style="display: block; margin: 0 auto 9px;" src="static/img/btn-icons/chatting_B-512.png" />
                <span style="display: block; margin: 0 auto; text-align: center;">Задать вопрос</span>
              </f7-card-content>
            </f7-card>
          </a>
        </f7-col>
      </f7-row>

      <f7-row style="margin-top: 18px;">
        <f7-col width="50">
          <a href="/poll/" style="color: #000;">
            <f7-card class="auto-height display-flex justify-content-center align-items-stretch web-card">
              <f7-card-content>
                <img height="60" style="display: block; margin: 0 auto 9px;" src="static/img/btn-icons/chatting_B-512.png" />
                <span style="display: block; margin: 0 auto; text-align: center;">Голосование</span>
              </f7-card-content>
            </f7-card>
          </a>
        </f7-col>
      </f7-row>

      <f7-row style="margin-top: 18px;">
        <f7-col width="50">
          <a class="external" href="http://endovascular.ru/journal" style="color: #000;">
            <f7-card class="auto-height display-flex justify-content-center align-items-stretch">
              <f7-card-content>
                <img height="60" style="display: block; margin: 0 auto 9px;" src="static/img/btn-icons/Magazine-Book-Journal-512.png" />
                <span style="display: block; margin: 0 auto; text-align: center;">Журнал</span>
              </f7-card-content>
            </f7-card>
          </a>
        </f7-col>
        <f7-col width="50">
          <a class="external" href="http://endovascular.ru/page/video" style="color: #000;">
            <f7-card class="auto-height display-flex justify-content-center align-items-stretch">
              <f7-card-content>
                <img height="60" style="display: block; margin: 0 auto 9px;" src="static/img/btn-icons/video-512.png" />
                <span style="display: block; margin: 0 auto; text-align: center;">Видеоматериалы</span>
              </f7-card-content>
            </f7-card>
          </a>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title class="hairlines">TCT RUSSIA</f7-block-title>

    <f7-block no-hairlines>
      <f7-row class="align-items-stretch">
        <f7-col width="50">
          <a
            class="external system"
            :href="mobileAppsLinks['TCT RUSSIA 2019']"
            style="color: #000;"
          >
            <f7-card>
              <f7-card-content style="display: block;">
                <img style="display: block; margin: 0 auto;" src="static/img/mobile-apps-icons/tct-russia-2019-app-icon.png" />
              </f7-card-content>
            </f7-card>
          </a>
        </f7-col>
        <f7-col width="50" class="display-flex justify-content-space-between" style="flex-direction: column;">
          <a
            class="external system"
            :href="mobileAppsLinks['TCT RUSSIA 2018']"
            style="color: #000; flex-basis: 100%; margin-bottom: 9px;"
          >
            <f7-card style="height: 100%;">
              <f7-card-content style="display: block; height: 100%;">
                <div style="height: calc(100% - 2 * var(--f7-card-content-padding-vertical)); background: url('static/img/mobile-apps-icons/tct-russia-2018-app-icon.png') no-repeat center center / contain;"></div>
              </f7-card-content>
            </f7-card>
          </a>

          <a
            class="external system"
            :href="mobileAppsLinks['TCT RUSSIA 2017']"
            style="color: #000; flex-basis: 100%; margin-top: 9px;"
          >
            <f7-card id="btnTctRussia2017" style="height: 100%;">
              <f7-card-content style="display: block; height: 100%;">
                <div style="height: calc(100% - 2 * var(--f7-card-content-padding-vertical)); background: url('static/img/mobile-apps-icons/tct-russia-2017-app-icon.png') no-repeat center center / contain;"></div>
              </f7-card-content>
            </f7-card>
          </a>
        </f7-col>
      </f7-row>
    </f7-block>

    <hr />

    <f7-block>
      <f7-button raised round class="external" href="http://endovascular.ru/shop/index" style="color: #000; margin-bottom: 18px;">Продажа книг</f7-button>
      <f7-button raised round class="external" href="http://endovascular.ru/" style="color: #000; margin-bottom: 18px;">Сайт Общества</f7-button>
      <f7-button raised round href="/sponsors/" class="web-card" style="color: #000;">Спонсоры</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
  export default {
    computed: {
      mobileAppsLinks() {
        return window.mobileAppsLinks;
      },
    },

    mounted() {
      $(document).on('click', '.card[link]', function(e) {
        let $card = $(e.target).closest('.card[link]');
        let href = $card.attr('link');
        router.navigate(href);
      });

      setTimeout(this.fixHeights, 500);
      window.addEventListener('load', () => {
        setTimeout(this.fixHeights, 500);
      });
    },

    methods: {
      fixHeights() {
        let $autoHeightCards = $('.card.auto-height');
        let $autoHeightCardsContents = $autoHeightCards.find('.card-content');
        let $btnTCT2017 = $('#btnTctRussia2017');
        console.log('TCT2017 Height: ', $btnTCT2017.outerHeight());
        $autoHeightCardsContents.each(function() {
            let $autoHeightCardsContent = $(this);
            let $img = $autoHeightCardsContent.find('> img');
            let $span = $autoHeightCardsContent.find('> span');

            console.log('<span> Height: ', $span.height());
            console.log('<img> margin-bottom: ', $img.css('margin-bottom'));
            $img.css('height', (
              $btnTCT2017.outerHeight() - $span.height()
              - parseInt($img.css('margin-bottom'))
              - parseInt($autoHeightCardsContent.css('padding-top'))
              - parseInt($autoHeightCardsContent.css('padding-bottom'))
            ) + 'px');
        });
        window.dispatchEvent(new Event('autoHeightCalculated')); // hide splashscreen
      },
    }
  }
</script>

<style lang="scss">
  .page[data-name="home"] {
    .card {
      margin: 0;
    }
  }
</style>
