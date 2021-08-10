var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { showLoader, hideLoader } from './../../service/LoaderService';
import { BaseRequest } from './../../http-layer/BaseRequest';
import { action, computed, makeObservable, observable } from "mobx";
import { API_END_POINTS, API_IDS, API_KEY, MOVIES_DAT_KEY } from '../../common';
import { log } from '../../config';
import { get, map, set } from 'lodash';
import { ToastAndroid } from 'react-native';
export const FILTER_DATA_KEYS = {
    MOVIES: 'movies',
    SERIES: 'series',
    EPISODE: 'episode'
};
export const FILTER_KEYS = {
    KEY: 'key',
    IS_SELECTED: 'isSelected',
    DISPLAY_VALUE: 'display',
    FILTER_TYPE: 'filterType',
    FILTERS_LIST: 'filtersList',
    CURRENTLY_SELECTED_FILTERS: 'currentSelectedFilters',
    PREVIOUSLY_SELECTED_FILTERS: 'previousSelectedFilters'
};
export const FILTER_DATA = {
    [FILTER_KEYS.FILTER_TYPE]: {
        [FILTER_KEYS.FILTERS_LIST]: {
            [FILTER_DATA_KEYS.MOVIES]: {
                [FILTER_KEYS.KEY]: FILTER_DATA_KEYS.MOVIES,
                [FILTER_KEYS.IS_SELECTED]: false,
                [FILTER_KEYS.DISPLAY_VALUE]: 'Movies'
            },
            [FILTER_DATA_KEYS.SERIES]: {
                [FILTER_KEYS.KEY]: FILTER_DATA_KEYS.SERIES,
                [FILTER_KEYS.IS_SELECTED]: false,
                [FILTER_KEYS.DISPLAY_VALUE]: 'Series'
            },
            [FILTER_DATA_KEYS.EPISODE]: {
                [FILTER_KEYS.KEY]: FILTER_DATA_KEYS.EPISODE,
                [FILTER_KEYS.IS_SELECTED]: false,
                [FILTER_KEYS.DISPLAY_VALUE]: 'Episode'
            },
        },
        [FILTER_KEYS.CURRENTLY_SELECTED_FILTERS]: '',
        [FILTER_KEYS.PREVIOUSLY_SELECTED_FILTERS]: '',
    }
};
const DEFAULT_SETTINGS = {
    searchText: '',
    isLoading: false,
    moviesData: {
        [MOVIES_DAT_KEY.MOVIES_LIST]: [],
        [MOVIES_DAT_KEY.TOTAL_COUNT]: 0,
        [MOVIES_DAT_KEY.CURRENT_PAGE_NUMBER]: 1
    },
    filterData: { ...FILTER_DATA },
    callBack: undefined
};
export class MoviesListStore {
    isLoading;
    moviesData;
    filterData;
    callBack;
    searchText;
    constructor() {
        Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key]);
        makeObservable(this);
    }
    setSearchTextVal = (val) => {
        this.searchText = val;
    };
    getMoviesListData = async (callback = undefined) => {
        const apiRequest = new BaseRequest(this, {
            apiId: API_IDS.GET_MOVIE_BY_SEARCH,
            apiEndPoint: API_END_POINTS.GET_MOVIE_BY_SEARCH,
            methodType: 'get',
            urlParams: {
                s: this.searchText,
                apikey: API_KEY,
                page: this.moviesData[MOVIES_DAT_KEY.CURRENT_PAGE_NUMBER],
                type: this.getappliedFilterPayload()
            }
        });
        if (callback) {
            this.callBack = callback;
        }
        await apiRequest.hitGetApi();
    };
    setMoviesListData = (moviesList) => {
        // this.moviesList = [...this.moviesList, ...moviesList]
        this.moviesData = {
            ...this.moviesData,
            [MOVIES_DAT_KEY.MOVIES_LIST]: [
                ...get(this.moviesData, `${[MOVIES_DAT_KEY.MOVIES_LIST]}`, []),
                ...moviesList
            ]
        };
        log('setMoviesListDatasetMoviesListData', this.moviesData);
    };
    setTotalCount = (totalCount) => {
        this.moviesData = {
            ...this.moviesData,
            [MOVIES_DAT_KEY.TOTAL_COUNT]: totalCount
        };
    };
    updateCurrentPageNumber = (currentPageNumber = undefined) => {
        this.moviesData = {
            ...this.moviesData,
            [MOVIES_DAT_KEY.CURRENT_PAGE_NUMBER]: currentPageNumber ? currentPageNumber : get(this.moviesData, `${[MOVIES_DAT_KEY.CURRENT_PAGE_NUMBER]}`, 0) + 1
        };
    };
    resetMovieData = () => {
        this.moviesData = { ...DEFAULT_SETTINGS['moviesData'] };
    };
    get moviesListData() {
        return get(this.moviesData, `${[MOVIES_DAT_KEY.MOVIES_LIST]}`, []).slice();
    }
    constructMoviesListData = (responseData) => {
        const moviesList = get(responseData, 'Search', []);
        const constructedListData = map(moviesList, (item) => {
            const { Title = '', imdbID = '', Poster = '', Type = '' } = item || {};
            return {
                title: Title,
                imdbID,
                poster: Poster,
                type: Type
            };
        });
        return constructedListData;
    };
    onSuccessFulDataFetched = (responseData) => {
        const constructedData = this.constructMoviesListData(responseData);
        const totalResult = get(responseData, 'totalResults', 0);
        this.setTotalCount(totalResult);
        this.setMoviesListData(constructedData);
        if (this.callBack) {
            this.callBack();
        }
    };
    setFilterData = (tempFilterData) => {
        this.filterData = {
            ...tempFilterData
        };
        log('setFilterDatasetFilterData', this.filterData);
    };
    updateSelectedFilterData = (selectedFilterKey) => {
        const tempFilterData = { ...this.filterData };
        const filterListData = (get(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}]`, {}));
        log('filterListDatafilterListData', filterListData, selectedFilterKey);
        Object.keys(filterListData).forEach((key) => {
            if (key === selectedFilterKey) {
                set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}][${key}][${FILTER_KEYS.IS_SELECTED}]`, true);
            }
            else {
                set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}][${key}][${FILTER_KEYS.IS_SELECTED}]`, false);
            }
        });
        set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.CURRENTLY_SELECTED_FILTERS}]`, selectedFilterKey);
        this.setFilterData(tempFilterData);
    };
    onPressApplyFilterButton = () => {
        showLoader();
        this.resetMovieData();
        this.getMoviesListData().then(() => {
            const selectedFilterrKey = (get(this.filterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.CURRENTLY_SELECTED_FILTERS}]`, ''));
            const tempFilterData = { ...this.filterData };
            set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.PREVIOUSLY_SELECTED_FILTERS}]`, selectedFilterrKey);
            this.setFilterData(tempFilterData);
            hideLoader();
        });
    };
    onPressReset = () => {
        this.updateSelectedFilterData('');
        this.onPressApplyFilterButton();
    };
    setInitialFilterData = () => {
        const selectedFilterrKey = (get(this.filterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.PREVIOUSLY_SELECTED_FILTERS}]`, ''));
        const tempFilterData = { ...this.filterData };
        const filterListData = (get(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}]`, {}));
        Object.keys(filterListData).forEach((key) => {
            if (key === selectedFilterrKey) {
                set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}][${key}][${FILTER_KEYS.IS_SELECTED}]`, true);
            }
            else {
                set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}][${key}][${FILTER_KEYS.IS_SELECTED}]`, false);
            }
        });
        set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.CURRENTLY_SELECTED_FILTERS}]`, selectedFilterrKey);
        this.setFilterData(tempFilterData);
    };
    getappliedFilterPayload = () => {
        const selectedFilterrKey = (get(this.filterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.CURRENTLY_SELECTED_FILTERS}]`, ''));
        return selectedFilterrKey;
    };
    onSuccess(apiId, response) {
        log('apiIdapiIdapiId', apiId, response);
        switch (apiId) {
            case API_IDS.GET_MOVIE_BY_SEARCH:
                this.onSuccessFulDataFetched(response);
                break;
        }
    }
    onFailure(apiId, error) {
        log('apiIdapiIdapiId', apiId, error);
        switch (apiId) {
            case API_IDS.GET_MOVIE_BY_SEARCH:
                ToastAndroid.show(error, ToastAndroid.SHORT);
                hideLoader();
                break;
        }
    }
}
__decorate([
    observable
], MoviesListStore.prototype, "isLoading", void 0);
__decorate([
    observable
], MoviesListStore.prototype, "moviesData", void 0);
__decorate([
    observable
], MoviesListStore.prototype, "filterData", void 0);
__decorate([
    action
], MoviesListStore.prototype, "setMoviesListData", void 0);
__decorate([
    action
], MoviesListStore.prototype, "setTotalCount", void 0);
__decorate([
    action
], MoviesListStore.prototype, "updateCurrentPageNumber", void 0);
__decorate([
    action
], MoviesListStore.prototype, "resetMovieData", void 0);
__decorate([
    computed
], MoviesListStore.prototype, "moviesListData", null);
__decorate([
    action
], MoviesListStore.prototype, "setFilterData", void 0);
__decorate([
    action
], MoviesListStore.prototype, "updateSelectedFilterData", void 0);
__decorate([
    action
], MoviesListStore.prototype, "onPressApplyFilterButton", void 0);
__decorate([
    action
], MoviesListStore.prototype, "onPressReset", void 0);
__decorate([
    action
], MoviesListStore.prototype, "setInitialFilterData", void 0);
