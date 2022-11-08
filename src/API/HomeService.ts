import { APIEntries } from "@/Enums/APIEntries";
import ServiceController from "./ServiceController";

export default class HomeService extends ServiceController {
	fetchUrl = APIEntries.BASE_URL + APIEntries.GENSHIN_SITE
}