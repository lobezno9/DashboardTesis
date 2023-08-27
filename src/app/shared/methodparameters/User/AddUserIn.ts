import { BaseIn } from '../../general/BaseIn';
import { User } from '../../models/User';

export class AddUserIn extends BaseIn {
    public user: User;
}