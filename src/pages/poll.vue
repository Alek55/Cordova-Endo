<template>
  <f7-page name="poll">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Голосование</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:arrow_left" icon-aurora="f7:arrow_left" icon-md="material:arrow_back" back></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block>
        <template v-if="poll && netError === false">
          <h1>{{poll.text}}</h1>
          <f7-card>
            <f7-card-content>
              <f7-list>
                <f7-list-item
                        v-for="option in poll.options"
                        :key="option.id"
                        :data-option-id="!isVoted ? option.id : null"
                        @click="onOptionClick(option)"
                >
                  <template v-if="isVoted || isSubmitting">
                    <template v-if="isVoted || isSubmitting">
                      <template v-if="option.id === myVotes[poll.id]">
                        <span style="margin-bottom: 23px;" slot="media"><f7-icon material="check_circle"></f7-icon></span>
<!--                        <f7-icon slot="media" f7="checkmark_circle_fill"></f7-icon>-->
                      </template>
                      <template v-else>
                        <f7-icon slot="media" style="visibility: hidden;" f7="circle">circle</f7-icon>
                      </template>
                    </template>
                    <template v-else>
                      <template v-if="option.id === selectedOptionID">
                        <f7-icon slot="media" f7="checkmark_circle"></f7-icon>
                      </template>
                      <template v-else>
                        <f7-icon slot="media" f7="circle"></f7-icon>
                      </template>
                    </template>
                  </template>
                  <template v-else>
                      <f7-radio slot="media" name="option-radio" :checked="option.id === selectedOptionID"></f7-radio>
                  </template>

                  <div class="vote" slot="title">
                    <div class="text">{{option.text}}</div>

                    <div class="flex" v-if="isVoted">
                      <!-- Unfortunately option.percentage (computed) does not work bound to :style, I don't know why ¯\_(ツ)_/¯ -->
                      <div class="bar-wrapper">
                        <div
                                class="bar"
                                :style="'width: ' + calcPercentage(option) + '%'"
                        ></div>
                      </div>
                      <div class="votes">
                        {{option.votes}}
                        <template v-if="poll.votes">
                          ({{calcPercentage(option)}} %)
                        </template>
                      </div>
                    </div>
                  </div>

                </f7-list-item>
              </f7-list>
            </f7-card-content>

            <f7-card-footer>
              Голосов: {{poll.votes}}
            </f7-card-footer>

          </f7-card>

          <p v-if="!isVoted">
            <template v-if="isSubmitting" class="display-flex align-items-center justify-content-center" style="height: 100%;">
              <f7-preloader></f7-preloader>
            </template>
            <template v-else>
              <f7-button raised :disabled="selectedOptionID === null" @click="onVoteClick">Проголосовать</f7-button>
            </template>
          </p>

        </template>
        <p v-else-if="netError === false">Нет опросов, в которых можно принять участие</p>
        <div v-else-if="netError === true"><p>Нет подключения к интернету</p></div>
        <div v-else>
          <f7-preloader></f7-preloader>
        </div>
    </f7-block>
  </f7-page>
</template>

<script>
  // import LocalStorageWrapper from '../js/LocalStorageWrapper';
  import AjaxWrapper from "../js/AjaxWrapper";

  export default {
    data() {
      return {
        poll: {},
        pollTimestamp: null,
        netError: null,
        myVotes: {},
        isSubmitting: false,
        appPaused: false,
        _curAjax: null,
        selectedOptionID: null,
      };
    },

    mounted() {
      document.addEventListener('pause', this.onAppPause);
      document.addEventListener('resume', this.onAppResume);

      // window.forceUpdatePoll = () => this.forceUpdatePoll();
      //
      // this.$nextTick(() => {
      //   this.onMounted();
      // });

      // LocalStorageWrapper.getItemAsync('myVotes', '{}')
      // .then(myVotes => {
      //   this.myVotes = JSON.parse(myVotes);
      //
      //   document.addEventListener('pause', this.onAppPause);
      //   document.addEventListener('resume', this.onAppResume);
      //
      //   window.forceUpdatePoll = () => this.forceUpdatePoll();
      //
      //   this.$nextTick(() => {
      //     this.onMounted();
      //   });
      // });
    },

    beforeDestroy() {
      this.abort();
      document.removeEventListener('resume', this.onAppResume);
      document.removeEventListener('pause', this.onAppPause);
      delete window.forceUpdatePoll;
    },

    methods: {
      onMounted() {
        if (this._curAjax) {
          this._curAjax.abort();
          this._curAjax = null;
          this.netError = null;
        }

        this.$nextTick(() => {
          this.forceUpdatePoll();
        });
      },

      onVoteClick() {
        this.isSubmitting = true;

        this.submitVote(this.poll.id, this.selectedOptionID, (poll, pollTimestamp) => {
          this.isSubmitting = false;

          this.poll = poll;
          this.pollTimestamp = pollTimestamp;

          // save submitted vote
          this.myVotes[this.poll.id] = this.selectedOptionID;
          LocalStorageWrapper.setItemAsync('myVotes', JSON.stringify(this.myVotes));
        });
      },

      submitVote(pollID, optionID, cb) {
        this._curAjax = AjaxWrapper({
          url: 'http://endovascular.ru/mobileApp/vote/' + pollID,
          //crossDomain: true,
          dataType: 'json',
          timeout: 5000,
          method: 'POST',
          data: {
            optionID: optionID,
            uniqueID: Math.random().toString() + (new Date()).getTime().toString()
          },
          success: function(data) {
            console.log(data);
            cb(data.poll, data.timestamp);
          },
          complete: () => {
            this._curAjax = null;
          },
        });
      },

      onAppPause() {
        this.appPaused = true;
      },

      onAppResume() {
        this.appPaused = false;

        this.$nextTick(() => {
          this.forceUpdatePoll();
        });
      },

      forceUpdatePoll() {
        this.poll = null;
        this.pollTimestamp = null;
        this.netError = null;
        this.updatePoll();
      },

      calcPercentage(option) {
        return Math.round(option.votes / this.poll.votes * 100);
      },

      onOptionClick(option) {
        this.selectedOptionID = parseInt(option.id);
      },

      updatePoll() {
        console.log(this.poll);
        if (this._curAjax) {
          this._curAjax.abort();
          this._curAjax = null;
          this.netError = null;
        }

        if ((this.netError === null) || (this.netError === false)) {
          let timeout = 5000;
          let data = {};
          if (this.pollTimestamp) {
            data.timestamp = parseInt(this.pollTimestamp);
            timeout = 45000;
          }
          this._curAjax = AjaxWrapper({
            url: 'http://endovascular.ru/mobileApp/poll',
            method: 'get',
            type: 'get',
            cache: false,
            data,
            dataType: 'json',
            timeout,
            success: (data) => {
              console.log(data);
              if (typeof data.poll !== typeof undefined) {
                if (!data.poll || !this.poll || (data.poll.id !== this.poll.id)) this.selectedOptionID = null;

                this.poll = data.poll;
              }
              this.pollTimestamp = data.timestamp;
              this.netError = false;

              if (!this.appPaused) {
                setTimeout(() => {
                  this.updatePoll();
                }, 0);
              }
            },
            error: () => {
              this.netError = true;
            },
            complete: () => {
              this._curAjax = null;
            },
          });
        } else {
          if (!this.appPaused) {
            setTimeout(() => {
              //this.updatePoll();
            }, 0);
          }
        }
      },

      abort() {
        if (this._curAjax) this._curAjax.abort();
        this._curAjax = null;
      },
    },

    computed: {
      isVoted() {
        return (typeof this.myVotes[this.poll.id] !== typeof undefined);
      }
    }
  }
</script>

<style lang="scss">
  .page[data-name="poll"] {
    .page-content,
    .page-content > .block {
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: stretch;
    }

    .page-content > .block {
      height: 100%;
    }
  }
</style>

<style scoped lang="scss">
  .vote {
    display: inline-block !important;
    width: 100%;

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      > .bar-wrapper {
        flex-basis: 100%;

        > .bar {
          transition: width 0.5s;
          background-color: var(--f7-theme-color);
          height: 20px;
        }
      }

      > .votes {
        justify-self: flex-end;
        text-align: right;
        overflow: visible !important;
        white-space: nowrap !important;
        margin-left: 10px;
      }
    }
  }
</style>

<style lang="scss">
  .page[data-name="poll"] {
    .item-title {
      flex-basis: 100%;
    }
  }
</style>