<template lang="pug">
  form(@submit.prevent="addNewSkill" :class="{ 'is-blocked': formBlocked }").add-new-skill
    .add-new-skill__columns
        vc-input(
        type="text"
        name="title"
        placeholder='Новый навык'
        v-model="skill.title"
        :errorText="validation.firstError('skill.title')")
    .add-new-skill__columns
        vc-input(
        type="number"
        name="percent"
        v-model="skill.percent"
        :errorText="validation.firstError('skill.percent')")
    .add-new-skill__columns
        button(type="submit").btn.btn--add.btn--big
</template>
<script>
import { mapActions } from 'vuex';
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;
export default {
  mixins: [SimpleVueValidator.mixin],
  name: 'skills-add-new',
  props: ['category'],
  data () {
    return {
      formBlocked: !this.category,
      skill: {
        title: '',
        percent: 0
      }
    };
  },
  validators: {
    'skill.title': value => {
      return Validator.value(value).required('Заполните название');
    },
    'skill.percent': value => {
      return Validator.value(value)
        .integer('Должно быть числом')
        .between(0, 100, 'Некорректное значение для процентов')
        .required('Поле не может быть пустым');
    }
  },
  components: {
    vcInput: () => import('../components/input.vue')
  },
  methods: {
    ...mapActions('skills', ['addSkill']),
    async addNewSkill () {
      if (await this.$validate()) {
        this.formBlocked = true;
        this.skill.category = this.category.id;
        await this.addSkill(this.skill);
        this.formBlocked = this.skill.title = '';
        this.skill.percent = 0;
        this.validation.reset();
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins";
//@import "../main-styles/mainStyles";

.add-new-skill {
  display: flex;
  flex-grow: 0;
  justify-content: flex-end;
  &__cell {
    margin-right: 20px;
    &:nth-child(1) {
      flex-basis: 45%;
    }
    &:nth-child(2) {
      flex-basis: 20%;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &.is-blocked {
    opacity: .3;
    filter: grayscale(100%);
    pointer-events: none;
    user-select: none;
  }
}

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


    .btn--big:before {
      font-size: 30px;
      width: 40px;
      height: 40px;
    }
</style>
