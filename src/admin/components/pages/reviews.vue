<template lang="pug">
  section.reviews
    .container.page-container
      .page-header
        .page-columns
          h1.page-title.works-title Блок «Отзывы»
      .page-content
        .page-row(v-if="showAddingCard")
          vc-reviews-add-new(:review="review" @hideAddingCard="hideAddingCard")
        .page-row
          ul.reviews-list
            li.reviews-item
              .card.card--add
                button(type="button" @click="showAddingCard = true").btn.btn-add.btn-blue-big-add добавить отзыв
            li(v-for="review in getReviews" :key="review.id").reviews-item
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

.reviews{
  img {
    width: 100%;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -30px;
  }
  &-item {
    flex-basis: calc(100% / 3 - 30px);
    margin-left: 30px;
    margin-bottom: 30px;
    @include desktop {
      flex-basis: calc(100% / 2 - 30px);
    }
    @include tablets {
      flex-basis: 100%;
    }
  }



  &-row {
    display: flex;
    margin-bottom: 20px;



    p {
      color: rgba($text-color, .7);
      font-size: 16px;
      font-weight: 600;
      line-height: 30px;
    }
  }
}
////////////////////////////////////////////////////
.page-header {
    display: flex;
    margin-bottom: 55px;
  }
.page-columns:not(:last-child) {
    margin-right: 30px;
  }
.page-row:not(:last-child) {
    margin-bottom: 30px;
  }
.works-title {
  color: #414c63;
font-size: 21px;
font-weight: 700;
line-height: 34px;
}
.btn-add {
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


.btn-blue-big-add {
      color: #fff;
      display: flex;
      justify-content: center;
      width: 150px;
      height: 150px;
      border: 2px solid currentColor;
      border-radius: 50%;
      &:before {
        font-size: 72px;
        font-weight: 300;
        line-height: 30px;
        background-image: none;
      }
    }
.card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
  padding: 30px;
  min-height: 380px;
  height: 100%;
  &--add {
    justify-content: center;
    align-items: center;
    box-shadow: none;
    padding: 0;
    background-color: #3f35cb;
    background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
  }
}


 
</style>
