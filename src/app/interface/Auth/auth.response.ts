import { IGenericResponse } from '../generic.response';
import { AuthResponseData } from './authresponse.data';

export class IAuthResponse  extends IGenericResponse{
    object:AuthResponseData;
}