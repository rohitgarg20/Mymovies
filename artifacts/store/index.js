import { FavMoviesListStore } from "./favourite-store";
import { LoaderDataStore } from "./loader-store";
import { MovieDetailStore } from "./movie-detail-store";
import { MoviesListStore } from "./movie-list-store";
import { NavigationDataStore } from "./navigationDataStore";
import { PopupStore } from "./popup-store";
const navigationStore = new NavigationDataStore();
const moviesListStore = new MoviesListStore();
const loaderDataStore = new LoaderDataStore();
const movieDetailStore = new MovieDetailStore();
const favMoviesListStore = new FavMoviesListStore();
const popupStore = new PopupStore();
export { navigationStore, moviesListStore, loaderDataStore, movieDetailStore, favMoviesListStore, popupStore };
const stores = {
    navigationStore,
    moviesListStore,
    loaderDataStore,
    movieDetailStore,
    favMoviesListStore,
    popupStore
};
export default stores;
