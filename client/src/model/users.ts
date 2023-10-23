/* B"H
*/
import data from "../data/users.json"

export let allusers = data.users.map((user) => ({ ...user, role: user.id <= 5 ? 'admin' : 'user', isVisible: true }));
export let users = allusers.filter((user) => user.isVisible);
export interface User {
    id: number, 
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string,
    role: "admin" | "user", 
    token?: string
    username: string
    isVisible?: boolean;
}

export function getUsers(): User[] {
    return data.users.map( x => ({ ...x, role: x.id <= 5 ? 'admin' : 'user' }) ) as User[]; 
}

export function getUserByEmail(email: string): User | undefined {
    return getUsers().find( x => x.email === email)
}

export function removeUser(userId: number) {
    const user = users.find((u) => u.id === userId);
    if (user) {
    console.log(user.firstName);
      user.isVisible = false;
    }
  }