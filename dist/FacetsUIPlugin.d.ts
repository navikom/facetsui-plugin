interface IFacetsUIConfig {
    container: string;
    titleLink?: string;
    title?: string;
    uid?: string;
    secret?: string;
    hideHeader?: boolean;
    dictionary?: {
        [key: string]: string;
    };
    data?: {
        [key: string]: any;
    };
    onLoad?: (payload: {
        ios: boolean;
        portrait: boolean;
        autoSave: boolean;
    }) => void;
    onData?: (data: {
        [key: string]: any;
    }) => void;
    onSaveProject?: (data: {
        [key: string]: any;
    }) => void;
    onSaveComponent?: (data: {
        [key: string]: any;
    }, base64: string) => void;
    onError?: (error: string) => void;
    onSwitchOS?: (os: 'ios' | 'android') => void;
    onSwitchOrientation?: (orientation: 'portrait' | 'landscape') => void;
}
export declare const URL = "https://facetsui.com";
declare class FacetsUIPlugin {
    static FRAME_READY: string;
    static LISTENER_ON_DATA: string;
    static LISTENER_ON_SAVE_PROJECT: string;
    static LISTENER_ON_SAVE_COMPONENT: string;
    static LISTENER_ON_SWITCH_ORIENTATION: string;
    static LISTENER_ON_SWITCH_OS: string;
    static LISTENER_ON_ERROR: string;
    static FRAME_DATA_CONFIG: string;
    static FRAME_PRO_ACTION_SWITCH_ORIENTATION: string;
    static FRAME_PRO_ACTION_SET_IOS: string;
    static FRAME_PRO_ACTION_SWITCH_AUTO_SAVE: string;
    static FRAME_PRO_ACTION_SET_PROJECT: string;
    static FRAME_PRO_ACTION_MAKE_SCREENSHOT: string;
    static TYPE_EDITOR: string;
    static TYPE_VIEWER: string;
    config: IFacetsUIConfig;
    frame?: HTMLIFrameElement;
    constructor(config: IFacetsUIConfig);
    switchOrientation(): void;
    setIOSMode(value: boolean): void;
    switchAutoSave(): void;
    makeScreenshot(): void;
    setProject(data: {
        [key: string]: any;
    }): void;
    performAction(action: string, ...rest: (string | boolean | {
        [key: string]: any;
    })[]): void;
    getToken(uid: string, secret: string): Promise<string>;
    startEditor(token: string): void;
    startViewer(token: string): void;
    makeFrame(token: string, type: typeof FacetsUIPlugin.TYPE_EDITOR | typeof FacetsUIPlugin.TYPE_VIEWER): void;
    onMessage: (event: MessageEvent) => void;
    postMessage(action: string, ...message: (string | {
        [key: string]: any;
    } | boolean)[]): void;
    dispose(): void;
}
export default FacetsUIPlugin;
