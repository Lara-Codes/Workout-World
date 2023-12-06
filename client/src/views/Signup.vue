<script setup lang="ts">
    import { useSignup } from '@/model/session'
    import { ref } from 'vue';

    const {signup} = useSignup()

    const email = ref('')
    const password = ref('')
    const firstName = ref('')
    const lastName = ref('')

    const doSignup = () => {
        signup(email.value, password.value, firstName.value, lastName.value)
    }


</script>

<template>
    <div class="columns">
        <div class="column is-half mt-4 ml-4">
        <h1>SIGNUP</h1>
        <div class="column is-half is-centered">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="Username or Email" v-model="email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="name" placeholder="First Name" v-model="firstName">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="name" placeholder="Last Name" v-model="lastName">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button is-success" @click.prevent="doSignup" >
                        Signup
                    </button>
                </p>
            </div>
        </div>
    </div>
</div>
</template>