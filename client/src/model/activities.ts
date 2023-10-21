import { ref } from 'vue';

const title = ref('')
const date = ref('')
const duration = ref('')
const location = ref('')
const picture = ref('')
const subject = ref('')
const distance = ref()

export const activities = ref([] as { title: string, date: string, duration: string, location: string, picture?: string, subject: string, distance: number, userid: number, firstname: string, lastname: string, username: string }[])

export interface Activity {
    title: string, 
    date: string, 
    duration: string, 
    location: string, 
    picture: string, 
    subject: string, 
    distance: number
    userid: number
    firstname: string 
    lastname: string
    username: string
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

export function edit(index: number){
    if (index >= 0 && index < activities.value.length) {
        
    }
};