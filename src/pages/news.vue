<template>
  <f7-page name="news">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Новости</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:arrow_left" icon-aurora="f7:arrow_left" icon-md="material:arrow_back" back></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-toolbar top tabbar scrollable>
      <f7-link v-for="(tabCaption, tabID) in tabs" :key="tabID"
        @click="goToTab(tabID)"
        :tab-link-active="selectedTab === tabID"
      >
        {{tabCaption}}
      </f7-link>
    </f7-toolbar>

    <f7-block v-if="loading" strong class="text-align-center">
      <f7-preloader></f7-preloader>
    </f7-block>
    <f7-block class="wide" v-else style="overflow-x: hidden;">
      <f7-card v-for="(newsRec, idx) in news" :key="`news-${idx}`">
        <f7-card-header valign="middle" style="display: block;">
          <p class="title">{{newsRec.title}}</p>
          <p class="date">{{newsRec.date}}</p>
        </f7-card-header>
        <f7-card-content>
          <div v-html="newsRec.short"></div>
        </f7-card-content>
        <f7-card-footer>
          <f7-link class="disabled">Понравилось: {{newsRec.numOfLikes}}</f7-link>
          <f7-link class="disabled">Ответов: {{newsRec.numOfComments}}</f7-link>
          <f7-link :href="`/news/${newsRec.id}`">Подробнее</f7-link>
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
        tabs: {},
        selectedTab: '',
        news: [],
        pages: [],
        pageSize: 0,
        numOfPages: 0,
        curPage: null,
        loading: true,
      };
    },

    mounted() {
      this.$root.$f7.params.panel.swipe = false;
      this.goToTab();
    },

    destroyed() {
      this.$root.$f7.params.panel.swipe = 'left';
    },

    methods: {
      goToTab(tabID) {
        let ajaxData = {
          'mobile-app': 1,
        };

        if (tabID) {
          this.selectedTab = tabID;
          ajaxData.tabtype = tabID;
        }

        this.loading = true;

        $.ajax({
          url: 'https://endovascular.ru/news',
          method: 'get',
          data: ajaxData,
          dataType: 'json',
          success: (data) => {
            this.tabs = data.tabs;
            this.selectedTab = data.selectedTab;
            this.news = data.news;
            this.pageSize = data.pager.pageSize;
            this.numOfPages = Math.ceil(data.pager.itemCount / this.pageSize);
            this.curPage = data.pager.curPage + 1;

            console.log(this.selectedTab);

            this.loading = false;
          },
          error: (xhr) => {
            window.onXHRError(xhr, 'https://endovascular.ru/news', ajaxData, this.$root, this.goToTab.bind(this, tabID));
          }
        });
      },

      goToPage(page) {
        this.curPage = page;

        this.loading = true;

        const ajaxData = {
          'mobile-app': 1,
          'tabtype': this.selectedTab,
          'page': page,
        };
        $.ajax({
          url: 'https://endovascular.ru/news',
          method: 'get',
          data: ajaxData,
          dataType: 'json',
          success: (data) => {
            this.tabs = data.tabs;
            this.selectedTab = data.selectedTab;
            this.news = data.news;
            this.pageSize = data.pager.pageSize;
            this.numOfPages = Math.ceil(data.pager.itemCount / this.pageSize);
            this.curPage = data.pager.curPage + 1;

            console.log(this.selectedTab);

            this.loading = false;
          },
          error: (xhr) => {
            window.onXHRError(xhr, 'https://endovascular.ru/news', ajaxData, this.$root, this.goToPage.bind(this, page));
          }
        });
      },
    },
  }
</script>
