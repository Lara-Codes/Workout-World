/* B"H
*/
import { reactive } from "vue";
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification";
import * as myFetch from "./myFetch";
import { type User, getUserByEmail } from "./users";

export const toast = useToast();

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

export function getSession() {
  return session;
}

export function showError(err: any) {
  session.messages.push({ type: "error", text: err.message ?? err });
  toast.error(err.message ?? err);
}

export function useLogin(){
  const router = useRouter();

  return {
    async login(email: string, password: string): Promise< User | null> {
      const response = await api("users/login", { email, password });

      session.user = response.user;
      session.token = response.token;

      router.push(session.redirectUrl || "/home");
      session.redirectUrl = null
      return session.user;
    },
    logout(){
      session.user = null;
      router.push("/");
    }
  }
}

export function useSignup(){
  const router = useRouter()
  return {
    async signup(email: string, password: string, firstName: string, lastName: string, role?:string) {
      const response = await api("users/signup", {email, password, firstName, lastName})
      toast.success("Registration successful.")
      router.push(session.redirectUrl || "/");
      session.redirectUrl = null
    }
  }

}

export function useEdit(){
  const router = useRouter()
  return {
    async edit(ogemail: string | undefined, email: string, password: string, firstName: string, lastName: string) {
      const response = await api("users/edit", {ogemail, email, password, firstName, lastName})
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

export function useAdmin(){
  const router = useRouter()
  return{
    async ad(){
      const response = await api("users/users", {}) 
    }
  }
}

export function userdata(){
  const router = useRouter()
  return{
    async data(){
      try {
        const response = await api("users/userdata", {});
        if (response.success === true) {
          return response.users;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export function useEditAsAdmin(){
  const router = useRouter()
  return {
    async edit(ogemail: string, email: string, firstName: string, lastName: string, role: string, password: string) {
      const response = await api("users/editasadmin", {ogemail, email, firstName, lastName, role, password})
      if(response.success){
        toast.success("Profile edited successfully.")
      }else{
        toast.error(response.message)
      }
      router.push(session.redirectUrl || "/users");
      session.redirectUrl = null
    }
  }
}

export function useDelete(){
  const router = useRouter()
  return {
    async remove(email: string){
      const response = await api("users/delete", {email})
      if(response.success){
        toast.success("User deleted successfully. Please log out and log back in to see changes.")
      }else{
        toast.error(response.message)
      }
    }
  }
}

export function useAccess(){
  const router = useRouter(); 
  return {
    async access(){
      const response = await api("users/users", {})
      if (response.success) {
        router.push('/users');
      }else{
        toast.error("You must be an admin to access this page.")
      }
    }
  }
}

