<template>
    <div class="overflow-auto movies-pagination">
        <b-pagination
        v-model="currentPageModel" 
        :total-rows="total" 
        :per-page="perPage" 
        prev-text="Prev"
        next-text="Next">
        </b-pagination>
    </div>
</template>

<script>
export default {
    name: 'MoviesPagination',
    compatConfig: { MODE: 2 },
    props: {
        currentPage: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 1
        },
        perPage: {
            type: Number,
            default: 1
        }
    },  
    data: () => ({}),
    methods: {
    },
    computed: {
        currentPageModel: {
            get() {
                return this.currentPage;
            },
            set(page) {
                this.$emit("PageChanging", page);
            },
        }
    },
}
</script>

<style scoped>
    .movies-pagination {
        margin-top: 30px;
    }

    .movies-pagination>>>.pagination {
        justify-content: center;
    }    

    .movies-pagination>>>.pagination .page-item .page-link {
        background-color: transparent;
        font-size: 12px;
        color: #fff;
        box-shadow: none;
    }

    .movies-pagination>>>.pagination .page-item.active .page-link {
        border-color: #fff;
        background-color: #fff;
        color: #000;
    }

    .movies-pagination>>>.pagination .page-item.disabled .page-link {
        color: lightgray;
    }
</style>