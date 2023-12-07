import { ref, reactive } from 'vue';
import { useRouter } from "vue-router"
import {toast, showError} from "./session"
import * as myFetch from "./myFetch";
import { type User, getUserByEmail } from "./users";

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

export function api(action: string, body?: unknown, method?: string, headers?: any){
    session.loading++;
  
    if(session.token){
      headers = headers ?? {};
      headers['Authorization'] = `Bearer ${session.token}`;
    }
    return myFetch.api(`${action}`, body, method, headers)
      .catch(err=> showError(err))
      .finally(()=> session.loading--);
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

export function remove(index: number){
    const originalIndex = activities.value.length - 1 - index;
    activities.value.splice(originalIndex, 1);
};

export function edit(activity: Activity, index: number | null = null) {
    if (index !== null && index >= 0 && index < activities.value.length) {
      activities.value[index] = activity; // Replace the activity at the specified index
    }
    // Clear the form data (if needed)
    title.value = '';
    date.value = '';
    duration.value = '';
    location.value = '';
    picture.value = '';
    subject.value = '';
    distance.value = 0; // Reset distance as needed
  }

export function useCreate(){
    const router = useRouter()
    return {
        async create(email: string, title: string, date: string, duration: string, distance: string, location: string, subject: string) {
          const response = await api("activities/addpost", {email, title, date, duration, distance, location, subject})
          if(response.success){
            toast.success("Profile edited successfully. Please log out and log back in to see changes.")
          }else{
            toast.error(response.message)
          }
          router.push(session.redirectUrl || "/edit");
          session.redirectUrl = null
        }
    }
}