<template lang="pug">
form(@submit="skillsGroupTitle" @keyup.esc="editMode = false").card-header
        .card-block(v-if="editMode")
            vc-input(
                :autofocus="true"
                type="text"
                placeholder="Название новой группы"
                v-model="newTitle"
                :errorText="validation.firstError('newTitle')")
        .card-block(v-else)
            .page-subtitle {{ category.category }}
        .card-block
            .controls(v-if="editMode")
                .controls-btn
                    button(type='submit').btn.btn-icon-tick
                .controls-btn
                    button(type='button' @click="deleteSkillGroup").btn.btn-icon-cross
            .controls(v-else)
                .controls-btn
                    button(type='button' @click="editMode = true").btn.btn-icon-pencil
                    
</template>
<script>
import { mapActions } from 'vuex';
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;
export default {
  name: 'skills-title',
  mixins: [SimpleVueValidator.mixin],
  props: {
    category: Object
  },
  data () {
    return {
      editMode: this.category.showAddingCard,
      newTitle: ''
    };
  },
  components: {
    vcInput: () => import('../components/input.vue')
  },
  validators: {
    newTitle: value => {
      return Validator.value(value).required();
    }
  },
  methods: {
    ...mapActions('categories', ['addCategory', 'updateCategory', 'deleteCategory']),
    async skillsGroupTitle () {
      if (await this.$validate()) {
        if (this.newTitle === this.category.category) {
          return this.editMode = false;
        }
        if (!this.category.id) {
          await this.addCategory(this.newTitle);
          return this.$emit('hideCard');
        }
        await this.updateCategory({ title: this.newTitle, id: this.category.id });
        this.editMode = false;
      }
    },
    async deleteSkillGroup () {
      if (!this.category.id) {
        return this.$emit('hideCard');
      }
      this.editMode = false;
      await this.deleteCategory(this.category.id);
    }
  },
  watch: {
    editMode () {
      if (this.editMode) {
        this.newTitle = this.category.category || '';
      }
    }
  }
};
</script>
<style lang="postcss" scoped>
@import "../../styles/mixins";


 .page-subtitle {
    color: $text-color;
    font-weight: 700;
    line-height: 34px;
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

 .btn-icon-tick {
    background-image: svg-load("tick.svg", fill=#00d70a);
    width: 15px;
    height: 12px;
    border:none;
  }
  .btn-icon-cross {
    background-image: svg-load("cross.svg", fill=#bf2929);
    width: 14px;
    height: 12px;
    border:none;
  }
  .btn-icon-pencil {
    background-image: svg-load("pencil.svg", fill=#a0a5b1);
    width: 16px;
    height: 15px;
    border:none;
  }

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 15px;
    border-bottom: 1px solid rgba(#1f232d, .15);
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