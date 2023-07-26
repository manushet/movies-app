import mutations from '@/store/mutations';

const {SHOW_TOAST_NOTIFICATION} = mutations;

const notificationStore = {
    state: {
        messagePool: []
    },
    getters: {
        messagePool: ({messagePool}) => messagePool[messagePool.length - 1],
    },
    mutations: {
        [SHOW_TOAST_NOTIFICATION](state, toast) {
            state.messagePool.push(toast);
            console.log(state.messagePool);
        }
    },
    actions: {
        showNotification({commit}, toast) {
            commit(SHOW_TOAST_NOTIFICATION, toast);           
        }
    }
}

export default notificationStore;