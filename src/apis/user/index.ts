import uniApi from "@/tools/uniCloudRequest";
import type {UserInfo} from "@/types/api/user";

export const getUserInfoApi = ():Promise<UserInfo> => {
	return uniApi('user/get_userinfo')
}
