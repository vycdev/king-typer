import { Category } from "./Category";

export default interface HandlerResponse {
    category: Category;
    userData: Record<number, unknown>;
}
