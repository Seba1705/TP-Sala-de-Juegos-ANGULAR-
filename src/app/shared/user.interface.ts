export type Roles = { 'Admin', 'Invitado', 'Usuario'}

export interface User {
    uid: string;
    email: string;
    password: string;
}