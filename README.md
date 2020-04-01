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
    apiBase: '',
},
```

Each option is described below.

### `apiBase`

> The url of your Hatchly site. This is should be updated in your .env rather than hardcoding a value here.

- Default: `process.env.API_BASE`
- Type: `string`

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
