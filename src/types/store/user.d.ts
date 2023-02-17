import {UserInfo} from "@/types/api/user";

export interface UserState {
	userinfo: UserInfo;
	token: string;
}

export interface UserStore {
	state: UserState;
	setUserinfo: (userinfo:UserInfo)=>void;
	setToken: (token?: string)=>void;
	getUserinfo:()=>void;
}
