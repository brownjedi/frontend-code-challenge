import Vue from 'vue'
import Vuex from 'vuex'

// Load all modules.
function loadModules() {
  const context = require.context('./modules', false, /([a-z_]+)\.js$/i)

  const modules = context
    .keys()
    .map(key => ({ key, name: key.match(/([a-z_]+)\.js$/i)[1] }))
    .reduce(
      (modules, { key, name }) => ({
        ...modules,
        [name]: context(key).default,
      }),
      {}
    )

  return { context, modules }
}

const { modules } = loadModules()

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
})
