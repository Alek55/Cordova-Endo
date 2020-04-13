<template>
  <f7-page name="events">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Мероприятия</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:arrow_left" icon-aurora="f7:arrow_left" icon-md="material:arrow_back" back></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block v-if="loading" strong class="text-align-center">
      <f7-preloader></f7-preloader>
    </f7-block>
    <f7-block class="wide" v-else style="overflow-x: hidden;">
      <f7-card v-for="(event, idx) in events" :key="`event-${idx}`">
        <f7-card-header valign="middle" style="display: block;">
          <p :class="{
            title: true,
            'event-title': true,
            'event-is-alien': event.is_alien,
            'event-is-cancelled': event.is_cancelled,
          }">{{event.title}}</p>
          <p class="date">{{event.date_start}} – {{event.date_end}}</p>
        </f7-card-header>
        <f7-card-content>
          <div v-html="event.description"></div>
        </f7-card-content>
        <f7-card-footer>
          <div></div>
          <f7-link :href="`/events/${event.id}`">Подробнее</f7-link>
        </f7-card-footer>
      </f7-card>
    </f7-block>

    <f7-toolbar bottom tabbar scrollable v-if="numOfPages">
      <f7-link v-for="page in numOfPages" :key="page"
        @click="goToPage(page)"
        :tab-link-active="curPage === page"
      >
        {{page}}
      </f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
        events: [],
        pages: [],
        pageSize: 0,
        numOfPages: 0,
        curPage: null,
        loading: true,
      };
    },

    mounted() {
      this.load();
    },

    methods: {
      load() {
        this.loading = true;

        const ajaxData = {
          'mobile-app': 1,
        };
        $.ajax({
          url: 'https://endovascular.ru/events',
          method: 'get',
          data: ajaxData,
          dataType: 'json',
          success: (data) => {
            this.tabs = data.tabs;
            this.selectedTab = data.selectedTab;
            this.events = data.events;
            this.pageSize = data.pager.pageSize;
            this.numOfPages = Math.ceil(data.pager.itemCount / this.pageSize);
            this.curPage = data.pager.curPage + 1;

            console.log(this.selectedTab);

            this.loading = false;
          },
          error: (xhr) => {
            window.onXHRError(xhr, 'https://endovascular.ru/events', ajaxData, this.$root, this.load.bind(this));
          },
        });
      },

      goToPage(page) {
        this.curPage = page;

        this.loading = true;

        const ajaxData = {
          'mobile-app': 1,
          'page': page,
        };
        $.ajax({
          url: 'https://endovascular.ru/events',
          method: 'get',
          data: ajaxData,
          dataType: 'json',
          success: (data) => {
            this.tabs = data.tabs;
            this.selectedTab = data.selectedTab;
            this.events = data.events;
            this.pageSize = data.pager.pageSize;
            this.numOfPages = Math.ceil(data.pager.itemCount / this.pageSize);
            this.curPage = data.pager.curPage + 1;

            console.log(this.selectedTab);

            this.loading = false;
          },
          error: (xhr) => {
            window.onXHRError(xhr, 'https://endovascular.ru/events', ajaxData, this.$root, this.goToPage.bind(this, page));
          },
        });
      },
    },
  }
</script>
