<template lang="pug">
  section.about
    .container.page-container
      .page-header
        .page-columns
          h2.page-title Блок «Обо мне»
        .page-columns
          button(type="button" @click="showAddingCard = true").btn.btn--add.btn--text Добавить группу
      .page-content
        ul.about-list
          li(v-if="showAddingCard").about-item
            .card
              vc-skills-title(:category="{ showAddingCard }" @hideCard="hideCard")
              .card-content
              .card-footer
                vc-skills-add-new()
          li(v-for="category, index in getCategories" :key="index").about-item
            .card
              vc-skills-title(:category="category")
              .card-content
                ul.skills
                  li(v-for="skill in category.skills" :key="skill.id")
                    vc-skills-item(:skill="skill")
              .card-footer
                vc-skills-add-new(:category="category")

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    showAddingCard: false,
    formBlocked: false,
    title: '',
    skill: {
      title: '',
      percent: 0,
      category: 0
    }
  }),
  components: {
    vcInput: () => import('../input.vue'),
    vcSkillsItem: () => import('../skills-item.vue'),
    vcSkillsTitle: () => import('../skills-title.vue'),
    vcSkillsAddNew: () => import('../skills-add-new.vue'),
  },
  computed: {
    ...mapGetters('categories', ['getCategories']),
    ...mapState('user', {
      userID: state => state.user.id
    })
  },
  methods: {
    ...mapActions('categories', ['loadCategories']),
    hideCard () {
      this.showAddingCard = false;
    }
  },
  created () {
    this.loadCategories(this.userID);
  }
};
</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";


.card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
  padding: 30px;
  min-height: 380px;
  height: 100%;
}
.page-header {
  display:flex;
  align-items: baseline;
}


.about-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -30px;
    @include tablets {
      flex-direction: column;
    }
}

.about-item {
    flex-basis: calc(50% - 30px);
    margin-left: 30px;
    margin-bottom: 30px;
    
    background-color: #ffffff;
    :hover {
      //box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
    }
  }


.about {
  position: relative;
}

.btn--text {
  color: $links-color;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  &:before {
    content: "+";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-image: linear-gradient(to right, #006aed, #3f35cb);
    line-height: 20px;
    color: #fff;
    margin-right: 13px;
    flex-shrink: 0;
    flex-basis: 20px;
  }
}

.page-title {
  margin-right: 30px;

}

.card-content {
    padding: 20px 10px 20px;
    flex: 1;
  }
.card-footer {
    padding: 0 10px;
}

.page-title{
    color: $text-color;
    font-weight: 700;
    line-height: 34px;
  }
  
</style>
