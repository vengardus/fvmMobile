import { TOParametros } from './to/TOParametros';

export class Login {
    private username:string;
    private password:string;
    private oTOParametros:TOParametros;
    private message:string;

    constructor ( username, password, oTOParametros=null) {
        this.username = username;
        this.password = password;
        this.oTOParametros = oTOParametros;
    }

    public getMessage() {
        return this.message;
    }

    public validateData() {
        let ok = false;
        if ( this.username.length > 0 &&this. password.length > 0 )
            ok = true;
        return ok;
    }

    public validLogin() {
        let ok = false;
        if (    this.oTOParametros.getLogin() === this.username
            && this.oTOParametros.getPassword() === this.password 
        ) {
            ok = true;
            this.message = 'Usuario autorizado.';
        }
        else {
            this.message = 'Error, usuario no autorizado';
        }
        return ok;
    }
}