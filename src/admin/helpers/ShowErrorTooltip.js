export default (content, error) => {
    content.commit('tooltip/SHOW_TOOLTIP', {
      type: 'error',
      message: error.response.data.error || error.response.data.message
    }, { root: true });
  };