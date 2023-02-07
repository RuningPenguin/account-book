// 全局插件
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import uviewPlus from "uview-plus";


const store = createPinia();
// #ifdef H5
store.use(piniaPluginPersist);
// #endif

export default {
	install(app: any) {
		app.use(store);
		app.use(uviewPlus);
	}
};
