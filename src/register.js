import Vue from "vue";

// register components
const ComponentChildrens = require.context(
  "./components/Global",
  false,
  /[\w-]+\.vue$/
);
ComponentChildrens.keys().forEach(fileName => {
  const componentConfig = ComponentChildrens(fileName);
  const componentName = fileName.replace(/^\.\//, "").replace(/\.\w+$/, "");
  Vue.component(componentName, componentConfig.default || componentConfig);
});

// register vuex modules
const ModuleChildrens = require.context("./store/modules", false, /\.js$/);
const modules = {};
ModuleChildrens.keys().forEach(fileName => {
  if (fileName === "./index.js") return;
  const moduleName = fileName.replace(/(\.\/|\.js)/g, "");
  modules[moduleName] = ModuleChildrens(fileName).default;
});

export { modules };
