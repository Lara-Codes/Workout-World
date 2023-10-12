<script setup lang="ts">
    import { getSession, login } from '@/model/session'
    const session = getSession()
</script>

<template>
    <!-- v-if vs v-show: if user, show this. else show this. -->
    <div class = "has text-right" v-if="session.user"> 
        Welcome, {{ session.user.firstName }} {{ session.user.lastName }} <br>
        <small>{{ session.user.email }}
        <a class="button is-small is-light is-error">
            <span class="icon">
                <i class="fas fa-sign-out-alt"></i>
            </span>
        </a>
        </small>

    </div>
    <div class = "buttons" v-else>
        <a class = "button is-primary">
            <strong>Sign up</strong>
        </a>
        <a class = "button is-light" @click.prevent="login">
            Log In
        </a>
    </div>
</template>

<style scoped></style>