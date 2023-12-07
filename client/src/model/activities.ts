import { ref, reactive } from 'vue';
import { useRouter } from "vue-router"
import { toast, showError } from "./session"
import * as myFetch from "./myFetch";
import { type User } from "./users";

const title = ref('')
const date = ref('')
const duration = ref('')
const location = ref('')
const picture = ref('')
const subject = ref('')
const distance = ref()

export const activities = ref([] as { title: string, date: string, duration: string, location: string, picture?: string, subject: string, distance: number, userid?: number, firstname?: string, lastname?: string, username?: string }[])

export const session = reactive({
    user: null as User | null,
    token: null as string | null,
    redirectUrl: null as string | null,
    messages: [] as {
        type: string,
        text: string
    }[],
    loading: 0
})

export function api(action: string, body?: unknown, method?: string, headers?: any) {
    session.loading++;

    if (session.token) {
        headers = headers ?? {};
        headers['Authorization'] = `Bearer ${session.token}`;
    }
    return myFetch.api(`${action}`, body, method, headers)
        .catch(err => showError(err))
        .finally(() => session.loading--);
}

export interface Activity {
    title: string,
    date: string,
    duration: string,
    location: string,
    picture: string,
    subject: string,
    distance: number
    userid?: number
    firstname?: string
    lastname?: string
    username?: string
}

export function addActivity(activity: Activity) {
    activities.value.push(activity);
    title.value = ''
    date.value = ''
    duration.value = ''
    location.value = ''
    picture.value = ''
    subject.value = ''
    distance.value = ''
}

export function remove(index: number) {
    const originalIndex = activities.value.length - 1 - index;
    activities.value.splice(originalIndex, 1);
};


export function useCreate() {
    const router = useRouter()
    return {
        async create(email: string, title: string, date: string, duration: string, distance: string, location: string, subject: string) {
            const response = await api("activities/addpost", { email, title, date, duration, distance, location, subject })
            if (response.success) {
                toast.success("Post added successfully.")
            } else {
                toast.error(response.message)
            }
            router.push(session.redirectUrl || "/activity");
            session.redirectUrl = null
        }
    }
}

export function postData() {
    const router = useRouter()
    return {
        async data(email: string) {
            try {
                const response = await api("activities/postdata", { email });
                if (response.success === true) {
                    return response.posts;
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export function useDelete() {
    const router = useRouter()
    return {
        async remove(email: string, newArray: Array<{
            title: string;
            date: string;
            duration: string;
            distance: string;
            location: string;
            subject: string;
        }>) {
            try {
                const response = await api("activities/delete", { email, newArray });
                if (response.success === true) {
                    toast.success("Post deleted successfully.")
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export function useEdit() {
    const router = useRouter()
    return {
        async edit(email: string, newArray: Array<{
            title: string;
            date: string;
            duration: string;
            distance: string;
            location: string;
            subject: string;
        }>) {
            try {
                const response = await api("activities/delete", { email, newArray });
                if (response.success === true) {
                    toast.success("Post edited successfully.")
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}