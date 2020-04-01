/**
 * Register the Vuex module for interacting with the newsletter module.
 *
 * @param {object} store
 */
const registerStoreModule = (store) => {
    store.registerModule('newsletter', {
        namespaced: true,

        actions: {
            /**
             * Subscribe to the newsletter.
             *
             * @param {object} context
             * @param {object} data
             *
             * @returns {Promise}
             */
            subscribe(context, data) {
                return this.$axios.$post('<%- options.apiBase %>/_newsletter', data, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                });
            },
        },
    });
};

/**
 * Setup the plugin.
 *
 * @param {object} app
 *
 * @returns {Promise<void>}
 */
export default async function({ app }) {
    registerStoreModule(app.store);
};
