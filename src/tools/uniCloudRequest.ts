import {name, version} from "../../package.json";
import {UNI_BASE_NAME} from "@/config/globa.config";

import useUserStore from "@/store/user";

const {state} = useUserStore();


// 请求拦截
uni.addInterceptor("request", {
	invoke(args) {
		let {url, header, closeLoading} = args;
		// request 触发前拼接 url
		// args.url = UNI_BASE_NAME + url;
		
		// 设置超时时间
		args.timeout = 50000;
		
		// 添加请求头
		args.header = {
			...header,
			version,
			requestFrom: name,
			Authorization: `Bearer ${state.token}`,
			"content-type": "application/json;charset=UTF-8"
		};
		
		// 加载效果
		// !closeLoading && showLoading();
		// CloseLoading = closeLoading
	},
	complete() {
		// uni.hideLoading();
	}
});

// 响应拦截
function responseInterception(response: any, resolve: Function, reject: Function) {
	const {success, result: {data, code, message}} = response;
	// console.log(success,data, code, message)
	if (success === true || code === 200) {
		return resolve(data);
	}
	return reject(message);
}


export default function uniApi(url: string, data: anyObj = {}, config: anyObj = {}) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: UNI_BASE_NAME || 'home',
			data: {action: url, data, ...config},
			success: (res) => responseInterception(res, resolve, reject),
			fail: (err) => reject(err),
			complete: () => {
			}
		})
	})
	
}
