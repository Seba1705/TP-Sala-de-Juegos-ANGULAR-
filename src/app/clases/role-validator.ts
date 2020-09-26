import { User } from "../models/user.interface";

export class RoleValidator {
    isAdmin(user: User): boolean {
        return user.role === 'ADMIN';
    }

    isInvitado(user: User): boolean {
        return user.role === 'INVITADO';
    }
}

