import { APIEntries } from "@/Enums/APIEnries";
import ServiceController from "./ServiceController";

export default class CharacterService extends ServiceController {
    fetchUrl = APIEntries.BASE_URL + APIEntries.CHARACTERS
}