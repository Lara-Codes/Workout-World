// Activity vue accesses a function in this stats.ts file. The stats.ts file does all of the calculations for 
// all-time statistics and such and sends it to Stats.vue. 
import { useRouter } from "vue-router"
import { ref, computed } from 'vue';

let currentdist = ref(0); 

export function calculateDistance(newdistance: number){
    currentdist.value += newdistance
}

export function getCurrentDistance(){
    return computed(() => currentdist.value);
}
