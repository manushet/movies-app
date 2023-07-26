<template>
    <div id="b-toaster-top-right" class="b-toaster b-toaster-top-right">
        <div class="b-toaster-slot vue-portal-target">
            <div id="__BVID__637__toast_outer" role="alert" aria-live="assertive" aria-atomic="true" class="b-toast b-toast-solid b-toast-prepend b-toast-danger">
                <div id="__BVID__637" tabindex="0" class="toast">
                    <header class="toast-header">
                        <strong class="mr-2">Variant danger</strong>
                        <button type="button" aria-label="Close" class="close ml-auto mb-1">×</button>
                    </header>
                    <div class="toast-body">Toast body content</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ToastNotification',
    compatConfig: { MODE: 2 },
    computed: {
        ...mapGetters(['messagePool']),
    },
    watch: {
        messagePool: "makeToastNotification",
    },
    methods: {
        makeToastNotification({ variant, title, msg }) {
            this.$bvToast.toast(msg, {
                variant,
                title,
                solid: true,
                appendToast: true,
                noAutoHide: true,
                autoHideDelay: 15000
            });
        }
    }    
}
</script>

<style>

</style>