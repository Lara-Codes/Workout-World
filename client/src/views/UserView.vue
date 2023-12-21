
<script setup lang="ts">
import { getSession, userdata, useEditAsAdmin, useDelete } from '@/model/session'
// need to: retrieve data from database about users and display them 
import { ref, onMounted, computed } from 'vue';
const session = getSession()
import { useSignup } from '@/model/session'
const { signup } = useSignup()
const {edit} = useEditAsAdmin()
const {remove} = useDelete()

interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string; 
}

let userData = ref<Array<{ firstName: string; lastName: string; email: string; role: string, password: string }>>([]);
onMounted(async () => {
    try {
        const result = await userdata().data();
        userData.value = result
    } catch (error) {
        console.error(error);
    }
});

let show = ref(false);
let showEdit = ref(false);

const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const role = ref('')
let ogemail = ref(''); // for searching purposes

const userDataedit = ref({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: ''
});

const editUser = (user: User) => {
    ogemail.value = user.email; 
    userDataedit.value = ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        password: user.password
    });
}

const isFormValid = computed(() => {
    return email.value !== '' &&
        password.value !== '' &&
        firstName.value !== '' &&
        lastName.value !== '' &&
        role.value !== '';
});

const doSignup = () => {
    signup(email.value, password.value, firstName.value, lastName.value, role.value)
}

const newemail = ref('')
const newfname = ref('')
const newlname = ref('')
const newrole = ref('admin')
const newpass = ref('')

const resetFields = () => {
    newemail.value = '';
    newfname.value = '';
    newlname.value = '';
    newrole.value = 'admin'; // Set a default value for the role, change as needed
    newpass.value = '';
};

const doEdit = () => {
    edit(ogemail.value, newemail.value, newfname.value, newlname.value, newrole.value, newpass.value)

    const userIndex = userData.value.findIndex(user => user.email === ogemail.value);

    if (userIndex !== -1) {
        // Create a copy of the user object with existing values
        const currentUser = { ...userData.value[userIndex] };

        // Update the fields if they are not null or empty string
        if (newfname.value !== null && newfname.value !== '') {
            currentUser.firstName = newfname.value;
        }

        if (newlname.value !== null && newlname.value !== '') {
            currentUser.lastName = newlname.value;
        }

        if (newemail.value !== null && newemail.value !== '') {
            currentUser.email = newemail.value;
        }

        if (newrole.value !== null && newrole.value !== '') {
            currentUser.role = newrole.value;
        }

        if (newpass.value !== null && newpass.value !== '') {
            currentUser.password = newpass.value;
        }

        // Update the user data in the local array
        userData.value[userIndex] = currentUser;
        resetFields();
    }
}

const deleteUser = async (email: string) => {
    await remove(email)
    const index = userData.value.findIndex((user) => user.email === email);

    // If the user is found, remove it from the userData array
    if (index !== -1) {
        userData.value.splice(index, 1);
    } else {
        console.error('User not found in userData array');
    }
}

</script>

<template>
    <button class="button is-primary ml-4 mt-4" @click="show = !show">
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Admin?</th>
                    <th>Delete User</th>
                    <th>Edit</th>
                </tr>
            </thead>

            <tr v-for="(user, index) in userData" :key="index">
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                    <button>
                        <span class="icon is-small is-right">
                            <i class="fas fa-trash" @click.prevent="deleteUser(user.email)"></i>
                        </span>
                    </button>
                </td>
                <td>
                    <button>
                        <span class="icon is-small is-right">
                            <i class="fas fa-edit" @click.prevent="showEdit=!showEdit; editUser(user)"></i>
                        </span>
                    </button>
                </td>
            </tr>
        </table>
    </div>

    <div v-if="show">
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">

                <header class="modal-card-head">
                    <p class="modal-card-title">Create New User</p>
                    <button class="delete" @click="show = !show"></button>
                </header>

                <div class="modal-card-body">

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label">Email*</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="johnyappleseed@example.com" v-model="email">
                        </div>
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label" for="datePicker">Password*</label>
                        <input class="input" type="password" name="date" v-model="password">
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label">First Name*</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Johnny" v-model="firstName">
                        </div>
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label">Last Name*</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Appleseed" v-model="lastName">
                        </div>
                    </div>

                    <div class="field field is-flex is-flex-direction-column has-text-left">
                        <label class="label">Role*</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="role">
                                    <option>user</option>
                                    <option>admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click.prevent="doSignup" :disabled="!isFormValid">Save
                        changes</button>
                    <button class="button" @click="show = !show">Cancel</button>
                </footer>
            </div>
        </div>
    </div>

    <div v-if="showEdit">
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">

                <header class="modal-card-head">
                    <p class="modal-card-title">Edit User</p>
                    <button class="delete" @click="showEdit = !showEdit"></button>
                </header>

                <div class="modal-card-body">

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label">Email*</label>
                        <div class="control">
                            <input class="input" type="text" :placeholder=userDataedit.email v-model="newemail">
                        </div>
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label" for="datePicker">Password*</label>
                        <input class="input" type="password" name="date" v-model="newpass">
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label">First Name*</label>
                        <div class="control">
                            <input class="input" type="text" :placeholder=userDataedit.firstName v-model="newfname">
                        </div>
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label">Last Name*</label>
                        <div class="control">
                            <input class="input" type="text" :placeholder=userDataedit.lastName v-model="newlname">
                        </div>
                    </div>

                    <div class="field field is-flex is-flex-direction-column has-text-left">
                        <label class="label">Subject*</label>
                        <div class="control">
                            <div class="select">
                                <select :placeholder=userDataedit.role v-model="userDataedit.role">
                                    <option>user</option>
                                    <option>admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click.prevent="doEdit(); showEdit = !showEdit">Save
                        changes</button>
                    <button class="button" @click="showEdit = !showEdit">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<style scoped>
button {
    margin: .5rem;
}
</style>
