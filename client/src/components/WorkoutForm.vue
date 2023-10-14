<script setup lang="ts">
import { ref, type PropType } from 'vue';
// let show = ref(true);
let active = "is-active"
let show = ref(true)
</script>

<template>
    <div v-if="show">
        <div :class="active" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label">Title</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Text input">
                        </div>
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label">Date</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-success" type="text" placeholder="Text input" value="bulma">
                            <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                        <p class="help is-success">This username is available</p>
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label">Email</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>
                        <p class="help is-danger">This email is invalid</p>
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                        <label class="label">Subject</label>
                        <div class="control">
                            <div class="select">
                                <select>
                                    <option>Select dropdown</option>
                                    <option>With options</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Message</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Textarea"></textarea>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox">
                                I agree to the <a href="#">terms and conditions</a>
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="question">
                                Yes
                            </label>
                            <label class="radio">
                                <input type="radio" name="question">
                                No
                            </label>
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link">Submit</button>
                        </div>
                        <div class="control">
                            <button class="button is-link is-light">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <button class="modal-close is-large" @click="show = !show" aria-label="close"></button>
        </div>
    </div>
</template>


<style scoped>
.button {
    color: black;
    background-color: #00b1d2;
}

.button:hover {
    background-color: #00cbef;
    color: black;
}
</style>