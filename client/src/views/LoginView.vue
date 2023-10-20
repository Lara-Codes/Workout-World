<script setup lang="ts">
    import { getSession, useLogin } from '@/model/session'

    import { ref } from 'vue';
    const session = getSession()
    const { login } = useLogin()

    const email = ref('')
    const password = ref('')

    const credentials = ref([] as {email: string, password: string}[])

    const doLogin = () => {
        // login('hbingley1@plala.or.jp', 'CQutx25i8r')
        login(email.value, password.value)
    }

    function addCredentials(){
        credentials.value.push({email: email.value, password: password.value})
        email.value = ''
        password.value=''
    }

</script>

<template>
    <div class="columns">
        <div class="column is-half mt-4 ml-4">
        <h1>LOGIN</h1>
        <div class="column is-half is-centered">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="Email" v-model="email">
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
                <p class="control">
                    <button class="button is-success" @click.prevent="doLogin" >
                        Login
                    </button>
                </p>
            </div>
        </div>
    </div>
</div>
</template>