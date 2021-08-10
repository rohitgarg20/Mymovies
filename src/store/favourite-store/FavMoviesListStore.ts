import { showLoader, hideLoader } from './../../service/LoaderService';
import { action, computed, makeObservable, observable } from "mobx"
import { I_MOVIES_LIST_DATA, MOVIES_DAT_KEY } from "../../common"
import { getDataFromRealm } from "../../service/RealmService"
import { map, filter, find, isEmpty } from 'lodash'
import { log } from '../../config';

const DEFAULT_SETTINGS = {
  favMoviesList: [],
  isScreenLoaded: false
}

export class FavMoviesListStore {
  @observable favMoviesList
  isScreenLoaded

  constructor(){
    this.init()
    makeObservable(this)
  }

  init(){
    Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key])
  }

  setScreenLoadedStatus = () => {
    this.isScreenLoaded = true
  }

  @action
  setFavMoviesList = (moviesList) => {
    this.favMoviesList = [...moviesList]
    log(' this.favMoviesList this.favMoviesList',  this.favMoviesList)
  }

  getFavMoviesList = async () => {
    this.setScreenLoadedStatus()
    showLoader()
    const favMoviesList = await getDataFromRealm('FavouriteMoviesList')
    const formmattedFavMovies = map(favMoviesList, (item) => item)
    this.setFavMoviesList(formmattedFavMovies)
    hideLoader()
  }

  updateFavMoviesListData = (idmbid, movieToAdd: I_MOVIES_LIST_DATA) => {
    if(this.isScreenLoaded) {
      const isMoviePresent = find(this.favMoviesList, (item) => item.imdbID === idmbid)
      log('isMoviePresentisMoviePresent', isMoviePresent)
      if(isEmpty(isMoviePresent)) {
        this.setFavMoviesList([
          ...this.favMoviesList,
          {
            ...movieToAdd
          }
        ])
      } else {
        const filteredData = filter(this.favMoviesList, (item) => item.imdbID !== idmbid)
        log('updateFavMoviesListData', filteredData)
        this.setFavMoviesList(filteredData)
      }
    }
  }

  @computed
  get savedFavMoviesList(){
    return this.favMoviesList.slice()
  }

}