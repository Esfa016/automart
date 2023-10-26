import { Min, Optional } from "joi-typescript-validator";

export class PaginationDto{
    @Optional()
    @Min(1)
    page: number =1
    @Optional()
    @Min(1)
    limit:number =10
    
}

export class PaginationHelper {
  static paginateQuery(paginationDto: PaginationDto): number {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;
    return skip;
  }
}
