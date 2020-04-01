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
        apiBase: process.env.API_BASE,
        ...hatchlyOptions,
        ...moduleOptions,
        ...(this.options.hatchly || {}).newsletter || {},
    };

    this.addTemplate({
        src: resolve(__dirname, './logger.js'),
        fileName: './hatchly-newsletter/logger.js',
    });

    const plugin = this.addTemplate({
        src: resolve(__dirname, './plugin.js'),
        fileName: './hatchly-newsletter/plugin.js',
        options,
    });

    this.options.plugins.push(resolve(this.options.buildDir, plugin.dst));
}
