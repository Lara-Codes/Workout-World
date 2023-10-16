import { reactive } from "vue";
import { type User, getUserByEmail } from "./users"; 

const session = reactive({
  user: null as User | null,
})

export interface User {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    role: "admin" | "user",
    token?: string
}

export function getSession(){
  return session;
}

export function login(email: string, password: string): User | undefined {

  const user = getUserByEmail(email); 
  if(user && user.password === password){
    session.user = user; 
    return user; 
  }
}

export function logout(){
  session.user = null; 
}
















