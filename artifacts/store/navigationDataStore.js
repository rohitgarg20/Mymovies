var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, makeObservable, observable } from "mobx";
const DEFAULT_SETTINGS = {
    router: undefined,
    currentStackName: ''
};
export class NavigationDataStore {
    router;
    currentStackName;
    constructor() {
        Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key]);
        makeObservable(this);
    }
    setCurrentStackName = (stackName) => {
        this.currentStackName = stackName;
    };
    setRouter = (routerState) => {
        this.router = routerState;
    };
}
__decorate([
    observable
], NavigationDataStore.prototype, "router", void 0);
__decorate([
    observable
], NavigationDataStore.prototype, "currentStackName", void 0);
__decorate([
    action
], NavigationDataStore.prototype, "setCurrentStackName", void 0);
__decorate([
    action
], NavigationDataStore.prototype, "setRouter", void 0);
