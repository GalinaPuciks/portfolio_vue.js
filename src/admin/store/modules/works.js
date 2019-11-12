import errorTooltip from '../../helpers/errorTooltip'
import formData from '../../helpers/forms'
export default {
  namespaced: true,
  state: {
    works: []
  },
  mutations: {
    LOAD_WORKS (state, payload) {
      state.works = payload;
    },
    SAVE_WORK (state, payload) {
      state.works.push(payload);
    },
    UPDATE_WORK (state,payload) {
      state.works = state.works.map(work => {
        return work.id === payload.work.id ?payload.work : work;
      })
    },
    DELETE_WORK (state, payload) {
      state.works = state.works.filter(work => {
        if (work.id !== payload) {
          return work;
        }
      })
    }
  },
  
  actions: {
    async loadWorks (content, payload) {
      try {
        const { data } = await this.$axios.get(`/works/${payload}`);
        content.commit('LOAD_WORKS', data);
      } catch (error) {
        errorTooltip(content, error);
      }
    },
    async saveWork (content, payload) {
      try {
        const { data } = await this.$axios.post('/works', formData(payload), { headers: { 'Content-Type': 'multipart/form-data' } });
        content.commit('SAVE_WORK', data);
        content.commit('tooltip/SHOW_TOOLTIP', { type: 'success', message: 'Работа успешно добавлена' }, { root: true });
      } catch (error) {
        ErrorTooltip(content, error);
      }
    },
    async updateWork (content,payload) {
      try {
        const { data } = await this.$axios.post(`/works/${payload.id}`, formData(payload), { headers: { 'Content-Type': 'multipart/form-data' } });
        content.commit('UPDATE_WORK', data);
        content.commit('tooltip/SHOW_TOOLTIP', { type: 'success', message: 'Работа успешно обновлена' }, { root: true });
      } catch (error) {
        errorTooltip(content, error);
      }
    },
    async deleteWork (content, payload) {
      try {
        await this.$axios.delete(`/works/${payload}`);
        content.commit('DELETE_WORK', payload);
        content.commit('tooltip/SHOW_TOOLTIP', { type: 'success', message: 'Работа успешно удалена' }, { root: true });
      } catch (error) {
        errorTooltip(content, error);
      }
 }
  },
  getters: {
    getWorks (state) {
      return state.works;
    }
  }
}

