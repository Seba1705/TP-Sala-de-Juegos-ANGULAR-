export type Roles = 'ADMIN' | 'INVITADO';

export interface User {
    uid: string;
    email: string;
    password?: string;
    role?: Roles;
    name?: string;
}