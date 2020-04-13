// Workaround for cordova-plugin-wkwebview-file-xhr plugin by Oracle
// (and that plugin is a workaround for iOS WKWebView CORS bug)

export default function(jqOptions) {
  const method = jqOptions.method || jqOptions.type || 'GET';
  if (
    (method.toUpperCase() === 'GET')
    && !$.isEmptyObject(jqOptions.data)
    && !jqOptions.crossOrigin
  ) {
    jqOptions.url += '?';

    // iOS bug: we cannot safely use $.param() because it relies on buggy encodeURIComponent().
    // Rather we have to implement our own (facilitated) serializer of GET params.
    let serializedParams = [];
    for (const key in jqOptions.data) {
      const data = jqOptions.data[key];
      if ($.isArray(data)) {
        for (const val of data) {
          serializedParams.push(`${key}[]=${val}`);
        }
      } else {
        serializedParams.push(`${key}=${data}`);
      }
    }
    jqOptions.url += serializedParams.join('&');

    // Dump data in order to not confuse buggy Oracle XHR plugin
    delete jqOptions.data;
  }

  return $.ajax(jqOptions);
}
