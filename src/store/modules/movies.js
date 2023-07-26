import axios from '@/plugins/axios';
import IDs from '@/store/mock/omdb';
import mutations from '@/store/mutations';

function serializeMovies(data) {
    return data.reduce((acc, movie) => {
        acc[movie.imdbID] = movie;
        return acc;
    }, {});
}

const {MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_TITLE} = mutations;

const movieStore = {
    namespaced: true,
    state: {
        moviesIDs: IDs,
        currentPage: 1,
        moviesPerPage: 12,
        moviesList: {},
        isSearchResults: false
    },
    getters: {
        moviesSliceIDs: ({moviesIDs}) => (from, to) => moviesIDs.slice(from, to),
        currentPage: ({currentPage}) => currentPage,
        moviesPerPage: ({moviesPerPage}) => moviesPerPage,
        moviesList: ({moviesList}) => moviesList,
        moviesCount: ({moviesIDs}) => moviesIDs.length,
        isSearchResults: ({isSearchResults}) => isSearchResults,
    },
    mutations: {
        [MOVIES](state, value) {
            state.moviesList = value;
        },
        [CURRENT_PAGE](state, value) {
            state.currentPage = value;
        },   
        [REMOVE_MOVIE](state, id) {
            state.moviesIDs = state.moviesIDs.filter(item => {
                return item !== id;
            });
        }, 
        [TOGGLE_TITLE](state, isSearch) {
            state.isSearchResults = isSearch;
        },                       
    },
    actions: {
        /*
        initMoviesStore: {
            handler({dispatch}) {
                dispatch("fetchMovies");
            },
            root: true,
        },
        */
        async fetchMovies({getters, commit, dispatch}) {
            dispatch('toggleLoader', true, {root: true});
            try {
                const {currentPage, moviesPerPage, moviesSliceIDs} = getters;
                const from = currentPage * moviesPerPage - moviesPerPage;
                const to = currentPage * moviesPerPage;
                const moviesToFetch = moviesSliceIDs(from, to);
                
                const requests = moviesToFetch.map(id => {
                    const config = {
                        method: 'get',
                        url: `/?i=${id}`,
                    };
                    return axios.request(config);
                });
                const response = await Promise.all(requests);
                const moviesSlice = serializeMovies(response);
                commit(MOVIES, moviesSlice);
            }
            catch(e) {
                console.log(e);
            }
            finally {
                dispatch('toggleLoader', false, {root: true});
            }
        },
        async fetchMovieByID({dispatch}, imdbID) {
            dispatch('toggleLoader', true, {root: true});
            try {               
                const config = {
                    method: 'get',
                    url: `/?i=${imdbID}`,
                };
                return await axios.request(config);
            }
            catch(e) {
                dispatch(
                    'showNotification', 
                    {
                        msg: e.message,
                        title: 'An error has occured!',
                        variant: 'danger',
                    }, 
                    {root: true}
                );
            }
            finally {
                dispatch('toggleLoader', false, {root: true});
            }
        },
        changeCurrentPage({commit, dispatch}, page) {
            commit(CURRENT_PAGE, page);
            dispatch("fetchMovies");
        },
        removeMovie({commit, dispatch}, imdbID) {
            commit(REMOVE_MOVIE, imdbID);
            dispatch("fetchMovies");
        },
        async searchMovie({commit, dispatch}, query) {
            try {
                dispatch('toggleLoader', true, {root: true});
                
                const config = {
                    method: 'get',
                    url: `/?s=${query}`,
                };
                const response = await axios.request(config);
                if (response.Response === "True") {
                    const searchResults = response.Search;
                    console.log(searchResults);   
                    const moviesSlice = serializeMovies(searchResults);
                    console.log(moviesSlice);   
                    commit(MOVIES, moviesSlice);                    
                } 
                else {
                    if (response.Error) {
                        throw new Error(response.Error);  
                    }
                }        
            }
            catch(e) {
                dispatch(
                    'showNotification', 
                    {
                        msg: e.message,
                        title: 'An error has occured!',
                        variant: 'danger',
                    }, 
                    {root: true}
                );
            }
            finally {
                dispatch('toggleLoader', false, {root: true});
            }
        },
        toggleTitle({commit}, isSearch) {
            commit(TOGGLE_TITLE, isSearch);     
        }
    }
};

export default movieStore;