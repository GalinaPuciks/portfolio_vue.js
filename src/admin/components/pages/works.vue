
<template lang="pug">
  section.works-section
    .container.page-container
      .page-header
        .page-columns
          h1.page-title.works-title Блок «Работы»
      .page-content
        .page-row(v-if="showAddingCard")
          vc-works-add-new(:work="work" @hideAddingCard="hideAddingCard")
        .page-row
          ul.works-list
            li.works-item
              .card.card--add
                button(type="button"  @click="showAddingCard = true").btn.btn-add.btn-blue-big-add Добавить работу 
            li(v-for="work in getWorks" :key="work.id").works-item
              vc-works-item(:work="work" @editWork="editWork")
    include ../../../blocks/button.pug
    include ../../../blocks/form-main.pug
    include ../../../mixins.pug
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
  data: () => ({
    showAddingCard: false,
    work: {
      title: '',
      //link: 'http://test.com',
      description: '',
      techs: '',
      photo: ''
    }
  }),
  components: {
    vcInput: () => import('../../components/input.vue'),
    vcWorksItem: () => import('../works-item.vue'),
    vcWorksAddNew: () => import('../../components/works-add-new.vue'),
  },
  methods: {
    ...mapActions('works', ['loadWorks']),
    hideAddingCard () {
      this.showAddingCard = false;
      this.work = { ...{
          title: '',
          //link: 'http://test.com',
          description: '',
          techs: '',
          photo: ''
        } }
    },
    editWork (payload) {
      this.work = payload;
      this.showAddingCard = true;
    }
  },
  computed: {
    ...mapGetters('works', ['getWorks']),
    ...mapState('user', {
      userID: state => state.user.id
    })
  },
  created () {
    this.loadWorks(this.userID);
  }
};
</script>
<style lang="postcss" scoped>

@import "../../../styles/mixins.pcss";
@import "../../../styles/layout/base.pcss";

.works {
  img {
    width: 100%;
  }
  &__figure {
    position: relative;
    margin: 0;
    padding: 0;
  }
  &__figcaption {
    position: absolute;
    bottom: 3%;
    right: 3%;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -30px;
  }
 

    @include tablets {
      flex-basis: 100%;
    }
  }
  &__row {
    display: flex;
    margin-bottom: 20px;
    p {
      color: rgba($text-color, .7);
      font-size: 16px;
      font-weight: 600;
      line-height: 30px;
    }
  }

.works-item {
    flex-basis: calc(100% / 3 - 30px);
    margin-left: 30px;
    margin-bottom: 30px;
    @include desktop {
      flex-basis: calc(100% / 2 - 30px);
    }
}
////////////////////////////////////////

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