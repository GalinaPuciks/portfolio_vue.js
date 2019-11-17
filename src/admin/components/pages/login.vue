<template lang="pug">
section.login
  .login__content
    h2.login__title Авторизация
    form(@submit.prevent="submit").login__form
      .login__row
        vc-input(
          :strong="true"
          name="name"
          title="Логин"
          icon="user"
          v-model="user.name"
          :errorText="validation.firstError('user.name')"
          :autofocus="true")
      .login__row
        vc-input(
          :strong="true"
          name="password"
          title="Пароль"
          icon="key"
          type="password"
          v-model="user.password"
          :errorText="validation.firstError('user.password')")
      .login__row
        .login__btn
          button(type="submit").btn.login__send-data Отправить
     
</template>

<script>
import $axios from '@/requests/';
import simpleVueValidator from 'simple-vue-validator';
const { Validator } = simpleVueValidator;
import { mapActions} from 'vuex';
export default {
  mixins: [simpleVueValidator.mixin],
  data: () => ({
    user: {
      name: '',
      password: ''
    }
  }),
  components: {
    vcTooltip: () => import('../tooltip.vue'),
    vcInput: () => import('../input.vue')
  },
  validators: {
    'user.name': function (value) {
      return Validator.value(value).required().minLength(6, 'должно быть минимум 5 символов');
    },
    'user.password': function (value) {
      return Validator.value(value).required().minLength(6, 'должно быть минимум 5 символов');
    }
  },
  methods: {
    ...mapActions('tooltip', ['showTooltip']),
    submit: async function () {
      if (await this.$validate()) {
        try {
          const { data: { token } } = await $axios.post('/login', this.user);
          localStorage.setItem('token', token);
          $axios.defaults.headers['Authorization'] = `Bearer ${ token }`;
          await this.$router.replace('/');
        } catch ({ message }) {
          this.showTooltip( { message, type: 'error' });
        }
      }
    }
  }
};
</script>

<style lang="postcss">
@import "../../../styles/mixins.pcss";
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../../images/content/Baloon.jpg") center center / cover no-repeat;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
    background: $text-color;
  }
}

  .login__content {
    width: 563px;
    padding: 50px 77px 60px;
    background: #fff;
    position:relative;
  }



  .login__form {

  }

  .login__row:not(:last-child) {
    margin-bottom: 40px;
  }
  .login__title {
    color: #414c63;
    font-size: 36px;
    font-weight: 600;
    line-height: 60px;
    text-align: center;
    margin-bottom: 34px;
  }



  .login__btn {
    display: flex;
    justify-content: center;
  }


.login__send-data {
  width: 100%;
  padding: 30px;
  background-image: linear-gradient(to right, #ad00ed, #5500f2);
  border-radius: 40px 0 40px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
  &[disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }
}
</style>
