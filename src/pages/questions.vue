<template>
  <f7-page name="questions">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Задать вопрос</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:arrow_left" icon-aurora="f7:arrow_left" icon-md="material:arrow_back" back></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block>
      <f7-list no-hairlines-md>
        <f7-list-input
                :label="`Имя *`"
                type="text"
                :placeholder="`Ваше имя`"
                clear-button
                required
                :value="fromName"
                @input="fromName = $event.target.value"
                :disabled="isSubmitting"
        ></f7-list-input>

        <f7-list-input
                :label="`E-mail`"
                type="email"
                :placeholder="`Ваш e-mail`"
                clear-button
                :value="fromEmail"
                @input="fromEmail = $event.target.value"
                :disabled="isSubmitting"
        ></f7-list-input>

        <f7-list-input
                :label="`Вопрос *`"
                type="textarea"
                :placeholder="`Напишите здесь вопрос`"
                required
                resizable
                :value="question"
                @input="question = $event.target.value"
                :disabled="isSubmitting"
        ></f7-list-input>
      </f7-list>

      <div class="display-flex justify-content-center" style="margin-top: 20px;">
        <f7-button
                v-if="!isSubmitting"
                raised
                @click.native="submit"
        >
          Отправить
        </f7-button>
        <f7-preloader v-else></f7-preloader>
      </div>
    </f7-block>
  </f7-page>
</template>

<script>
  import LocalStorageWrapper from '../js/LocalStorageWrapper';
  import AjaxWrapper from '../js/AjaxWrapper';
  import CordovaApp from '../js/cordova-app';

  export default {
    data() {
      return {
        fromName: '',
        fromEmail: '',
        question: '',
        isSubmitting: false,
        loading: true,
      };
    },

    mounted() {
      const defaultContacts = {
        fromName: '',
        fromEmail: '',
      };
      LocalStorageWrapper.getItemAsync('contacts', JSON.stringify(defaultContacts)).then(contacts => {
        try {
          contacts = JSON.parse(contacts);
        } catch (e) {
          window.console.warn('Stored contacts are corrupted!');
          LocalStorageWrapper.removeAsync('contacts');
          contacts = Object.assign({}, defaultContacts);
        }

        this.fromName = contacts.fromName;
        this.fromEmail = contacts.fromEmail;
      });
    },

    methods: {
      submit() {
        this.isSubmitting = true;

        AjaxWrapper({
          url: 'https://new.endovascular.ru/mobile-app/question',
          //crossDomain: true,
          dataType: 'json',
          timeout: 5000,
          method: 'post',
          data: {
            fromName: this.fromName,
            fromEmail: this.fromEmail,
            question: this.question,
          },
          success: data => {
            console.log(data)
            CordovaApp.f7.notification.create({
              title: 'Вопрос получен',
              text: 'Спасибо!',
              closeTimeout: 5000,
              closeButton: true,
            }).open();

            LocalStorageWrapper.setItemAsync('contacts', JSON.stringify({
              fromName: this.fromName,
              fromEmail: this.fromEmail,
            }));
          },
          error: (xhr, status) => {
            console.log(xhr);
            console.log(status);
            if (status === 'timeout') {
              CordovaApp.f7.dialog.alert('Ошибка связи. Пожалуйста, попробуйте ещё раз.');
            } else {
              let decodedErrors;
              try {
                decodedErrors = JSON.parse(xhr.responseText);
                let errorMsg = 'Ошибки в полях:' + ' <br />\n<br />\n';
                const errorFields = [];
                for (let errObj of decodedErrors) {
                  for (let fieldCode in errObj) {
                    let errorField = '';
                    if (fieldCode === 'fromName') {
                      errorField = '<b>' + 'Ваше ФИО' + '</b>: ';
                    }
                    if (fieldCode === 'fromEmail') {
                      errorField = '<b>' + 'Ваш e-mail' + '</b>: ';
                    }
                    if (fieldCode === 'question') {
                      errorField = '<b>' + 'Вопрос' + '</b>: ';
                    }

                    errorField += errObj[fieldCode];
                    errorFields.push(errorField);
                  }
                }

                errorMsg += errorFields.join(' <br />\n');

                CordovaApp.f7.dialog.alert(errorMsg);
              } catch(e) {
                CordovaApp.f7.dialog.alert('Неполадки на сервере. Пожалуйста, попробуйте ещё раз.');
              }
            }
          },
          complete: () => {
            this.isSubmitting = false;
          },
        });
      },
    },
  }
</script>
