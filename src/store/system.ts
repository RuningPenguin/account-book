import {defineStore} from "pinia";
import {nextTick, reactive} from "vue";
import {getElement} from "@/tools/element.tools";

import type {SystemState, SystemStore} from "@/types/store/system";

const useSystem = defineStore('system', (): SystemStore => {
    const state = reactive<SystemState>({
        system: {}, // 系统信息
        statusBarHeight: 0, // 状态栏高度
        navbarHeight: 0,// 头部高度
    })

    const getters = reactive({
        topHeight: state.navbarHeight + state.statusBarHeight
    })

    const getSystem = async () => {
        const system: any = uni.getSystemInfoSync();
        state.system = system;
        state.statusBarHeight = system.statusBarHeight;

        // state.navbarHeight = await getElement('.base-navbar')
        // await nextTick(async () => {
        //     console.log(await getElement('.base-navbar'))
        // })
    }

    const getNavbarHeight =  (n:number) => {
        state.navbarHeight = n
    }


    return {state, getters, getSystem,getNavbarHeight}
})


export default useSystem
