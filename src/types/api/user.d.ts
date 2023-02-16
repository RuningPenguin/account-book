export type UserInfo = {
	_id: string;
	mobile: string; // 手机号
	username: string; // 用户名
	email: string;// 邮箱
	budget: string; // 本月预算
	avatar_file_url: string; // 头像地址
	last_login_date: number; // 最后登录时间
	last_login_ip: string; // 登录ip
	nickname: string; // 昵称
	register_date: number; // 注册时间
}
