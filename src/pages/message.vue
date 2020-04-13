<template>
  <f7-page name="news-single">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Сообщение</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:arrow_left" icon-aurora="f7:arrow_left" icon-md="material:arrow_back" back></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block v-if="loading" strong class="text-align-center">
      <f7-preloader></f7-preloader>
    </f7-block>
    <f7-block v-else style="hyphens: auto; -webkit-hyphens: auto; overflow-wrap: break-word;">
      <h1>{{message.title}}</h1>
      <p class="date">{{message.date}}</p>
      <div class="site-message" v-html="message.full"></div>
      <f7-block class="display-flex justify-content-space-between no-padding-horizontal">
        <f7-link class="display-block disabled">Понравилось: {{message.numOfLikes}}</f7-link>
        <f7-link class="display-block disabled">Ответов: {{message.numOfComments}}</f7-link>
        <f7-link class="display-block external" :href="message.link">Перейти на сайт</f7-link>
      </f7-block>
    </f7-block>
    <template v-if="message && message.numOfComments">
      <f7-block-title>Ответы</f7-block-title>
      <f7-card v-for="comment in message.comments" :key="comment.id">
        <f7-card-header>{{comment.user.fullName}}</f7-card-header>
        <f7-card-content v-html="comment.html"></f7-card-content>
        <f7-card-footer>{{comment.date}}</f7-card-footer>
      </f7-card>
    </template>
  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
        message: null,
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
          url: `https://endovascular.ru/message/${this.$f7route.params.messageID}`,
          method: 'get',
          data: ajaxData,
          dataType: 'json',
          success: (data) => {
            this.message = data;

            this.loading = false;

            this.$nextTick(() => {
              $('.site-message').find('a[href^="http://"], a[href^="https://"]').addClass('external').removeAttr('target');
            });
          },
          error: (xhr) => {
            window.onXHRError(xhr, `https://endovascular.ru/message/${this.$f7route.params.messageID}`, ajaxData, this.$root, this.load.bind(this));
          },
        });
      },
    },
  }
</script>
