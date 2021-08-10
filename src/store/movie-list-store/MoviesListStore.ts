import { showLoader, hideLoader } from './../../service/LoaderService';
import Reactotron  from 'reactotron-react-native';
import { RESPONSE_CALLBACKS } from './../../http-layer/BaseResponse';
import { BaseRequest } from './../../http-layer/BaseRequest';
import { action, computed, makeObservable, observable } from "mobx"
import { API_END_POINTS, API_IDS, API_KEY, I_MOVIES_LIST_DATA, I_MOVIE_DATA, MOVIES_DAT_KEY } from '../../common';
import { log } from '../../config';
import { navigateSimple } from '../../service/NavigationService';
import { get, map, set } from 'lodash'
import { ToastAndroid } from 'react-native';

export const FILTER_DATA_KEYS = {
  MOVIES: 'movies',
  SERIES: 'series',
  EPISODE: 'episode'
}

export const FILTER_KEYS = {
  KEY: 'key',
  IS_SELECTED: 'isSelected',
  DISPLAY_VALUE: 'display',
  FILTER_TYPE: 'filterType',
  FILTERS_LIST: 'filtersList',
  CURRENTLY_SELECTED_FILTERS: 'currentSelectedFilters',
  PREVIOUSLY_SELECTED_FILTERS: 'previousSelectedFilters'
}

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

}



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
}


export class MoviesListStore implements RESPONSE_CALLBACKS {
  @observable isLoading
  @observable moviesData
  @observable filterData
  callBack
  searchText

  constructor(){
    Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key])
    makeObservable(this)
  }

  setSearchTextVal = (val) => {
    this.searchText = val
  }

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
    })
    if(callback) {
      this.callBack = callback
    }
    await apiRequest.hitGetApi()
  }

  @action
  setMoviesListData = (moviesList) => {
    // this.moviesList = [...this.moviesList, ...moviesList]
    this.moviesData = {
      ...this.moviesData,
      [MOVIES_DAT_KEY.MOVIES_LIST]: [
        ...get(this.moviesData, `${[MOVIES_DAT_KEY.MOVIES_LIST]}`, []),
        ...moviesList
      ]

    }

    log('setMoviesListDatasetMoviesListData', this.moviesData)
  }

  @action
  setTotalCount = (totalCount) => {
    this.moviesData = {
      ...this.moviesData,
      [MOVIES_DAT_KEY.TOTAL_COUNT]: totalCount
    }
  }

  @action
  updateCurrentPageNumber = (currentPageNumber = undefined) => {

    this.moviesData = {
      ...this.moviesData,
      [MOVIES_DAT_KEY.CURRENT_PAGE_NUMBER]: currentPageNumber ? currentPageNumber : get(this.moviesData, `${[MOVIES_DAT_KEY.CURRENT_PAGE_NUMBER]}`, 0) + 1
    }
  }

  @action
  resetMovieData = () => {
    this.moviesData = { ...DEFAULT_SETTINGS['moviesData']}
  }



  @computed
  get moviesListData(){
    return get(this.moviesData, `${[MOVIES_DAT_KEY.MOVIES_LIST]}`, []).slice()
  }

  constructMoviesListData = (responseData) => {
    const moviesList = get(responseData, 'Search', [])
    const constructedListData: I_MOVIES_LIST_DATA[] = map(moviesList, (item) => {
      const { Title  = '', imdbID = '', Poster = '', Type = ''} = item || {}
      return {
        title: Title,
        imdbID,
        poster: Poster,
        type: Type
      }
    })

    return constructedListData

  }

  onSuccessFulDataFetched = (responseData) => {
    const constructedData = this.constructMoviesListData(responseData)
    const totalResult = get(responseData, 'totalResults', 0)
    this.setTotalCount(totalResult)
    this.setMoviesListData(constructedData)
    if(this.callBack) {
      this.callBack()
    }
  }

  @action
  setFilterData = (tempFilterData) => {
    this.filterData = {
      ...tempFilterData
    }
    log('setFilterDatasetFilterData', this.filterData)
  }

  @action
  updateSelectedFilterData = (selectedFilterKey) => {
    const tempFilterData = {...this.filterData}
    const filterListData = (get(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}]`, {}))
    log('filterListDatafilterListData', filterListData, selectedFilterKey)

    Object.keys(filterListData).forEach((key) => {
      if(key === selectedFilterKey) {
        set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}][${key}][${FILTER_KEYS.IS_SELECTED}]`, true)
      } else {
        set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}][${key}][${FILTER_KEYS.IS_SELECTED}]`, false)
      }
    })
    set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.CURRENTLY_SELECTED_FILTERS}]`, selectedFilterKey)
    this.setFilterData(tempFilterData)
  }

  @action
  onPressApplyFilterButton = () => {
    showLoader()
    this.resetMovieData()
    this.getMoviesListData().then(() => {
      const selectedFilterrKey = (get(this.filterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.CURRENTLY_SELECTED_FILTERS}]`, ''))
      const tempFilterData = {...this.filterData}
      set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.PREVIOUSLY_SELECTED_FILTERS}]`, selectedFilterrKey)
      this.setFilterData(tempFilterData)
      hideLoader()
    })
  }


  @action
  onPressReset = () => {
    this.updateSelectedFilterData('')
    this.onPressApplyFilterButton()
  }

  @action
  setInitialFilterData = () => {
    const selectedFilterrKey = (get(this.filterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.PREVIOUSLY_SELECTED_FILTERS}]`, ''))
    const tempFilterData = {...this.filterData}
    const filterListData = (get(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}]`, {}))
    Object.keys(filterListData).forEach((key) => {
      if(key === selectedFilterrKey) {
        set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}][${key}][${FILTER_KEYS.IS_SELECTED}]`, true)
      } else {
        set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.FILTERS_LIST}][${key}][${FILTER_KEYS.IS_SELECTED}]`, false)
      }
    })
    set(tempFilterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.CURRENTLY_SELECTED_FILTERS}]`, selectedFilterrKey)
    this.setFilterData(tempFilterData)
  }

  getappliedFilterPayload = () => {
    const selectedFilterrKey = (get(this.filterData, `[${FILTER_KEYS.FILTER_TYPE}][${FILTER_KEYS.CURRENTLY_SELECTED_FILTERS}]`, ''))
    return selectedFilterrKey
  }

  onSuccess(apiId: string, response: any) {
    log('apiIdapiIdapiId', apiId, response )
    switch(apiId) {
      case API_IDS.GET_MOVIE_BY_SEARCH:
        this.onSuccessFulDataFetched(response)
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('apiIdapiIdapiId', apiId, error )
    switch(apiId) {
      case API_IDS.GET_MOVIE_BY_SEARCH:
        ToastAndroid.show(error, ToastAndroid.SHORT)
        hideLoader()
        break
    }
  }

}