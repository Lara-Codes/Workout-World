import { ref, reactive } from 'vue';
import { useRouter } from "vue-router"
import { toast, showError } from "./session"
import * as myFetch from "./myFetch";
export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: "admin" | "user",
  token?: string,
}

export function getUsers(): Promise< User[]> {
  return api("users"); 
}

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

export function useGetUsers(){
  const router = useRouter(); 
  return {
      async data(){
          try{
              const response = await api("users/usersdata", {}); 
              if (response.success === true) {
                  return response.users;
              }
          }catch(error){
              console.error(error)
          }
      }
  }
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find( x => x.email === email );
}