import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/parallax";
import "./scripts/budda__parallax";
import "./scripts/works";
import "./scripts/reviews";
import Menu from "./scripts/menu";

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