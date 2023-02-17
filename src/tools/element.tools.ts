import {getCurrentInstance} from "vue";
import NodeInfo = UniNamespace.NodeInfo;


export const getElement = (el: string, all: boolean = false, instance: any = getCurrentInstance()): Promise<NodeInfo | NodeInfo[]> => {
	try {
		return new Promise(resolve => {
			if (!instance) throw 'instance 只能在setup中获取 或传入 instance'
			const query = uni.createSelectorQuery().in(instance);
			query[!all ? 'select' : 'selectAll'](el).boundingClientRect(data => resolve(data)).exec();
		})
	} catch (err) {
		throw err
	}
}
