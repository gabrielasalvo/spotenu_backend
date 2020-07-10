
import { BaseError } from './baseError/baseError'

export class GenericError extends BaseError {
    constructor(message: string) {
        super(message, 400);
    }
}