import { Group } from "./Group";
import { Profile } from "./Profile";
import { UserType } from "./UserType";

export class User {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    companyId?: number;
    profileId?: number;
    isActive?: boolean;
    creationDate?: Date;
    modificationDate?: Date;
    identification?: String;
    groupId?: number;
    userTypeId?: number;
    profile?: Profile
    group?: Group
    userType?: UserType
}