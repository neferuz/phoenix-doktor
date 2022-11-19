// export const state = () => ({
//   categories: [],
//   regions: [],
//   clinics: [],
//   analyzes: [],
//   directions: [],
//   services: [],
//   otherAnalyzes: [],
//   otherServices: [],
//   userData: {},
// });

// export const mutations = {
//   setCategories(state, categories) {
//     state.categories = categories.data
//   },
//   setUserData(state, data) {
//     if (!data || !data.id) state.userData = {};
//     else state.userData = data;
//   },
// };

// export const actions = {
//   async getCategories({ commit }) {
//     const response = await this.$axios.get("/categories");
//     commit("setCategories", response.data);
//   },
//   setUserData({ commit }, data) {
//     commit("setUserData", data);
//   },
// };

// import { cloneDeep, groupBy } from "lodash-es";
// import { sortCompareFunction } from "~/plugins/custom.js";

// function nestByParentId(parents, dataArr) {
//   for (let p of parents) {
//     let children = dataArr.filter((x) => x.parent_id == p.id);
//     if (!!children.length) {
//       children = nestByParentId(children, dataArr);
//     }
//     p.children = children;
//   }

//   return parents;
// }

// export const getters = {
//   isEmptyState: (s) => {
//     if (!s.regions.length) return true;
//     if (!s.analyzes.length) return true;
//     if (!s.directions.length) return true;
//     if (!s.services.length) return true;
//     return false;
//   },
//   nestedRegions: (s) => (i18n) => {
//     let clonedRegions = cloneDeep(s.regions);
//     let arr = clonedRegions.filter((x) => x.parent_id == null);

//     let name = i18n.locale == "ru" ? "name" : "name_uz";
//     for (let p of arr) {
//       let children = clonedRegions.filter((x) => x.parent_id == p.id);
//       p.children = children.sort(sortCompareFunction(name)) || [];
//     }
//     return arr;
//   },
//   nestedServices: (s) => (i18n) => {
//     let cServices = cloneDeep(s.services);

//     let name = i18n.locale == "ru" ? "name" : "name_uz";
//     cServices = cServices.sort(sortCompareFunction(name));

//     let firstParents = cServices.filter((x) => x.parent_id == null);

//     let arr = nestByParentId(firstParents, cServices);
//     return arr;
//   },
//   nestedDoctors: (s) => (i18n) => {
//     let cDocors = cloneDeep(s[0])
//     let name = i18n.locale == "ru" ? "name" : "name_uz";
    
//     return 
//   },
//   nestedAnalyzes: (s) => (i18n) => {
//     let cAnalyzes = cloneDeep(s.analyzes);

//     let name = i18n.locale == "ru" ? "name" : "name_uz";
//     cAnalyzes = cAnalyzes.sort(sortCompareFunction(name));

//     let firstParents = cAnalyzes.filter((x) => x.parent_id == null);

//     let arr = nestByParentId(firstParents, cAnalyzes);
//     return arr;
//   },
//   nestedDirections: (s) => (i18n) => {
//     let name = i18n.locale == "ru" ? "name" : "name_uz";
//     let cDirections = cloneDeep(s.directions);
//     cDirections = cDirections.sort(sortCompareFunction(name));

//     let grouped = groupBy(cDirections, (itt) => itt[name].slice(0, 1));

//     return grouped;
//   },
//   nestedOtherAnalyzes: (s) => (i18n) => {
//     let cOtherAnalyzes = cloneDeep(s.otherAnalyzes);
//     let cAnalyzes = cloneDeep(s.analyzes);

//     let name = i18n.locale == "ru" ? "name" : "name_uz";
//     cOtherAnalyzes = cOtherAnalyzes.sort(sortCompareFunction(name));
//     cAnalyzes = cAnalyzes.sort(sortCompareFunction(name));

//     let arr = nestByParentId(cOtherAnalyzes, cAnalyzes);
//     return arr;
//   },
//   nestedOtherServices: (s) => (i18n) => {
//     let cOtherServices = cloneDeep(s.otherServices);
//     let cServices = cloneDeep(s.services);

//     let name = i18n.locale == "ru" ? "name" : "name_uz";
//     cOtherServices = cOtherServices.sort(sortCompareFunction(name));
//     cServices = cServices.sort(sortCompareFunction(name));

//     let arr = nestByParentId(cOtherServices, cServices);
//     return arr;
//   },
//   regions: (s) => {
//     let cRegions = cloneDeep(s.regions);
//     return cRegions;
//   },
//   clinics: (s) => {
//     let cClinics = cloneDeep(s.clinics);
//     return cClinics;
//   },
//   directions: (s) => {
//     let cDirections = cloneDeep(s.directions);
//     return cDirections;
//   },
//   services: (s) => {
//     // TODO: sort by popularity
//     let cServices = cloneDeep(s.services);
//     return cServices;
//   },
//   analyzes: (s, getters) => {
//     // TODO: sort by popularity
//     let cAnalyzes = cloneDeep(s.analyzes);
//     return cAnalyzes;
//   },
//   otherAnalyzes: (s, getters) => {
//     let cOtherAnalyzes = cloneDeep(s.otherAnalyzes);
//     return cOtherAnalyzes;
//   },
//   otherServices: (s, getters) => {
//     let cOtherServices = cloneDeep(s.otherServices);
//     return cOtherServices;
//   },
//   getServiceById: (s) => (id) => {
//     let serv = cloneDeep(s.otherServices).find((x) => x.id == id);
//     if (serv) return serv;
//     return cloneDeep(s.services).find((x) => x.id == id);
//   },
//   getAnalyzeById: (s) => (id) => {
//     let anl = cloneDeep(s.otherAnalyzes).find((x) => x.id == id);
//     if (anl) return anl;
//     return cloneDeep(s.analyzes).find((x) => x.id == id);
//   },
//   getDirectionById: (s) => (id) => {
//     return cloneDeep(s.directions).find((x) => x.id == id);
//   },
//   getDirectionsByIds: (s) => (ids) => {
//     return cloneDeep(s.directions).filter((x) => ids.includes(x.id));
//   },
//   getServiceBySlug: (s) => (slug) => {
//     let serv = cloneDeep(s.otherServices).find((x) => x.url == slug);
//     if (serv) return serv;
//     return cloneDeep(s.services).find((x) => x.url == slug);
//   },
//   getAnalyzeBySlug: (s) => (slug) => {
//     let anl = cloneDeep(s.otherAnalyzes).find((x) => x.url == slug);
//     if (anl) return anl;
//     return cloneDeep(s.analyzes).find((x) => x.url == slug);
//   },
//   getDirectionBySlug: (s) => (slug) => {
//     return cloneDeep(s.directions).find((x) => x.url == slug);
//   },
//   extensiveSearch: (s) => (value, i18n) => {
//     if (!value.length || value.length < 3) return [];
//     // let regex = new RegExp("^" + value, "gi");
//     let regex = new RegExp(value, "gi");
//     let name = i18n.locale == "ru" ? "name" : "name_uz";

//     let cAnalyzes = cloneDeep(s.analyzes).filter(
//       (x) => !parseInt(x.is_folder, 10)
//     );
//     let filteredAnalyzes = cAnalyzes
//       .filter((x) => x[name].match(regex))
//       .map((x) => ((x.mark = "analyze"), x));

//     let cServices = cloneDeep(s.services).filter(
//       (x) => !parseInt(x.is_folder, 10)
//     );
//     let filteredServices = cServices
//       .filter((x) => x[name].match(regex))
//       .map((x) => ((x.mark = "service"), x));

//     let filteredDirections = cloneDeep(s.directions)
//       .filter((x) => x[name].match(regex))
//       .map((x) => ((x.mark = "direction"), x));

//     let cСlinics = cloneDeep(s.clinics).filter(
//       (x) => !parseInt(x.parent_id, 10)
//     );
//     let filteredСlinics = cСlinics
//       .filter((x) => x[name].match(regex))
//       .map((x) => ((x.mark = "clinic"), x));

//     let result = [
//       ...filteredAnalyzes,
//       ...filteredServices,
//       ...filteredDirections,
//       ...filteredСlinics,
//     ];

//     return result;
//   },
//   analyzeSearch: (s) => (value, i18n) => {
//     if (!value.length || value.length < 3) return [];
//     let cAnalyzes = cloneDeep(s.analyzes).filter(
//       (x) => !parseInt(x.is_folder, 10)
//     );
//     let regex = new RegExp(value, "gi");

//     let name = i18n.locale == "ru" ? "name" : "name_uz";

//     let filteredAnalyzes = cAnalyzes.filter((x) => x[name].match(regex));
//     return filteredAnalyzes;
//   },
//   serviceSearch: (s) => (value, i18n) => {
//     if (!value.length || value.length < 3) return [];
//     let cServices = cloneDeep(s.services).filter(
//       (x) => !parseInt(x.is_folder, 10)
//     );
//     let regex = new RegExp(value, "gi");

//     let name = i18n.locale == "ru" ? "name" : "name_uz";

//     let filteredServices = cServices.filter((x) => x[name].match(regex));
//     return filteredServices;
//   },
//   directionSearch: (s) => (value, i18n) => {
//     if (!value.length || value.length < 3) return [];
//     let cDirections = cloneDeep(s.directions);
//     let regex = new RegExp(value, "gi");

//     let name = i18n.locale == "ru" ? "name" : "name_uz";

//     let filteredDirections = cDirections.filter((x) => x[name].match(regex));
//     return filteredDirections;
//   },
//   getUserData: (s) => {
//     return s.userData;
//   },
//   isUserRegistered: (s) => {
//     if (s.userData && s.userData.id) return true;
//     return false;
//   },
// };

import Vuex from 'vuex';
import category from './category/index'
import auth from './auth/index'

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      category,
      auth,
    }
  });
};

export default createStore