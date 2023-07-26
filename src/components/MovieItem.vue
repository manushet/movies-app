<template>
    <div class="movie-item mb-3">
        <div class="movie-item-poster" :style="posterBg"></div>
        <div class="movie-info-wrap d-flex flex-column justify-content-between">
            <div class="movie-item-info">
                <h3 class="movie-title">{{ movie.Title }}</h3>
                <span class="movie-year">{{ movie.Year }}</span>
            </div>
            <div class="movie-item-controls row no-gutters">
                <div class="col pr-2">
                    <b-button size="md" block variant="outline-light" @click='showMovieDetails'>Details</b-button>
                </div>
                <div class="col pl-2">
                    <b-button size="md" block variant="outline-light" @click='itemDelete'>Remove</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MovieItem",
    compatConfig: { MODE: 2 },
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
    computed: {
        posterBg() {
            return {
                "background-image": `url(${this.movie.Poster})`
            };
        }
    },
    methods: {
        itemDelete() {
            this.$emit("onItemDelete", { 
                    imdbID: this.movie.imdbID, 
                    title: this.movie.Title
                }
            );
        },
        showMovieDetails() {
            this.$emit('openMovieDetailsModal', this.movie.imdbID);
        },
    }
};

/*

{
    "Title": "Escape Plan",
    "Year": "2013",
    "Rated": "R",
    "Released": "18 Oct 2013",
    "Runtime": "115 min",
    "Genre": "Action, Thriller",
    "Director": "Mikael Håfström",
    "Writer": "Miles Chapman, Jason Keller",
    "Actors": "Sylvester Stallone, Arnold Schwarzenegger, 50 Cent",
    "Plot": "Ray Breslin is a man who has devoted his life to making prisons inescapable by going into a prison as an inmate and trying to see if he can break out. And he has done a good job so far. A woman who says she works for the CIA approaches Ray and says that a new maximum security prison where the worst criminals are to be incarcerated, is about to be launched. So she wants him to go and make sure no one can get out. He agrees. So they make the necessary preps but when Ray arrives at the prison, he discovers that someone doesn't want him to get out. He then tries to find a way out but he needs help. Another prisoner, Rottmeyer becomes friendly with him. And they decide to work together to get out.",
    "Language": "English, German, Arabic, Urdu",
    "Country": "United States",
    "Awards": "2 nominations",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTk3OTcxMTEyNl5BMl5BanBnXkFtZTcwMDQ4MjQ2OQ@@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "6.7/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "50%"
        },
        {
            "Source": "Metacritic",
            "Value": "49/100"
        }
    ],
    "Metascore": "49",
    "imdbRating": "6.7",
    "imdbVotes": "250,365",
    "imdbID": "tt1211956",
    "Type": "movie",
    "DVD": "04 Feb 2014",
    "BoxOffice": "$25,135,965",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
}
*/

</script>

<style scoped>
.movie-item {
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.2s ease;
    height: 400px;
}

.movie-item:hover {
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
}

.movie-item-poster {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: -1;
}

.movie-info-wrap {
    padding: 20px 10px;
    height: 100%;
    opacity: 0;
    transition: all 0.2s ease;
}

.movie-title {
    font-size: 20px;
    color: #fff;
}

.movie-year {
    font-size: 14px;
    color: #fff;
}

.movie-item:hover .movie-info-wrap {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.7);
}
</style>
