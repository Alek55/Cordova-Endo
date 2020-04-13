<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Отчёт об ошибке</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:arrow_left" icon-aurora="f7:arrow_left" icon-md="material:arrow_back" back></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <p>
        <b>Дата и время:</b> <br >
        {{reportDate.toString()}}
      </p>
    </f7-block>
    <f7-block>
      <p><b>Request URL:</b> {{report.requestedURL}}</p>
      <p><b>Request Data:</b> {{report.requestedData}}</p>
      <p>
        <b>Response Headers:</b> <br />
        <template v-for="header in report.httpResponseHeaders.split('\r\n')">
          {{header}}
          <br />
        </template>
      </p>
    </f7-block>
    <f7-block>
      <p>Response Body:</p>
      <pre style="white-space: pre-wrap; word-wrap: break-word;">{{report.httpResponseBody}}</pre>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        report: this.$f7route.context.report,
        reportDate: this.$f7route.context.reportDate,
      }
    }
  }
</script>
