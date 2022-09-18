import { APIEntries } from "@/Enums/APIEntries";
import ServiceController from "./ServiceController";

export default class WeaponService extends ServiceController {
    fetchUrl = APIEntries.BASE_URL + APIEntries.WEAPONS;
}
