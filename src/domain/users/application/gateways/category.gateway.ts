import { CoreGateway } from "@/core/gateway/core.gateway";
import { Category } from "../../enterprise/entities/category.entity";

export interface CategoryGateway extends CoreGateway<Category> {
  
}