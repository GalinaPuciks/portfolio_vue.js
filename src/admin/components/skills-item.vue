<template lang="pug">
  .skills-row(v-if="editMode" @keyup.enter="editExistedSkill" @keyup.esc="editMode = !editMode")
    .skills-cell: vc-input(type="text" name="skillTitle" v-model="editedSkill.title")
    .skills-cell: vc-input(type="number" name="skillPercent" :strong="true" v-model="editedSkill.percent")
    .skills-cell
      .controls
        .controls-btn: button(type='button' @click="editExistedSkill").btn.btn-icon-tick
        .controls-btn: button(type='button' @click="editMode = !editMode").btn.btn-icon-cross
  .skills-row(v-else)
    .skills-cell {{ skill.title }}
    .skills-cell {{ skill.percent }} %
    .skills-cell
      .controls
        .controls-btn: button(type='button' @click="editMode = !editMode").btn.btn-icon-pencil
        .controls-btn: button(type='button' @click="deleteSkill(skill)").btn.btn-icon-cross 

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


.skills {
  width: 100%;
  &-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
  }
  &-cell {
    &:nth-child(1) {
      flex-basis: 70%;
      margin-right: 30px;
    }
    &:nth-child(2) {
      flex-basis: 20%;
      margin-right: 30px;
    }
    //&:nth-child(3) {
    //}
  }
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-btn {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.btn-icon-pencil {
    background-image: svg-load("pencil.svg", fill=#cfd2d7);
    width: 16px;
    height: 15px;
    border:none;
  }



  .btn-icon-cross {
    background-image: svg-load("trash.svg", fill=#cfd2d7);
    width: 13px;
    height: 15px;
    border:none;
  }
  
.btn-icon-tick {
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