import { APIEntries } from "@/Enums/APIEntries";
import ServiceController from "./ServiceController";

export default class BannersService extends ServiceController {
	fetchUrl = APIEntries.BASE_URL + '/'
}