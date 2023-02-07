export interface SystemState {
    system: { [x: string]: any };
    statusBarHeight: number;
    navbarHeight: number;
}

export interface SystemStore {
    state: any
    getters:any
    getSystem: any
    getNavbarHeight:any

}
