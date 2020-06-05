export class User {

    static EMAIL_PATTERN: string = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
    validation_messages = {
        'email': [
            { type: 'required', message: 'Debe completar este campo.' },
            { type: 'pattern', message: 'El formato es incorrecto.' }
        ],
        'password': [
            { type: 'required', message: 'Debe completar este campo.' }
        ],
    }

    id: number;
    email: string;
    password: string;
    confirm_password: string;
}