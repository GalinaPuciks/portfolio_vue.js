import showErrorTooltip from '../../helpers/ShowErrorTooltip'
import formData from '../../helpers/forms'
export default {
  namespaced: true,
  state: {
    reviews: []
  },
  mutations: {
    LOAD_REVIEWS (state, payload) {
      state.reviews = payload;
    },
    SAVE_REVIEW (state, payload) {
      state.reviews.push(payload);
    },
    UPDATE_REVIEW (state, payload) {
      state.reviews = state.reviews.map(review => {
        return review.id === payload.review.id ? payload.review : review;
      })
    },
    DELETE_REVIEW (state, payload) {
      state.reviews = state.reviews.filter(review => {
        if (review.id !== payload) {
          return review;
        }
      })
    }
  },
  actions: {
    async loadReviews (content, payload) {
      try {
        const { data } = await this.$axios.get(`/reviews/${payload}`);
        content.commit('LOAD_REVIEWS', data);
      } catch (error) {
        showErrorTooltip(content, error);
      }
    },
    async saveReview (content, payload) {
      try {
        const { data } = await this.$axios.post('/reviews', formData(payload), { headers: { 'Content-Type': 'multipart/form-data' } });
        content.commit('SAVE_REVIEW', data);
        content.commit('tooltip/SHOW_TOOLTIP', { type: 'success', message: 'Отзыв успешно добавлен' }, { root: true });
      } catch (error) {
        showErrorTooltip(content, error);
      }
    },
    async updateReview (content, payload) {
      try {
        const { data } = await this.$axios.post(`/reviews/${payload.id}`, formData(payload), { headers: { 'Content-Type': 'multipart/form-data' } });
        content.commit('UPDATE_REVIEW', data);
        content.commit('tooltip/SHOW_TOOLTIP', { type: 'success', message: 'Отзыв успешно обновлен' }, { root: true });
        console.log(data);
      } catch (error) {
        showErrorTooltip(content, error);
      }
    },
    async deleteReview (content, payload) {
      try {
        await this.$axios.delete(`/reviews/${payload}`);
        content.commit('DELETE_REVIEW', payload);
        content.commit('tooltip/SHOW_TOOLTIP', { type: 'success', message: 'Отзыв успешно удален' }, { root: true });
      } catch (error) {
        showErrorTooltip(content, error);
      }
    }
  },
  getters: {
    getReviews (state) {
      return state.reviews;
    }
  }
}