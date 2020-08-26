import { resolve } from 'path';

/**
 * Register the module.
 *
 * @param {object} moduleOptions
 */
export default function NewsletterModule(moduleOptions = {}) {
    const hatchlyOptions = {
        ...this.options.hatchly || {},
    };

    const options = {
        baseURL: process.env.API_URL,
        browserBaseURL: process.env.API_URL_BROWSER,
        ...hatchlyOptions,
        ...moduleOptions,
        ...(this.options.hatchly || {}).newsletter || {},
    };

    nuxt.options.publicRuntimeConfig.hatchly = {
        ...nuxt.options.publicRuntimeConfig.hatchly,
        newsletter: {
            ...options,
            ...nuxt.options.publicRuntimeConfig.hatchly,
            ...(nuxt.options.publicRuntimeConfig.hatchly && nuxt.options.publicRuntimeConfig.hatchly.newsletter),
        },
    };

    nuxt.options.privateRuntimeConfig.hatchly = {
        ...nuxt.options.privateRuntimeConfig.hatchly,
        newsletter: {
            ...options,
            ...nuxt.options.privateRuntimeConfig.hatchly,
            ...(nuxt.options.privateRuntimeConfig.hatchly && nuxt.options.privateRuntimeConfig.hatchly.newsletter),
        },
    };

    this.addTemplate({
        src: resolve(__dirname, './logger.js'),
        fileName: './hatchly-newsletter/logger.js',
    });

    const { dst } = this.addTemplate({
        src: resolve(__dirname, './plugin.js'),
        fileName: './hatchly-newsletter/plugin.js',
        options,
    });

    this.options.plugins.push(resolve(this.options.buildDir, dst));
}
