import { InvalidParameterError } from "../error/invalidParameterError";


export class Genre {
    constructor(
      private id: string,
      private name: string,
    
    ) {}
  
    public getName(): string {
      return this.name;
    }
  
    public getId(): string {
        return this.id
    }
   
  }
  