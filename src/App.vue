<template>
    <LoaderView />
    <PosterBG :poster="posterBG" />
    <HeaderBar/>
    <MoviesList :list="moviesList" @changePoster='onChangePoster' />
    <MoviesPagination :currentPage="currentPage" :perPage="moviesPerPage" :total="moviesCount"
        @PageChanging='onPageChange' />
    <ToastNotification/>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import MoviesList from './components/MoviesList.vue';
import PosterBG from './components/PosterBG.vue';
import MoviesPagination from './components/MoviesPagination.vue';
import LoaderView from './components/LoaderView.vue';
import ToastNotification from './components/ToastNotification.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'App',
    components: {
        HeaderBar,
        MoviesList,
        PosterBG,
        MoviesPagination,
        LoaderView,
        ToastNotification
    },
    compatConfig: { MODE: 2 },
    mounted() {
    },
    watch: {
        '$route.query': {
            handler: 'onPageQueryChange',
            immediate: true,
            deep: true,
        }
    },
    data: () => ({
        posterBG: "",
    }),
    computed: {
        ...mapGetters("movies", ["moviesList", "currentPage", "moviesPerPage", "moviesCount"]),
    },
    methods: {
        ...mapActions("movies", ["changeCurrentPage"]),
        onChangePoster(poster) {
            this.posterBG = poster;
        },
        onPageChange(page) {
            this.$router.push({ query: { page } });
        },
        onPageQueryChange({ page = 1 }) {
            this.changeCurrentPage(Number(page));
        },
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fafafa;
    margin-top: 0px;
    position: relative;
    min-height: 100vh;
}

.form-inline {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-align: center;
    align-items: center;
}
.mr-sm-2, .mx-sm-2 {
    margin-right: 0.5rem!important;
}
</style>