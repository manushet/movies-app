<template>
    <div>
        <b-navbar class="navbar navbar-dark bg-faded navbar-expand" type="dark" variant="dark">
            <b-container fluid="lg">
                <b-navbar-brand href="#">
                    Movie DB
                </b-navbar-brand>            
                <b-nav-form @submit='searchTextChanged'>
                    <b-form-input 
                        class="form-inline mr-sm-2 search-input" 
                        placeholder="Search"
                        debounce="500"
                        v-model='searchTextValue'>
                    </b-form-input>
                    <b-button 
                        variant="outline-light" 
                        class="my-2 my-sm-0" 
                        type="submit">
                        Search
                    </b-button>
                </b-nav-form>
            </b-container>
        </b-navbar>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'HeaderBar',
    compatConfig: { MODE: 2 },
    data: () => ({
        searchTextValue: null
    }),
    methods: {
        ...mapActions("movies", ["searchMovie", "fetchMovies", "toggleTitle"]),
        searchTextChanged(e) {
            e.preventDefault();
            if (this.searchTextValue) {
                this.toggleTitle(true);
                this.searchMovie(this.searchTextValue);
            }
            else {
                this.toggleTitle(false);
                this.fetchMovies();  
            }
        }
    }
}
</script>

<style scoped>
    .header {
        margin-bottom: 2em;
    }

    .navbar {
        background-color: rgba(0, 0, 0, 0.7);
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: justify;
        justify-content: space-between;        
    }

    .search-input {
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(0, 0, 0, 0.6);
    }

    .search-input:focus {
        box-shadow: none;
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(0, 0, 0, 0.6);
    }    
</style>