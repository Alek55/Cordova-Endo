
import HomePage from '../pages/home.vue';
import AboutPage from '../pages/about.vue';
import FormPage from '../pages/form.vue';
import NewsPage from '../pages/news.vue';
import NewsSinglePage from '../pages/news-single.vue';
import EventsPage from '../pages/events.vue';
import EventPage from '../pages/event.vue';
import MessagesPage from '../pages/messages.vue';
import MessagePage from '../pages/message.vue';
import SponsorsPage from '../pages/sponsors.vue';
import ErrorReportPage from '../pages/error-report';
import QuestionsPage from '../pages/questions'
import PollPage from '../pages/poll'


import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/news/',
    component: NewsPage,
  },
  {
    path: '/news/:newsID',
    component: NewsSinglePage,
  },
  {
    path: '/events/',
    component: EventsPage,
  },
  {
    path: '/questions/',
    component: QuestionsPage,
  },
  {
    path: '/poll/',
    component: PollPage,
  },
  {
    path: '/events/:eventID',
    component: EventPage,
  },
  {
    path: '/sponsors/',
    component: SponsorsPage,
  },
  {
    path: '/messages/',
    component: MessagesPage,
  },
  {
    path: '/messages/:messageID',
    component: MessagePage,
  },
  {
    path: '/error-report/:reportID',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // Don't block UI thread
      setTimeout(() => {
        // Report ID & timestamp from request
        var reportID = routeTo.params.reportID;
        var reportTimestamp = parseInt(/^xhr-error-(\d+)$/.exec(reportID)[1], 10);

        // Resolve route to load page
        resolve(
          {
            component: ErrorReportPage,
          },
          {
            context: {
              report: JSON.parse(window.localStorage[reportID]),
              reportDate: new Date(reportTimestamp),
            }
          }
        );

        // Hide Preloader
        app.preloader.hide();
      }, 500);
    },
  },


  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
