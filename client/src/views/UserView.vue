
<script setup lang="ts">
import { ref, computed } from 'vue';
import { getSession } from '../model/session'
import { getUsers, type User, users, remove } from '@/model/users';

</script>

<template>
    <button class="button is-primary ml-4 mt-4">
        <span class="icon">
            <i class="fas fa-plus"></i>
        </span>
        <span>
            Add User
        </span>
    </button>

    <div class="table-container">
        <table class="table is-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Admin?</th>
                    <th>Edit</th>
                </tr>
            </thead>

            <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.id }}</td>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                    <button @click="remove(index)">
                        <span class="icon is-small is-right">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                    <button>
                        <span class="icon is-small is-right">
                            <i class="fas fa-edit"></i>
                        </span>
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
button {
    margin: .5rem;
}
</style>
