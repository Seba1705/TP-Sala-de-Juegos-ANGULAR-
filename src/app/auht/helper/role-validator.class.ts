import { User } from '../../shared/user.interface';

export class RoleValidator {
    isAdmin(user: User): boolean {
        return user.role === 'Admin';
    }

    isUser(user: User): boolean {
        return user.role === 'Usuario';
    }    

    isInvited(user: User): boolean {
        return user.role === 'Invitado';
    } 
}