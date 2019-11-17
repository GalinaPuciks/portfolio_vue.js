<template lang="pug">
  .card
    vc-skills-title(:category="category")
    .card-content
      ul.skills
        li(v-for="skill in category.skills" :key="skill.id")
          vc-skills-item(:skill="skill")
    .card-footer
      form(@submit.prevent="addNewSkill" :class="{ 'is-blocked': formBlocked }").add-new-skill
        .add-new-skill-cell
          vc-input(type="text" name="title" placeholder='Новый навык' v-model="skill.title")
        .add-new-skill-cell
          vc-input(type="number" name="percent" v-model="skill.percent")
        .add-new-skill-cell
          button(type="submit").btn.btn--add.btn--big
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  props: ['category'],
  data () {
    return {
      formBlocked: false,
      skill: {
        title: '',
        percent: 0,
        category: this.category.id
      }
    };
  },
  components: {
    vcInput: () => import('../components/input.vue'),
    vcSkillsItem: () => import('..components/skills-item.vue/'),
    vcSkillsTitle: () => import('..components/skills-title.vue/'),
  },
  methods: {
    ...mapActions('categories', ['addCategory', 'loadCategories']),
    ...mapActions('skills', ['addSkill']),
    ...mapActions('tooltip', ['showTooltip']),
    async addNewSkill () {
      this.formBlocked = true;
      try {
        await this.addSkill(this.skill);
        this.showTooltip({ type: 'success', message: 'Навык добавлен' });
      } catch ({ message }) {
        this.showTooltip({ type: 'error', message });
      } finally {
        this.formBlocked = "";
        this.skill.percent = 0;
        this.skill.title = "";
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.input-skill {
  border: none;
}
.add-skill-wrapper.blocked {
  opacity: 0.5;
  filter: grayscale(100%);
  pointer-events: none;
  user-select: none;
}

.about-page__add-new--big{
  color: $links-color;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  &:before {
    content: "+";
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: linear-gradient(to right, #006aed, #3f35cb);
    line-height: 30px;
    color: #fff;
    margin-right: 13px;
    flex-shrink: 0;
    font-size: 30px;
    font-weight: 400;
  line-height: 40px;
  }
}

.add-skill-wrapper {
  display: flex;
}

.input-skill {
  border-bottom: 1px solid black;
  margin-right: 5px;
}

.input-skill--percent {
  width: 50px;
}


</style>
