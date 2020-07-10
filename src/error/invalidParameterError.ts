import{ BaseError } from './baseError/baseError'


export class InvalidParameterError extends BaseError {
    constructor(message:string){
        super(message, 422);
    }
}