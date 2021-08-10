var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { showLoader, hideLoader } from './../../service/LoaderService';
import { action, computed, makeObservable, observable } from "mobx";
import { getDataFromRealm } from "../../service/RealmService";
import { map, filter, find, isEmpty } from 'lodash';
import { log } from '../../config';
const DEFAULT_SETTINGS = {
    favMoviesList: [],
    isScreenLoaded: false
};
export class FavMoviesListStore {
    favMoviesList;
    isScreenLoaded;
    constructor() {
        this.init();
        makeObservable(this);
    }
    init() {
        Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key]);
    }
    setScreenLoadedStatus = () => {
        this.isScreenLoaded = true;
    };
    setFavMoviesList = (moviesList) => {
        this.favMoviesList = [...moviesList];
        log(' this.favMoviesList this.favMoviesList', this.favMoviesList);
    };
    getFavMoviesList = async () => {
        this.setScreenLoadedStatus();
        showLoader();
        const favMoviesList = await getDataFromRealm('FavouriteMoviesList');
        const formmattedFavMovies = map(favMoviesList, (item) => item);
        this.setFavMoviesList(formmattedFavMovies);
        hideLoader();
    };
    updateFavMoviesListData = (idmbid, movieToAdd) => {
        if (this.isScreenLoaded) {
            const isMoviePresent = find(this.favMoviesList, (item) => item.imdbID === idmbid);
            log('isMoviePresentisMoviePresent', isMoviePresent);
            if (isEmpty(isMoviePresent)) {
                this.setFavMoviesList([
                    ...this.favMoviesList,
                    {
                        ...movieToAdd
                    }
                ]);
            }
            else {
                const filteredData = filter(this.favMoviesList, (item) => item.imdbID !== idmbid);
                log('updateFavMoviesListData', filteredData);
                this.setFavMoviesList(filteredData);
            }
        }
    };
    get savedFavMoviesList() {
        return this.favMoviesList.slice();
    }
}
__decorate([
    observable
], FavMoviesListStore.prototype, "favMoviesList", void 0);
__decorate([
    action
], FavMoviesListStore.prototype, "setFavMoviesList", void 0);
__decorate([
    computed
], FavMoviesListStore.prototype, "savedFavMoviesList", null);
