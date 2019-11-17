<template lang="pug">
.card
  .card-header
    .card-column
      .page-subtitle Редактирование работы
  .card-content
    form(@submit.prevent="workCard(newWork)" @reset.prevent="hideAddingCard").edit-form.form--strong
      .edit-form-block
        input(
          type="file"
          name="work-image"
          @change="appendFileAndRenderPhoto")#upload-pic.edit-form__file
        .edit-form-row(v-if="renderedPhoto")
          .edit-form__frame
            img(:src="renderedPhoto")
        .edit-form-row(v-if="renderedPhoto")
          .edit-form__button
            button(type="button").btn
              label(for="upload-pic").btn.btn--link Изменить превью
        .edit-form-row(v-else)
          .edit-form__frame
            .edit-form__info Перетащите или загрузите для загрузки изображения
            .edit-form__button
              label(for="upload-pic").btn.btn--gradient ЗАГРУЗИТЬ
        vc-tooltip-input(:errorText="validation.firstError('newWork.photo')")
      .edit-form-block
        .edit-form-row
          vc-input(
            type="text"
            title="Название"
            name="title"
            v-model="newWork.title"
            :errorText="validation.firstError('newWork.title')"
            placeholder="Дизайн сайта для авто салона Porsche")
        .edit-form-row
          vc-input(
            type="url"
            title="Ссылка"
            name="link"
            v-model="newWork.link"
            :errorText="validation.firstError('newWork.link')"
            placeholder="https://www.porsche-pulkovo.ru")
        .edit-form-row
          vc-input(
            type="textarea"
            title="Описание"
            name="description"
            v-model="newWork.description"
            :errorText="validation.firstError('newWork.description')"
            palceholder="Порше Центр Пулково - является официальным дилером марки Порше в Санкт-Петербурге и предоставляет полный цикл услуг по продаже и сервисному обслуживанию автомобилей")
        .edit-form-row
          vc-input(
            type="text"
            title="Добавление тэга"
            name="techs"
            v-model="newWork.techs"
            :errorText="validation.firstError('newWork.techs')"
            placeholder="Jquery, Vue.js, HTML5")
        .edit-form-row
          vc-tags(:techs="newWork.techs" :tagButton="true" @updateTag="updateTag")
        .edit-form-row
          .controls.edit-form-btns
            .controls__btn
              button(type="reset").btn.btn--link Отмена
            .controls__btn
              button(type="submit" :class="{ 'is-blocked': isBlocked }" :disabled="isBlocked").btn.btn--gradient Сохранить
</template>


<script>
import SimpleVueValidator from 'simple-vue-validator';
import { mapActions } from 'vuex';

const Validator = SimpleVueValidator.Validator;

export default {
  mixins: [SimpleVueValidator.mixin],
  name: 'work-add-new',
  props: ['work'],
  data () {
    return {
      isBlocked: false,
      renderedPhoto: '',
      newWork: { ...this.work }
    };
  },
  components: {
    vcInput: () => import('../components/input.vue'),
    vcTooltipInput: () => import('../components/tooltip-input.vue'),
    vcTags: () => import('../components/tags.vue'),
  },
  validators: {
    'newWork.title': function (value) {
      return Validator.value(value).required()
    },
    'newWork.link': function (value) {
      return Validator.value(value).required()
    },
    'newWork.description': function (value) {
      return Validator.value(value).required()
    },
    'newWork.techs': function (value) {
      return Validator.value(value).required()
    },
    'newWork.photo': function (value) {
      return Validator.value(value).required();
    }
  },
  methods: {
    ...mapActions('works', ['saveWork', 'updateWork']),
    hideAddingCard () {
      this.$emit('hideAddingCard');
    },
    appendFileAndRenderPhoto (e) {
      this.newWork.photo = e.target.files[0];
      const reader = new FileReader();
      try {
        reader.readAsDataURL(this.newWork.photo);
        reader.onload = () => {
          this.renderedPhoto = reader.result;
        };
      } catch (error) {
      }
    },
    async workCard () {
      console.log(this.newWork);
      if (await this.$validate()) {
        this.isBlocked = true;
        const isChanged = Object.keys(this.newWork).some(key => {
          return this.newWork[key] !== this.work[key];
        });
        if (isChanged) {
          this.newWork.id ? await this.updateWork(this.newWork) : await this.saveWork(this.newWork);
        }
        this.$emit('hideAddingCard');
      }
    },
    updateTag (tags) {
      this.newWork.techs = tags;
    }
  },
  created () {
    this.newWork = { ...this.work };
    if(this.work.photo) {
      this.renderedPhoto = 'https://webdev-api.loftschool.com/' + this.work.photo;
    }
  },

  watch: {
    work () {
      console.log('watch');
      this.newWork = { ...this.work };
      this.renderedPhoto = 'https://webdev-api.loftschool.com/' + this.work.photo;
    }
  }
};
</script>

<style lang="postcss" scoped>
@import url("../../styles/mixins.pcss");
.form--strong {
    display: flex;
}

.card {
  background: #fff;
  box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
  padding: 0 20px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  &_plain {
    padding: 0;
  }
}
.page-header {
    display: flex;
    margin-bottom: 55px;
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
  &-block {
    flex-basis: 50%;
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.edit-form__frame {
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
}

.edit-form__info {
    width: 50%;
    text-align: center;
    color: rgba(#414c63, .5);
    font-size: 16px;
    font-weight: 600;
    line-height: 2;
    margin-bottom: 20px;
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
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    background-repeat: no-repeat;
    margin: 0;
    padding: 0;
    cursor: pointer;
    &__column:not(:last-child) {
      color: rgba($text-color, .5);
      font-size: 16px;
      font-weight: 600;
      line-height: 30px;
      margin-right: 10px;
    }
}

.page-subtitle {
    color: $text-color;
    font-weight: 700;
    line-height: 34px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
.btn--link {
    color: $admin-blue;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
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

.edit-form-block {
    width: 100%;
    display: flex;
    flex-direction: column;
  }



.edit-form-block:not(:last-child) {
    margin-bottom: 30px;
  }  

.edit-form-btns {
  padding-top: 20px;
}

</style>