let config = {};

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
                return this.$axios.$post(`${ config.apiURL }/_newsletter`, data, {
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
 * @param {object} context
 * @param {object} context.app
 * @param {object} context.$config
 *
 * @returns {Promise<void>}
 */
export default async function({ app, $config }) {
    config.baseURL = $config.hatchly.newsletter.browserBaseURL || $config.hatchly.newsletter.baseURL;

    config.apiURL = process.server
        ? $config.hatchly.newsletter.baseURL
        : config.baseURL;

    registerStoreModule(app.store);
};
