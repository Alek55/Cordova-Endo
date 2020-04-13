<template>
  <f7-page name="event">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Мероприятие</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:arrow_left" icon-aurora="f7:arrow_left" icon-md="material:arrow_back" back></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block v-if="loading" strong class="text-align-center">
      <f7-preloader></f7-preloader>
    </f7-block>
    <f7-block v-else style="hyphens: auto; -webkit-hyphens: auto; overflow-wrap: break-word;">
      <h1>{{event.title}}</h1>
      <p class="date">{{event.date_start}} – {{event.date_end}}</p>
      <div class="event" v-html="event.full_description"></div>
      <f7-block class="display-flex justify-content-space-between no-padding-horizontal">
        <div></div>
        <f7-link class="display-block external" :href="event.link">Перейти на сайт</f7-link>
      </f7-block>
    </f7-block>
  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
        event: null,
        loading: true,
      };
    },

    mounted() {
      this.load();
    },

    methods: {
      load() {
        const ajaxData = {
          'mobile-app': 1,
        };
        $.ajax({
          url: `https://endovascular.ru/event/${this.$f7route.params.eventID}`,
          method: 'get',
          data: ajaxData,
          dataType: 'json',
          success: (data) => {
            this.event = data;

            this.loading = false;

            this.$nextTick(() => {
              $('.event').find('a[href^="http://"], a[href^="https://"]').addClass('external').removeAttr('target');
            });
          },
          error: (xhr) => {
            window.onXHRError(xhr, `https://endovascular.ru/event/${this.$f7route.params.eventID}`, ajaxData, this.$root, this.load.bind(this));
          },
        });
      },
    },
  }
</script>
