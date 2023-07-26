<template> 
    <div class="movie-info-wrap">
        <header class="movie-info-header">
            <h6 class="movie-header-title">Movie Details</h6>
            <span class="close-icon" @click="closeModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
        </header>
        <div class="movie-info-content">
            <b-row>
                <b-col sm="4">
                    <div class="movie-poster-wrap">
                        <div class="movie-poster" :style="posterStyle"></div>
                    </div>
                </b-col>
                <b-col sm="8">
                    <h3 class="movie-title">{{ movie.Title }}</h3>
                    <b-form-rating
                        id="rating-readonly"
                        class="movie-rating" 
                        :value="movie.imdbRating" 
                        readonly
                        show-value
                        show-value-max
                        no-border
                        stars="10" 
                        precision="1">
                    </b-form-rating>
                    <p class="movie-description">{{ movie.Plot }}</p>                 
                    <div class="mt-3 mb-3">
                        <b-badge variant="success" class="mr-2">{{ movie.Year }}</b-badge>
                        <b-badge variant="success" class="mr-2">{{ movie.Runtime }}</b-badge>
                        <b-badge variant="success" class="mr-2">{{ movie.Genre }}</b-badge>
                        <b-badge variant="success" class="mr-2">{{ movie.Language }}</b-badge>
                    </div>
                    <table class="table small">
                        <tbody>
                            <tr>
                                <th>Production</th>
                                <td>{{ movie.Production }}</td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td>{{ movie.Country }}</td>
                            </tr>
                            <tr>
                                <th>Director</th>
                                <td>{{ movie.Director }}</td>
                            </tr>
                            <tr>
                                <th>Writer</th>
                                <td>{{ movie.Writer }}</td>
                            </tr>
                            <tr>
                                <th>Actors</th>
                                <td>{{ movie.Actors }}</td>
                            </tr>
                            <tr>
                                <th>Awards</th>
                                <td>{{ movie.Awards }}</td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
//
export default {
    name: "MovieItemDetails",
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        defaultPosterBg:
            "linear-gradient(45deg,rgb(0, 3, 38) 0%,rgb(82, 15, 117) 100%)"
    }),
    computed: {
        posterStyle() {
            return {
                "background-image": this.posterBg
            };
        },
        posterBg() {
            return this.movie ? `url(${this.movie.Poster})` : this.defaultPosterBg;
        }
    },
    methods: {
        closeModal() {
            this.$emit("closeModal");
        }
    }
};
</script>

<style scoped>

.movie-info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
    color: #fff;
}

.movie-header-title {
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1.25rem;
}

.movie-info-content {
    padding: 1rem;
    background-color: #fff;
}

.movie-poster-wrap {
    position: relative;
    padding-bottom: 150%;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.2s ease;
}

.movie-poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
}

.movie-title {
    font-size: 3.5rem;
    font-weight: 300;
    line-height: 1.2;
}

.movie-rating {
    padding: 0;
    margin: 1em 0;
}

.movie-rating:focus {
    box-shadow: none;
}

.movie-rating>>>.b-rating-star,
.movie-rating>>>.b-rating-value {
    justify-content: flex-start;
    flex-grow: 0 !important;
    font-size: 1.3rem;
    font-weight: 300;
    padding: 0;
}

.movie-rating>>>.b-rating-star+.b-rating-star {
    margin-left: 0.75em;
}

.movie-rating>>>.b-rating-value {
    margin-left: 1em;
}

.movie-rating>>>.b-rating-star .b-rating-icon {
    color: #ffc107;
}

.movie-description {
    font-size: 1.25rem;
    font-weight: 300;
}

.mr-2 {
    margin-right: 0.45em;
}

.badge-success {
    color: #fff;
    background-color: #28a745;
}

.close-icon {
    font-size: 24px;
    cursor: pointer;
}
</style>