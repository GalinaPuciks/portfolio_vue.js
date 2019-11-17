import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}
import "./scripts/reviews";
import "./scripts/burger";
import "./scripts/skills";
import "./scripts/parallax";
import "./scripts/budda__parallax";
import "./scripts/works";
import "./scripts/reviews";
import Menu from "./scripts/menu";
import EventBus from './scripts/eventBus';

import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';




Vue.use(VueScrollTo, {
     container: "body",
     duration: 500,
     easing: "ease",
     offset: 0,
     force: true,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
 })
new Vue ({
  el: '.header__menu',
  components: {
  vcMenu: Menu
  }
});

import ReviewsCarousel from './scripts/reviews';
new Vue({
  el: '.reviews',
  data: {
    activePage: 0,
    pages: 0
  },
  components: {
    vcReviewsCarousel: ReviewsCarousel
  },
  methods: {
    prev() {
      document.querySelector('.VueCarousel-navigation-prev').click();
    },
    next() {
      document.querySelector('.VueCarousel-navigation-next').click();
    }
  },
  mounted() {
    EventBus.$on('activePage', number => {
      this.activePage = number;
    });
    EventBus.$on('pages', number => {
      this.pages = number;
    });
  }
});

////////////////////////////////////////////////////
//import Skills from './templates/components/skill1';
//new Vue({
 // el: '#skills-list',
  //components: {
   // vcSkills: Skills
 // }
//});
// Feedback
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//import Feedback from './components/feedback/feedback';
//new Vue({
  //el: '#feedback',
  //components: {
    //vcFeedback: Feedback
 // }
//});
// Tooltip
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//import Tooltip from './components/tooltip/tooltip';
//new Vue({
  //el: '#tooltip',
  //components: {
    //vcTooltip: Tooltip
 // }
//});