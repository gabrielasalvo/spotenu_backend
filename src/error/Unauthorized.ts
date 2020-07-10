import { BaseError } from './baseError/baseError'

export class Unauthorized extends BaseError{
    constructor (message: string){
        super(message, 401)
    }
}