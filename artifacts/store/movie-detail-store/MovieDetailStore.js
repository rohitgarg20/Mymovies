var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { writeRealmData, getDataByPrimaryKey, deleteDataFromRealm } from './../../service/RealmService';
import { showLoader, hideLoader } from './../../service/LoaderService';
import { action, makeObservable, observable } from "mobx";
import { API_END_POINTS, API_IDS, API_KEY } from "../../common";
import { log } from "../../config";
import { BaseRequest } from "../../http-layer";
import { isEmpty } from 'lodash';
import { favMoviesListStore } from '..';
const DEFAULT_SETTINGS = {
    IMDb_ID: '',
    movieDetailData: {},
};
export class MovieDetailStore {
    IMDb_ID;
    movieDetailData;
    constructor() {
        this.init();
        makeObservable(this);
    }
    init = () => {
        Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key]);
    };
    setIMDbID = (id) => {
        this.IMDb_ID = id;
    };
    setMovieDetailData = (contructedData) => {
        this.movieDetailData = contructedData;
    };
    saveMovieToRealm = async () => {
        const { title = '', poster = '', movieInfo, isLiked = false } = this.movieDetailData || {};
        const { type } = movieInfo || {};
        const { value = '' } = type || {};
        log('saveMovieToRealm');
        const updatedData = {
            ...this.movieDetailData,
            isLiked: !isLiked
        };
        this.setMovieDetailData(updatedData);
        favMoviesListStore.updateFavMoviesListData(this.IMDb_ID, {
            title,
            imdbID: this.IMDb_ID,
            type: value,
            poster
        });
        if (isLiked) {
            deleteDataFromRealm('FavouriteMoviesList', `imdbID == "${this.IMDb_ID}"`);
        }
        else {
            writeRealmData('FavouriteMoviesList', {
                title,
                imdbID: this.IMDb_ID,
                type: value,
                poster
            });
        }
    };
    constructMovieDetailData = async (responseData) => {
        const getMovieDataInRealm = await getDataByPrimaryKey('FavouriteMoviesList', this.IMDb_ID);
        const isMovieLiked = !isEmpty(getMovieDataInRealm);
        log('getMovieDataInRealmgetMovieDataInRealm', isMovieLiked, getMovieDataInRealm, isEmpty(getMovieDataInRealm), typeof getMovieDataInRealm);
        const { Title = '', Year = 0, Released = '', Runtime = 0, Genre = '', Director = '', Writer = '', Actors = '', Plot = '', Language = 'Hindi', Country = 'India', Awards = 0, Poster = '', imdbRating = 0, imdbVotes = 0, Type = 'movie', DVD = '', BoxOffice = 0 } = responseData;
        const constructedData = {
            title: Title,
            runTime: Runtime,
            genre: Genre.split(','),
            plot: Plot,
            poster: Poster,
            released: Released,
            movieInfo: {
                title: {
                    heading: 'Title',
                    value: Title
                },
                released: {
                    heading: 'Released Information',
                    value: Released
                },
                runTime: {
                    heading: 'Runtime',
                    value: Runtime
                },
                language: {
                    heading: 'Original Language',
                    value: Language
                },
                director: {
                    heading: 'Directors',
                    value: Director
                },
                writer: {
                    heading: 'Writers',
                    value: Writer
                },
                actors: {
                    heading: 'Actors',
                    value: Actors
                },
                country: {
                    heading: 'Production Countries',
                    value: Country
                },
                awards: {
                    heading: 'Awards',
                    value: Awards
                },
                rating: {
                    heading: 'Rating',
                    value: imdbRating
                },
                votes: {
                    heading: 'Votes',
                    value: imdbVotes
                },
                type: {
                    heading: 'Type',
                    value: Type
                },
                dvd: {
                    heading: 'First DVD Date',
                    value: DVD
                },
                boxOffice: {
                    heading: 'Revenue',
                    value: BoxOffice
                },
            },
            isLiked: isMovieLiked
        };
        this.setMovieDetailData(constructedData);
        hideLoader();
    };
    getMovieDetailData = async () => {
        showLoader();
        const apiRequest = new BaseRequest(this, {
            apiId: API_IDS.GET_MOVIE_DETAIL,
            apiEndPoint: API_END_POINTS.GET_MOVIE_BY_SEARCH,
            methodType: 'get',
            urlParams: {
                i: this.IMDb_ID,
                apikey: API_KEY,
            }
        });
        await apiRequest.hitGetApi();
    };
    onSuccess(apiId, response) {
        log('onSuccessonSuccessonSuccess', apiId, response);
        switch (apiId) {
            case API_IDS.GET_MOVIE_DETAIL:
                this.constructMovieDetailData(response);
                break;
        }
    }
    onFailure(apiId, error) {
        switch (apiId) {
            case API_IDS.GET_MOVIE_DETAIL:
                break;
        }
    }
}
__decorate([
    observable
], MovieDetailStore.prototype, "movieDetailData", void 0);
__decorate([
    action
], MovieDetailStore.prototype, "init", void 0);
__decorate([
    action
], MovieDetailStore.prototype, "setMovieDetailData", void 0);
