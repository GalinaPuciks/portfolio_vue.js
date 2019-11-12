<template lang="pug">
  section.reviews
    .container.page__container
      .page__header
        .page__columns
          h1.page-title.works__title Блок «Отзывы»
      .page__content
        .page__row(v-if="showAddingCard")
          vc-reviews-add-new(:review="review" @hideAddingCard="hideAddingCard")
        .page__row
          ul.reviews__list
            li.reviews__item
              .card.card--add
                button(type="button" @click="showAddingCard = true").btn.btn--add.btn--xbig добавить отзыв
            li(v-for="review in getReviews" :key="review.id").reviews__item
              vc-reviews-item(:review="review" @editReview="editReview" @hideAddingCard="hideAddingCard")
  include ../../../blocks/button.pug
  include ../../../blocks/form-main.pug
  include ../../../mixins.pug
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
  data: () => ({
    showAddingCard: false,
    review: {
      author: '',
      occ: '',
      text: '',
      photo: ''
    }
  }),
  components: {
    vcInput: () => import('../input.vue'),
    vcReviewsItem: () => import('../reviews-item.vue'),
    vcReviewsAddNew: () => import('../reviews-add-new.vue'),
  },
  methods: {
    ...mapActions('reviews', ['loadReviews']),
    hideAddingCard () {
      this.showAddingCard = false;
      this.review = { ...{
          author: '',
          occ: '',
          text: '',
          photo: ''
        } }
    },
    editReview (payload) {
      this.review = payload;
      this.showAddingCard = true;
    }
  },
  computed: {
    ...mapGetters('reviews', ['getReviews']),
    ...mapState('user', {
      userID: state => state.user.id
    })
  },
  created () {
    this.loadReviews(this.userID);
  }
};
</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";
//@import "../../main-styles/mainStyles";

.btn--add {
      font-size: 0;
      display: flex;
      align-items: center;
      &:before {
        content: '+';
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        border-radius: 50%;
        font-size: 15px;
        width: 21px;
        height: 21px;
        color: #fff;
        background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
      }
}
.btn--xbig {
        color: #fff;
        display: flex;
        justify-content: center;
        width: 150px;
        height: 150px;
        border: 2px solid white;
        border-radius: 50%;
        &:before {
          font-size: 72px;
          font-weight: 300;
          line-height: 30px;
          background-image: none;
        }
      }


 
</style>
