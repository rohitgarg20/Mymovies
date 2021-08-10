var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, makeObservable, observable } from "mobx";
const DEFAULT_SETTINGS = {
    showPopup: false,
    popupRenderingContent: undefined
};
export class PopupStore {
    showPopup;
    popupRenderingContent;
    constructor() {
        this.init();
        makeObservable(this);
    }
    init = () => {
        Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key]);
    };
    showPopupComponent = () => {
        this.showPopup = true;
    };
    hidePopupComponent = () => {
        this.showPopup = false;
    };
    setPopuprenderingContent = (content) => {
        this.popupRenderingContent = content;
    };
}
__decorate([
    observable
], PopupStore.prototype, "showPopup", void 0);
__decorate([
    observable
], PopupStore.prototype, "popupRenderingContent", void 0);
__decorate([
    action
], PopupStore.prototype, "showPopupComponent", void 0);
__decorate([
    action
], PopupStore.prototype, "hidePopupComponent", void 0);
__decorate([
    action
], PopupStore.prototype, "setPopuprenderingContent", void 0);
