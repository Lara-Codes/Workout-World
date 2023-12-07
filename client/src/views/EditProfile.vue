<script setup lang="ts">
    import { getSession, useEdit } from '@/model/session'

    import { ref } from 'vue';
    const session = getSession()
    const { edit } = useEdit()

    const ogemail = ref(session.user?.email)

    const email = ref('')
    const password = ref('')
    const firstName = ref('')
    const lastName = ref('')

    const doEdit = () => {
        edit(ogemail.value, email.value, password.value, firstName.value, lastName.value)
    }

</script>

<template>
    <div class="columns">
        <div class="column is-half mt-4 ml-4">
        <h1>Edit Profile Data</h1>
        <div class="column is-half is-centered">
            <div class="field">
                <label for="emailInput" class="label" style="color: rgb(149, 149, 149)"><em>Username or Email</em></label>
                <p class="control has-icons-left has-icons-right">
                    <input class="input" id="emailInput" type="email" :placeholder="session.user?.email || 'Username or Email'"  v-model="email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <label for="pass" class="label" style="color: rgb(149, 149, 149)"><em>Password</em></label>
                <p class="control has-icons-left">
                    <input id="pass" class="input" type="password" :placeholder="session.user?.password || 'Password'" v-model="password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <label for="fname" class="label" style="color: rgb(149, 149, 149)"><em>First Name</em></label>
                <p class="control has-icons-left">
                    <input id = "fname" class="input" type="name" :placeholder="session.user?.firstName || 'First Name'" v-model="firstName">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <label for="lname" class="label" style="color: rgb(149, 149, 149)"><em>Last Name</em></label>
                <p class="control has-icons-left">
                    <input id = "lname" class="input" type="name" :placeholder="session.user?.lastName || 'Last Name'" v-model="lastName">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button is-success" @click.prevent="doEdit" >
                        Update Profile
                    </button>
                </p>
            </div>
        </div>
    </div>
</div>
</template>