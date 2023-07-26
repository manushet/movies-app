<template>
    <b-container fluid="lg">
        <h3 class="list-title">{{ pageTitle }}</h3>
        <b-row>
            <template v-if="isEmptyList">
                <div>No data available...</div>
            </template>
            <template v-else>
                <b-col sm="12" md="6" lg="4" xl="3" v-for="(movie, key) in list" :key="key"
                    @mouseover="onMouseOver(movie.Poster)">
                    <MovieItem :movie="movie" @onItemDelete='onItemDelete' @openMovieDetailsModal='onOpenMovieDetailsModal'/>
                </b-col>
            </template>
        </b-row>
    </b-container>
    <b-modal 
        class='modal-movie-details'
        size="lg" 
        :id="movieDetailsModalID" 
        hide-footer
        hide-header>
        <MovieItemDetails :movie='selectedMovie' @closeModal='onModalClose'/>
    </b-modal>
</template>

<script>
import MovieItem from './MovieItem.vue';
import MovieItemDetails from './MovieItemDetails.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'MoviesList',
    components: {
        MovieItem,
        MovieItemDetails
    },
    compatConfig: { MODE: 2 },
    data: () => ({
        movieDetailsModalID: 'modal-details',
        selectedMovie: {}
    }),
    props: {
        list: {
            type: Object,
            default: () => ({})
        },
    },
    methods: {
        ...mapActions("movies", ["removeMovie", "fetchMovieByID"]),
        ...mapActions(["showNotification"]),
        onMouseOver(poster) {
            this.$emit("changePoster", poster);
        },
        async onItemDelete({ imdbID, title }) {
            const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure to delete the movie "${title}"?`);
            if (isConfirmed) {
                this.removeMovie(imdbID);
                this.showNotification({
                    msg: 'The movie has been successfully removed!',
                    title: 'Success',
                    variant: 'success'
                });
            }
        },
        async onOpenMovieDetailsModal(imdbID) {
            this.selectedMovie = await this.fetchMovieByID(imdbID);
            console.log(this.selectedMovie);
            this.$bvModal.show(this.movieDetailsModalID);
        },  
        onModalClose() {
            this.$bvModal.hide(this.movieDetailsModalID);
        }
    },
    computed: {
        ...mapGetters("movies", ["isSearchResults"]),
        isEmptyList() {
            return !Object.keys(this.list).length;
        },
        pageTitle() {
            return this.isSearchResults ? 'Search Results' : 'IMDB Top 250';
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.modal-body {
    padding: 0!important;
}
.list-title {
    font-size: 50px;
    margin-bottom: 30px;
    color: #fff;
    padding: 1.5em 0 1em;
    text-transform: uppercase;
}
</style>