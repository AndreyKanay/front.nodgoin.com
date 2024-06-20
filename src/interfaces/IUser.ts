export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    telegram_id: number;
    is_premium: boolean;
    balance: number;
    energy: number;
    multi_tap_lvl: number;
    regeneration_speed_lvl: number;
    energy_limit_lvl: number;
    tip_top_bot: boolean;
    full_energy_boost: number;
    turbo: number;
    last_visit: Date;
    end_session: Date;
}