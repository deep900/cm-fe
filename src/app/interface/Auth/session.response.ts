import { IGenericResponse } from '../generic.response';
import { SessionData } from './session.data';

export class SessionResponse extends IGenericResponse{
    public object:SessionData;

    public toString(){
        return "Session Response:" + this.object.toString;
    }
}