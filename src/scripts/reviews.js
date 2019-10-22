import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';
import axios from 'axios';

const EventBus = new Vue();

axios.defaults.baseURL = 'https://webdev-api.loftschool.com/';

const Quote = {
  template: "#slide-template",
  props: {
    review: Object
  }
};

const CarouselWrap = {
  template: '#carousel-template',
  components: {
    vcQuote: Quote,
    Carousel,
    Slide
  },
  data() {
    return {
      reviews: []
    }
  },
  mounted() {
    axios({
      method: 'get',
      url: 'reviews/174'
    })
      .then(({ data }) => data)
      .then(reviews => {
        return reviews.map(review => {
          return (review.photo = 'https://webdev-api.loftschool.com/' + review.photo) && review;
        });
      })
      .then(reviews => this.reviews = reviews)
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        console.log(this.reviews);
      });

    EventBus.$on('slide', direction => {
      switch (direction) {
        case "prev" :
          document.querySelector('.VueCarousel-navigation-prev').click();
          break;
        case "next" :
          document.querySelector('.VueCarousel-navigation-next').click();
          break;
      }
    })
  }
};

new Vue({
  el: '#reviews',
  components: {
    vcCarouselWrap: CarouselWrap
  },
  methods: {
    slide(direction) {
      EventBus.$emit('slide', direction);
    }
  }
});