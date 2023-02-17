// 用户信息
import {defineStore} from "pinia";
import {reactive} from "vue";
import useStorage from "@/tools/storage";
import type {UserState, UserStore} from "@/types/store/user";
import {getUserInfoApi} from "@/apis/user";
import type {UserInfo} from "@/types/api/user";

const storage = useStorage();


const useUserStore = defineStore("user", (): UserStore => {
	const state = reactive<UserState>({
		userinfo: storage.get("userinfo") || {},
		token: storage.get("token") || ""
	});
	
	const setUserinfo = (userinfo: UserInfo) => {
		storage.set("userinfo", userinfo);
		state.userinfo = userinfo;
	};
	
	const setToken = (token?: string) => {
		token = token || storage.get("uni_id_token");
		storage.set("token", token);
		state.token = token;
	};
	
	const getUserinfo = () => {
		getUserInfoApi().then((res: UserInfo) => {
			setUserinfo(res)
			setToken()
		})
	}
	
	return {state, setUserinfo, setToken, getUserinfo};
}, {persist: {enabled: true}});

export default useUserStore;
