# Nuxt Hatchly Newsletter Module

> Module to easily integrate with the Hatchly Newsletter module

## Installation

```bash
yarn add @hatchly/nuxt-newsletter-module
```

Register the module in your nuxt applications config file:

```js
module.exports = {
    // Nuxt config
    modules: {
        // Other Modules
        ['@hatchly/nuxt-newsletter-module', {
            // Options
        }],
    },

    hatchly: {
        newsletter: {
            // Options can also be defined here
        },
    },
};
```

Add the API url to your .env:

```
API_BASE=http://my-application.localhost
```

## Options

The options object can contain the following values: 

```js
{
    baseURL: '',
    browserBaseURL: '',
},
```

Each option is described below.

### `baseURL`

> The url of your Hatchly site. If `browserBaseURL` is not provided this url will be used for both server side and client side fetching.

- Default: `process.env.API_URL`
- Type: `string`

### `browserBaseURL`

> The public url of your Hatchly site. 

- Default: `process.env.API_URL_BROWSER`
- Type: `string`

### Runtime config

If using nuxt runtime config to inject env variables at runtime, each of the above options can be overwritten in both `publicRuntimeConfig` and `privateRuntimeConfig` objects, for example:

```js
module.exports = {
    publicRuntimeConfig: {
        hatchly: {
            // Inherit options for all hatchly modules
            baseURL: process.env.API_URL,
            
            newsletter: {
                // Overwrite options for the newsletter module
                baseURL: process.env.API_URL,
            },
        },    
    },
};
```

## Usage

This module will register a Vuex module for interacting with the newsletter api, and provides a vuex action for you to call within your application:

```vue
<template>
    <form @submit.prevent="handleSubmit">
        <input type="email" v-model="formData.email">
    </form>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'newsletter-form',

        data() {
            return {
                formData: {
                    email: '',
                },            
            };
        },

        methods: {
            ...mapActions('newsletter', ['subscribe']),

            async handleSubmit() {
                try {
                    await this.subscribe(this.formData);
                } catch (e) {
                    // Handle errors
                }   
            },
        },
    };
</script>
```
