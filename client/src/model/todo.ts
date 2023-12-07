import { ref, reactive } from 'vue';
import { useRouter } from "vue-router"
import { toast, showError } from "./session"
import * as myFetch from "./myFetch";
import { type User } from "./users";

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

export function useCreate() {
    const router = useRouter();
    return {
        async create(email: string, completed: boolean, description: string) {
            try {
                const response = await api("todo/add", { email, completed, description })
                if (response.success === true) {
                    console.log("success")
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}

export function taskData() {
    const router = useRouter()
    return {
        async data(email: string) {
            try {
                const response = await api("todo/taskdata", { email });
                if (response.success === true) {
                    return response.tasks;
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export function useRemove(){
    const router = useRouter(); 
    return {
        async remove(email: string, description: string){
            try{
                const response = await api("todo/removetask", {email, description}); 
                if (response.success === true) {
                    toast.success("Task deleted successfully. ")
                }
            }catch(error){
                console.error(error)
            }
        }
    }
}