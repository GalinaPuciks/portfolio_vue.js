<template lang="pug">
    .card
      .card__header
        .user
          .user__column
            .avatar.avatar--50(:style="reviewPhoto")
          .user__column
            .user__row.user__name {{ review.author }}
            .user__row.user__occ {{ review.occ }}
      .card__content
        .reviews__row
          p {{ review.text }}
      .card__footer
        .controls
          .controls__btn
            button(type="button" @click="editReview").btn.btn--edit 
            .btn-text Править
          .controls__btn
            button(type="button" @click="deleteTheReview(review.id)").btn.btn--cross
            .btn-text Удалить
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'reviews-item',
  props: ['review'],
  methods: {
    ...mapActions('reviews', ['deleteReview']),
    editReview() {
      this.$emit('editReview', this.review);
    },
    deleteTheReview(payload) {
      this.$emit('hideAddingCard');
      this.deleteReview(payload);
    }
  },
  computed: {
    reviewPhoto() {
      return `background-image: url(https://webdev-api.loftschool.com/${this.review.photo})`;
    }
  }
};
</script>
<style lang="postcss">
@import "../../styles/mixins";
 
 
 
 .btn {
  &--edit {
    background-image: svg-load('pencil.svg', fill=blue, height=17px);
    background-position: center;
    background-repeat: no-repeat;
    border:none;
    padding-right: 30px;
  }
  &--cross {
    background-image: svg-load('cross.svg', fill=red, height=15px);
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    padding-right: 30px;
  }
}   

.user {
  display: flex;
  align-items: center;
  &__column:not(:last-child) {
    margin-right: 30px;
  }
  &__row:not(:last-child) {
    margin-bottom: 10px;
  }
  &__name {
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    @include tablets {
      font-size: 16px;
    }
  }
  &__occ {
    color: rgba($text-color, .3);
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    @include tablets {
      font-size: 14px;
    }
  }
}

.avatar--50 {
  
  width: 50px;

  height: 50px;
  border-radius: 50%;
object-fit: cover;
    -o-object-position: center;
    object-position: center;
}


  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 15;
    border-bottom: 1px solid rgba(#1f232d, .15);
  }
  &--works > &__header {
    padding: 0;
    margin: -30px -30px 0 -30px;
    border-bottom: 
  }

  .controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__btn {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}

.controls__btn {
  display: flex;
  lex-direction: row-reverse;
}

/////////////////////////////////////////////////////////////////
</style>