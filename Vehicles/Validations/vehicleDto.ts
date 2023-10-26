import { Min } from "class-validator";
import { Optional, Required,  } from "joi-typescript-validator";

export class CreateVehicleDTO{
    @Required()
    title: string | undefined;
    @Required()
    description: string | undefined;
    @Required()
        @Min(0)
    price: number | undefined
    
    @Optional()
    model:string|undefined

}

