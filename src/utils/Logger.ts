export default class Logger {
    private static isShowLog: boolean = true;
    public static toggleLog(enable: boolean) {
        this.isShowLog = enable;
    }

    public static getIsShowLog(): boolean {
        return this.isShowLog;
    }

    public static debug(...args: any[]) {
        if (this.isShowLog) {
            console.debug(`[DEBUG]`, ...args);
        }
    }

    public static log(...args: any[]) {
        if (this.isShowLog) {
            console.log(`[LOG]`, ...args);
        }
    }

    public static warn(...args: any[]) {
        if (this.isShowLog) {
            console.warn(`[WARN]`, ...args);
        }
    }

    public static error(...args: any[]) {
        console.trace('ERROR Happen ....');
        console.error(`[ERROR]`, ...args);
    }

    /**
     * expandable trace
     * @param event
     * @param data
     */
    public static logEvent(dispatcher: any, event: string, data?: any): void {
        if (this.isShowLog) {
            console.groupCollapsed(`${dispatcher.constructor.name}: ${event.toString()}`);
            console.log("data : " + (data !== null ? data : "null"));
            console.trace();
            console.groupEnd();
        }
    }

    static readonly MAP_KEY = "__windowId__";

    static mapObjectToGlobalId(object: any, prefix: string): void {
        if (this.isShowLog) {
            const windowId = `${prefix}_${object.constructor.name}`;
            object[this.MAP_KEY] = windowId;
            window[windowId] = object;
        }
    }

    static unmapObjectToGlobalId(object: any) {
        if (this.isShowLog) {
            const windowId = object[this.MAP_KEY];
            if (windowId && window[windowId]) {
                delete object[this.MAP_KEY];
                window[windowId] = null;
                delete window[windowId];
            }
        }
    }
}
