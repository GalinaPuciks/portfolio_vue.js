<template lang="pug">
  form(@submit.prevent="addNewSkill" :class="{ 'is-blocked': formBlocked }").add-new-skill
    .add-new-skill-block
        vc-input(
        type="text"
        name="title"
        placeholder='Новый навык'
        v-model="skill.title"
        :errorText="validation.firstError('skill.title')")
    .add-new-skill-block.number-percent
        vc-input(
        type="number"
        name="percent"
        v-model="skill.percent"
        :errorText="validation.firstError('skill.percent')")
    .add-new-skill-block
        button(type="submit").btn.btn-add.btn-blue-cross
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
        .between(0, 100, 'Значение должно быть от 0 до 100')
        .required('Поле обязательно для заполнения');
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


.add-new-skill {
  display: flex;
  flex-grow: 0;
  justify-content: flex-end;
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


    .btn-blue-cross:before {
      font-size: 30px;
      width: 40px;
      height: 40px;
    }
  
  .add-new-skill-block {
    margin-right:5px;
    &:last-child {
      margin-right: 0;
    }
  }
  
  .number-percent {
    width:20%;
  }
</style>
