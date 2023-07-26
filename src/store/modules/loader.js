import mutations from '../mutations';

const {TOGGLE_LOADER} = mutations;

const loaderStore = {
    state: {
        showLoader: false,
    },
    getters: {
        showLoader: ({showLoader}) => showLoader,
    },
    mutations: {
        [TOGGLE_LOADER](state, val) {
            state.showLoader = val;
        }
    }, 
    actions: {
        toggleLoader({commit}, val) {
            commit(TOGGLE_LOADER, val);
        }
    }    
};

export default loaderStore; 