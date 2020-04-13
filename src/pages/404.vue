<template>
  <f7-page>
    <f7-navbar title="Ошибка 404" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>Ошибка</p>
      <p>Страница не найдена.</p>
    </f7-block>
    <f7-block strong>
      <ul>
        <li><b>Url:</b> {{$f7route.url}}</li>
        <li><b>Path:</b> {{$f7route.path}}</li>
        <li><b>Hash:</b> {{$f7route.hash}}</li>
        <li><b>Params:</b>
          <ul>
            <li v-for="(value, key) in $f7route.params" :key="key"><b>{{key}}:</b> {{value}}</li>
          </ul>
        </li>
        <li><b>Query:</b>
          <ul>
            <li v-for="(value, key) in $f7route.query" :key="key"><b>{{key}}:</b> {{value}}</li>
          </ul>
        </li>
        <li><b>Route:</b> {{$f7route.route.path}}</li>
      </ul>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {};
</script>