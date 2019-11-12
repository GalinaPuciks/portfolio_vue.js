import showErrorTooltip from '../../helpers/ShowErrorTooltip'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async addSkill (content, payload) {
      try {
        const { data } = await this.$axios.post('/skills', payload);
        content.commit('categories/ADD_SKILL', data, { root: true });
        content.commit('tooltip/SHOW_TOOLTIP', { type: 'success', message: 'Скилл успешно добавлен' }, { root: true });
      } catch (error) {
        showErrorTooltip(content, error);
      }
    },
    async deleteSkill (content, payload) {
      try {
        await this.$axios.delete(`/skills/${ payload.id }`);
        content.commit('categories/DELETE_SKILL', payload, { root: true });
        content.commit('tooltip/SHOW_TOOLTIP', { type: 'success', message: 'Скилл успешно удален' }, { root: true });
      } catch (error) {
        showErrorTooltip(content, error);
      }
    },
    async editSkill (content, payload) {
      try {
        const { data } = await this.$axios.post(`/skills/${ payload.id }`, payload);
        content.commit('categories/EDIT_SKILL', data.skill, { root: true });
        content.commit('tooltip/SHOW_TOOLTIP', { type: 'success', message: 'Скилл успешно изменен' }, { root: true });
      } catch (error) {
        showErrorTooltip(content, error);
      }
    }
  },

  getters: {}

};