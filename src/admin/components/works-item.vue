<template lang="pug">
    .card.card--works
        .card-header
            figure.works__figure
              img(:src="workPhoto(work.photo)" style="object-fit: cover; object-position: center")
              figcaption.works__figcaption
                vc-tags(:techs="work.techs")
        .card-content
          .works-row
            h3.page-subtitle {{ work.title}}
          .works-row
            p {{ work.description }}
          .works-row
            a(:href="work.link").btn.btn--link {{ work.link }}
        .card-footer
            .controls
              .controls-btn
                  button(type="button"  @click="editWork").btn.btn-pencil 
                  .btn-text Править
              .controls-btn
                  button(type="button" @click="deleteTheWork(work.id)").btn.btn-cross
                  .btn-text Удалить
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'works-item',
  props: ['work'],
  components: {
    vcTags: () => import('../components/tags.vue')
  },
  methods: {
    ...mapActions('works', ['deleteWork']),
    workPhoto (photo) {
      return `https://webdev-api.loftschool.com/${ photo }`;
    },
    editWork () {
      this.$emit('editWork', this.work);
    },
    deleteTheWork (payload) {
      this.deleteWork(payload);
    }
  }
};
</script>
<style lang="postcss" scoped>
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    background-repeat: no-repeat;
    margin: 0;
    padding: 0;
    cursor: pointer;
    //&__column:not(:last-child) {
      //color: rgba($text-color, .5);
      //font-size: 16px;
      //font-weight: 600;
      //line-height: 30px;
      //margin-right: 10px;
    //}
}

.btn-pencil {
      background-image: svg-load("pencil.svg", fill=#383bcf);
      width: 16px;
      height: 15px;
    }
.btn-cross {
      background-image: svg-load("cross.svg", fill=#bf2929);
      width: 16px;
      height: 15px;
      border:none;
}
.card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
  padding: 30px;
  min-height: 380px;
  height: 100%;
  //&--add {
    //justify-content: center;
    //align-items: center;
    //box-shadow: none;
    //padding: 0;
    //background-color: #3f35cb;
    //background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
  //}
  &--works:hover {
    cursor: pointer;
    opacity: .7;
    box-shadow: none;
  }
  &-header {
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
  //&__column:nth-child(1) {
    //flex-basis: 60%;
  //}
  //&__column:not(:last-child) {
    //margin-right: 20px;
  //}
  &-content {
    padding: 20px 10px 20px;
    flex: 1;
  }
  &--works > &__content,
  &--works > &__footer {
    padding-left: 0;
    padding-right: 0;
  }

  &-footer {
    padding: 0 10px;
  }

  //&__add-new-skill-group {
    //flex-basis: 65%;
 // }
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.controls-btn {
    margin-right: 20px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    &:last-child {
      margin-right: 0;
    }
  }
.btn-text {
  margin-right: 10px;
}
.works__figcaption {
    position: absolute;
    bottom: 3%;
    right: 3%;
  }
.works__figure {
    position: relative;
    margin: 0;
    padding: 0;
  }
</style>