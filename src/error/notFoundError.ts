 
import { BaseError } from './baseError/baseError'

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404);
    }
} 