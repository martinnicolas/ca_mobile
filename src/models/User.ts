export class User {

    static EMAIL_PATTERN: string = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

    id: number;
    email: string;
    password: string;
    confirm_password: string;
}