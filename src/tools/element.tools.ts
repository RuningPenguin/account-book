import {getCurrentInstance} from "vue";
import NodeInfo = UniNamespace.NodeInfo;


export const getElement = (el: string, all: boolean = false): Promise<NodeInfo | NodeInfo[]> => {
    try {
        return new Promise(resolve => {
            const instance = getCurrentInstance();
            const query = uni.createSelectorQuery().in(instance);
            query[!all ? 'select' : 'selectAll'](el).boundingClientRect(data => resolve(data)).exec();
        })
    } catch (err) {
        throw err
    }
}
