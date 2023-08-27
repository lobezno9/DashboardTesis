import { BaseOut } from "../../general/BaseOut";

export class LoginOut extends BaseOut {
    token: string;
    expire: Date;
    isAuthetnicated: boolean;
    isActive: boolean;
    changePassword: boolean;
}