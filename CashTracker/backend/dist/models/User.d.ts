import { Model } from "sequelize-typescript";
import Budget from "./Budget";
declare class User extends Model {
    name: string;
    password: string;
    email: string;
    token: string;
    confirm: string;
    budget: Budget[];
}
export default User;
