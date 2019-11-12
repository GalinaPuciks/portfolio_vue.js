<template lang="pug">
  .skills__row(v-if="editMode" @keyup.enter="editExistedSkill" @keyup.esc="editMode = !editMode")
    .skills__cell: vc-input(type="text" name="skillTitle" v-model="editedSkill.title")
    .skills__cell: vc-input(type="number" name="skillPercent" :strong="true" v-model="editedSkill.percent")
    .skills__cell
      .controls
        .controls__btn: button(type='button' @click="editExistedSkill").btn.btn-icon--check
        .controls__btn: button(type='button' @click="editMode = !editMode").btn.btn-icon--cancel
  .skills__row(v-else)
    .skills__cell {{ skill.title }}
    .skills__cell {{ skill.percent }} %
    .skills__cell
      .controls
        .controls__btn: button(type='button' @click="editMode = !editMode").btn.btn-icon--edit
        .controls__btn: button(type='button' @click="deleteSkill(skill)").btn.btn-icon--delete 

</template>
<script>
import { mapActions } from 'vuex';
export default {
  props: {
    skill: Object
  },
  data () {
    return {
      editMode: false,
      editedSkill: { ...this.skill }
    };
  },
  components: {
    vcInput: () => import('../components/input.vue')
  },
  methods: {
    ...mapActions('skills', ['deleteSkill', 'editSkill']),
    editExistedSkill () {
      this.editMode = !this.editMode;
      this.editSkill(this.editedSkill);
    }
  }
};
</script>
<style lang="postcss" scoped>
@import "../../styles/mixins";
//@import "../main-styles/mainStyles";

.skills {
  width: 100%;
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
  }
  &__cell {
    &:nth-child(1) {
      flex-basis: 70%;
      margin-right: 30px;
    }
    &:nth-child(2) {
      flex-basis: 20%;
      margin-right: 30px;
    }
    &:nth-child(3) {
    }
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
.btn-icon--edit {
    background-image: svg-load("pencil.svg", fill=#cfd2d7);
    width: 16px;
    height: 15px;
    border:none;
  }



  .btn-icon--delete {
    background-image: svg-load("trash.svg", fill=#cfd2d7);
    width: 13px;
    height: 15px;
    border:none;
  }
  
.btn-icon--check {
    background-image: svg-load("tick.svg", fill=#00d70a);
    width: 15px;
    height: 12px;
    border:none;
  }



  .btn-icon--cancel {
    background-image: svg-load("cross.svg", fill=#bf2929);
    width: 14px;
    height: 12px;
    border:none;
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
}
</style>