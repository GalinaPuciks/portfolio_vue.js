<template lang="pug">
  .skill-container
    h2 {{category.category}}
      
    hr
    table
      skills-item(
        v-for="skill in category.skills"
        :key="skill.id"
        :skill="skill"
      )
    hr
    form(
      @submit.prevent="addNewSkill"
      :class={blocked: formBlocked}
    ).add-skill-wrapper
      input(type="text" placeholder="Новый навык" v-model="skill.title").input-skill
      input(type="text" placeholder="100%" v-model="skill.percent").input-skill.input-skill--percent
      button(type="submit").about-page__add-new--big
</template>
<script>
import { mapActions } from "vuex";
export default {
  components: {
    skillsItem: () => import("./skills-item")
  },
  props: {
    category: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data() {
    return {
      formBlocked: false,
      skill: {
        title: "",
        percent: 0,
        category: this.category.id
      }
    };
  },
  methods: {
    ...mapActions("skills", ["addSkill"]),
    async addNewSkill() {
      this.formBlocked = true;
      try {
        await this.addSkill(this.skill);
        this.skill.title = "";
        this.skill.percent = "";
      } catch (error) {
        // errors
      } finally {
        this.formBlocked = false;
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
    //flex-basis: 20px;
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

hr {
  opacity: 0.4;
}
</style>
