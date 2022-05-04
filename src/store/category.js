import firebase from 'firebase/compat'

export default {
  actions: {
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/teachers`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/teachers`).child(id).once('value')).val() || {}
        return {...category, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {name,last_name}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/teachers`).child(id).update({name, last_name})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({commit, dispatch}, {name, last_name}) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/teachers`).push({name, last_name})
        return {name, last_name, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
