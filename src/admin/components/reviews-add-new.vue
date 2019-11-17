<template lang="pug">
.card
  .card__header
    .card__column
      .page-subtitle Новый отзыв
  .card__content
    form(@submit.prevent="reviewCard(newReview)" @reset.prevent="hideAddingCard").edit-form.edit-form--reviews.form--strong
      .edit-form__column
        input(
          type="file"
          name="reviews-image"
          @change="appendFileAndRenderPhoto")#upload-pic.edit-form__file
        .edit-form__row
          .edit-form__frame(:class="{ filled: renderedPhoto.length }" :style="renderedBackground")
        .edit-form__row
          .edit-form__button
            label(for="upload-pic").btn.btn--link.btn-link-pic Добавить фото
        vc-tooltip-input(:errorText="validation.firstError('newReview.photo')")
      .edit-form__column
        .edit-form__row-double
          .edit-form__row: vc-input(
            type="text"
            name="author"
            title="Имя автора"
            placeholder="Ковальчук Дмитрий"
            v-model="newReview.author"
            :errorText="validation.firstError('newReview.author')")
          .edit-form__row: vc-input(
            type="text"
            name="occ"
            title="Титул автора"
            placeholder="Основатель LoftSchool"
            v-model="newReview.occ"
            :errorText="validation.firstError('newReview.occ')")
        .edit-form__row: vc-input(
          type="textarea"
          name="text"
          title="Отзыв"
          placeholder="Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!"
          v-model="newReview.text"
          :errorText="validation.firstError('newReview.text')")
        .edit-form__row
          .controls.edit-form__btns
            .controls__btn: button(type="reset").btn.btn--link Отмена
            .controls__btn: button(type="submit" :class="{ 'is-blocked': isBlocked }").btn.btn--gradient Сохранить   
</template>
<script>
import SimpleVueValidator from 'simple-vue-validator';
import { mapGetters, mapActions, mapState } from 'vuex';
const Validator = SimpleVueValidator.Validator;
export default {
  mixins: [SimpleVueValidator.mixin],
  name: 'reviews-add-new',
  props: {
    review: Object
  },
  data () {
    return {
      isBlocked: false,
      renderedPhoto: '',
      newReview: { ...this.review }
    };
  },
  components: {
    vcInput: () => import('../components/input.vue'),
    vcTooltipInput: () => import('../components/tooltip-input.vue')
  },
  validators: {
    'newReview.author': function (value) {
      return Validator.value(value).required()
    },
    'newReview.occ': function (value) {
      return Validator.value(value).required()
    },
    'newReview.text': function (value) {
      return Validator.value(value).required()
    },
    'newReview.photo': function (value) {
      return Validator.value(value).required()
    }
  },
  methods: {
    ...mapActions('reviews', ['saveReview', 'updateReview']),
    hideAddingCard () {
      this.$emit('hideAddingCard');
    },
    appendFileAndRenderPhoto (e) {
      this.newReview.photo = e.target.files[0];
      const reader = new FileReader();
      try {
        reader.readAsDataURL(this.newReview.photo);
        reader.onload = () => {
          this.renderedPhoto = reader.result;
        };

      } catch (error) {
        
      }
    },

    async reviewCard (payload) {
      //console.log(this.newWork)
      if (await this.$validate()) {
        this.isBlocked = true;
        const isChanged = Object.keys(this.newReview).some(key => {
          return this.newReview[key] !== this.review[key];
        });
        if (isChanged) {
          payload.id ? await this.updateReview(payload) : await this.saveReview(payload);
        }
        this.$emit('hideAddingCard');
      }
    }
  },
  computed: {
    ...mapGetters('reviews', ['getReviews']),
    renderedBackground () {
      return this.renderedPhoto ? `background-image: url(${ this.renderedPhoto });` : '';
    }
  },
  created () {
    this.newReview = { ...this.review };
    if(this.review.photo) {
      this.renderedPhoto = 'https://webdev-api.loftschool.com/' + this.review.photo;
    }
  },
  watch: {
    review () {
      console.log('watch');
      this.newReview = { ...this.review };
      this.renderedPhoto = 'https://webdev-api.loftschool.com/' + this.review.photo;
    }
  }
};
</script>
<style lang="postcss" scoped>
@import "../../styles/mixins";

.btn.is-blocked {
    cursor: unset;
    background: #ccc;
    user-select: none;
  }
.edit-form {
  display: flex;
  &__file {
    display: none;
  }
  &__button {
    display: flex;
    justify-content: center;
  }
  &__column {
    flex-basis: 50%;
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
  }
  &--reviews > &__column:nth-child(1) {
    flex-basis: auto;
  }
  &--reviews > &__column:nth-child(2) {
    flex-basis: 60%;
    @include desktop {
      flex-basis: 100%;
    }
  }
  &__row-double {
    display: flex;
    justify-content: space-between;
    @include tablets {
      flex-direction: column;
      margin-bottom: 30px;
    }
  }
  &__row-double > &__row {
    flex-basis: calc(50% - 15px);
  }
  &__row {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &__row:not(:last-child) {
    margin-bottom: 30px;
  }
  &__frame {
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dashed #a1a1a1;
    background-color: #dee4ed;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
    img {
      height: auto;
      max-height: initial;
    }
  }
  &--reviews {
    .edit-form__frame {
      width: 200px;
      height: 200px;
      border: none;
      border-radius: 50%;
      background-image: svg-load("user-new.svg", fill=#fff);
      background-repeat: no-repeat;
      background-size: 75%;
      &.filled {
        background-size: cover;
      }
    }
  }
  &__info {
    width: 50%;
    text-align: center;
    color: rgba(#414c63, .5);
    font-size: 16px;
    font-weight: 600;
    line-height: 2;
    margin-bottom: 20px;
  }
  &__btns {
    justify-content: flex-end;
  }
}

.btn--link {
    color: $admin-blue;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    margin-right:30px;
    &:hover {
      text-decoration: underline;
    }
  }

.btn--gradient {
      width: 181px;
      height: 50px;
      border-radius: 25px;
      color: #ffffff;
      font-weight: 700;
      line-height: 48px;
      text-transform: uppercase;
      background-color: #fff;
      background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
  }

.edit-form__btns {
  
        justify-content: flex-end;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

.page-subtitle {
    color: $text-color;
    font-weight: 700;
    line-height: 34px;
  }

.card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 15px;
    border-bottom: 1px solid rgba(#1f232d, .15);

  }
.card__content {
 

    padding: 20px 10px 20px;

    flex: 1;

  }


</style>