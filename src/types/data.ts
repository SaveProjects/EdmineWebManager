type UserRank = {
    player_name:string;
    player_uuid:string;
    player_rank_id:number;
    player_rank_name:string;
    player_modulable_rank:string;
}
type UserLogin = {
    player_name:string;
    player_uuid:string;
    player_password:string;
    lastIp:string;
    lastAuth:string;
    isPremium:string;
    isOnline:number;
}
type UserAccount = {
    player_name:string;
    player_uuid:string;
    player_time_of_played:string;
    player_first_connection:string;
}
type UserSanction = {
    name?:string;
    reason:string;
    player_uuid:string;
    confirmed_by_uuid?:string;
    kick_by_uuid?:string;
    mute_by_uuid?:string;
    kick_date?:string;
    mute_date?:string;
    type?:string;
}
  
export type { UserRank,UserLogin,UserAccount,UserSanction };
  