"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.URL = void 0;
var PLUGIN_URL = 'https://api.facetsui.com/v1/plugin/token';
exports.URL = 'https://facetsui.com';
var commonConfig = {
    container: 'facetsui-plugin',
    uid: 'client_uid',
    secret: 'client_secret'
};
var FacetsUIPlugin = /** @class */ (function () {
    function FacetsUIPlugin(config) {
        var _this = this;
        this.onMessage = function (event) {
            var data = JSON.parse(event.data);
            if (event.origin !== exports.URL) {
                return;
            }
            var payload = data[1];
            switch (data[0]) {
                case FacetsUIPlugin.FRAME_READY:
                    _this.config.onLoad && _this.config.onLoad(payload);
                    _this.performAction(FacetsUIPlugin.FRAME_DATA_CONFIG, _this.config);
                    break;
                case FacetsUIPlugin.LISTENER_ON_DATA:
                    _this.config.onData && _this.config.onData(payload);
                    break;
                case FacetsUIPlugin.LISTENER_ON_ERROR:
                    _this.config.onError && _this.config.onError(payload);
                    break;
                case FacetsUIPlugin.LISTENER_ON_SAVE_PROJECT:
                    _this.config.onSaveProject && _this.config.onSaveProject(payload);
                    break;
                case FacetsUIPlugin.LISTENER_ON_SAVE_COMPONENT:
                    _this.config.onSaveComponent && _this.config.onSaveComponent(payload[0], payload[1]);
                    break;
                case FacetsUIPlugin.LISTENER_ON_SWITCH_ORIENTATION:
                    _this.config.onSwitchOrientation && _this.config.onSwitchOrientation(payload);
                    break;
                case FacetsUIPlugin.LISTENER_ON_SWITCH_OS:
                    _this.config.onSwitchOS && _this.config.onSwitchOS(payload);
                    break;
            }
        };
        this.config = Object.assign(commonConfig, config);
    }
    FacetsUIPlugin.prototype.switchOrientation = function () {
        this.performAction(FacetsUIPlugin.FRAME_PRO_ACTION_SWITCH_ORIENTATION);
    };
    FacetsUIPlugin.prototype.setIOSMode = function (value) {
        this.performAction(FacetsUIPlugin.FRAME_PRO_ACTION_SET_IOS, value);
    };
    FacetsUIPlugin.prototype.switchAutoSave = function () {
        this.performAction(FacetsUIPlugin.FRAME_PRO_ACTION_SWITCH_AUTO_SAVE);
    };
    FacetsUIPlugin.prototype.makeScreenshot = function () {
        this.performAction(FacetsUIPlugin.FRAME_PRO_ACTION_MAKE_SCREENSHOT);
    };
    FacetsUIPlugin.prototype.setProject = function (data) {
        this.performAction(FacetsUIPlugin.FRAME_PRO_ACTION_SET_PROJECT, data);
    };
    FacetsUIPlugin.prototype.performAction = function (action) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        this.postMessage.apply(this, __spreadArrays([action], rest));
    };
    FacetsUIPlugin.prototype.getToken = function (uid, secret) {
        var config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "grant_type=password&uid=" + uid + "&secret=" + secret
        };
        return fetch(new Request(PLUGIN_URL, config)).then(function (response) { return response.text(); });
    };
    FacetsUIPlugin.prototype.startEditor = function (token) {
        if (!token.length) {
            alert('The token is empty');
            return;
        }
        this.makeFrame(token, FacetsUIPlugin.TYPE_EDITOR);
    };
    FacetsUIPlugin.prototype.startViewer = function (token) {
        if (!token.length) {
            alert('The token is empty');
            return;
        }
        this.makeFrame(token, FacetsUIPlugin.TYPE_VIEWER);
    };
    FacetsUIPlugin.prototype.makeFrame = function (token, type) {
        var container = document.getElementById(this.config.container);
        var frame = document.createElement('iframe');
        frame.src = exports.URL + "/" + type + "?token=" + token;
        frame.id = type;
        window.addEventListener('message', this.onMessage, false);
        container && container.appendChild(frame);
        this.frame = frame;
    };
    FacetsUIPlugin.prototype.postMessage = function (action) {
        var message = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            message[_i - 1] = arguments[_i];
        }
        this.frame && this.frame.contentWindow.postMessage(JSON.stringify(__spreadArrays([action], message)), '*');
    };
    FacetsUIPlugin.prototype.dispose = function () {
        window.removeEventListener('message', this.onMessage, false);
    };
    FacetsUIPlugin.FRAME_READY = 'frame_ready';
    FacetsUIPlugin.LISTENER_ON_DATA = 'editor_on_data';
    FacetsUIPlugin.LISTENER_ON_SAVE_PROJECT = 'editor_on_save_project';
    FacetsUIPlugin.LISTENER_ON_SAVE_COMPONENT = 'editor_on_save_component';
    FacetsUIPlugin.LISTENER_ON_SWITCH_ORIENTATION = 'on_switch_orientation';
    FacetsUIPlugin.LISTENER_ON_SWITCH_OS = 'on_switch_os';
    FacetsUIPlugin.LISTENER_ON_ERROR = 'on_error';
    FacetsUIPlugin.FRAME_DATA_CONFIG = 'config';
    FacetsUIPlugin.FRAME_PRO_ACTION_SWITCH_ORIENTATION = 'switch_orientation';
    FacetsUIPlugin.FRAME_PRO_ACTION_SET_IOS = 'set_ios';
    FacetsUIPlugin.FRAME_PRO_ACTION_SWITCH_AUTO_SAVE = 'switch_auto_save';
    FacetsUIPlugin.FRAME_PRO_ACTION_SET_PROJECT = 'set_project';
    FacetsUIPlugin.FRAME_PRO_ACTION_MAKE_SCREENSHOT = 'make_screenshot';
    FacetsUIPlugin.TYPE_EDITOR = 'editor';
    FacetsUIPlugin.TYPE_VIEWER = 'viewer';
    return FacetsUIPlugin;
}());
exports["default"] = FacetsUIPlugin;
//# sourceMappingURL=FacetsUIPlugin.js.map