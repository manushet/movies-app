import { createStore } from 'vuex';
import movies from './modules/movies';
import loader from './modules/loader';
import notifications from './notifications';

const store = createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        movies,
        loader,
        notifications
    }
});

//store.dispatch("initMoviesStore");

export default store;