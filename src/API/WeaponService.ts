import { APIEntries } from "@/Enums/APIEnries";
import ServiceController from "./ServiceController";

export default class WeaponService extends ServiceController {
    fetchUrl = APIEntries.BASE_URL + APIEntries.WEAPONS;
}
