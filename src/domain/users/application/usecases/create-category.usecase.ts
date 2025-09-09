// import { CreateCategoryInputDto, CreateCategoryOutputDto } from "@/domain/dto/category/create-category.dto";
// import { CategoryGateway } from "../gateways/category.gateway";
// import { UseCase } from "./usecase";

// export class CreateCategoryUseCase implements UseCase<CreateCategoryInputDto, CreateCategoryOutputDto>{
//   private constructor(
//     private readonly categoryGateway: CategoryGateway
//   ){}

//   async execute({
//     name
//   }: CreateCategoryInputDto): Promise<CreateCategoryOutputDto> {
    
//     const categoryAlreadyExists = await this.categoryGateway.find(name)
//   }
// }