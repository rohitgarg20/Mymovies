import { writeRealmData, getDataByPrimaryKey, getDataFromRealm, deleteDataFromRealm } from './../../service/RealmService';
import { showLoader, hideLoader } from './../../service/LoaderService';
import { action, makeObservable, observable } from "mobx";
import { API_END_POINTS, API_IDS, API_KEY } from "../../common";
import { log } from "../../config";
import { BaseRequest } from "../../http-layer";
import { RESPONSE_CALLBACKS } from "../../http-layer/BaseResponse";
import { isEmpty } from 'lodash'
import { favMoviesListStore } from '..';

export interface I_MOVIE_DETAIL{
  title: string
  runTime: string
  genre: [string]
  // director: string
  // writer: string
  // actors: string
  plot: string
  poster: string
  released: string
  isLiked: boolean
  movieInfo:{
    title: {
      heading: string
      value: string
    }
    language: {
      heading: string
      value: string
    }
    country: {
      heading: string
      value: string
    }
    awards: {
      heading: string
      value: string
    }
    rating: {
      heading: string
      value: number
    }
    votes: {
      heading: string
      value: number
    }
    type: {
      heading: string
      value: string
    }
    dvd: {
      heading: string
      value: string
    }
    boxOffice: {
      heading: string
      value: string
    },
    released: {
      heading: string
      value: string
    },
    runTime: {
      heading: string
      value: string
    },
    director: {
      heading: string
      value: string
    }
    writer: {
      heading: string
      value: string
    }
    actors: {
      heading: string
      value: string
    }
  }
}

const DEFAULT_SETTINGS = {
  IMDb_ID: '',
  movieDetailData: {},
}


export class MovieDetailStore implements RESPONSE_CALLBACKS {
  IMDb_ID
  @observable movieDetailData: I_MOVIE_DETAIL

  constructor(){
    this.init()
    makeObservable(this)
  }

  @action
  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key])
  }

  setIMDbID = (id) => {
    this.IMDb_ID = id
  }

  @action
  setMovieDetailData = (contructedData) => {
    this.movieDetailData = contructedData
  }

  saveMovieToRealm = async () => {
    const { title = '', poster = '', movieInfo, isLiked = false  } = this.movieDetailData || {}
    const { type } = movieInfo || {}
    const {  value = ''} = type || {}
    log('saveMovieToRealm')
    const updatedData = {
      ...this.movieDetailData,
      isLiked: !isLiked
    }
    this.setMovieDetailData(updatedData)
    favMoviesListStore.updateFavMoviesListData(this.IMDb_ID, {
      title ,
      imdbID: this.IMDb_ID,
      type: value,
      poster
    })
    if(isLiked) {
      deleteDataFromRealm('FavouriteMoviesList', `imdbID == "${this.IMDb_ID}"`)
    } else {
      writeRealmData('FavouriteMoviesList', {
        title ,
        imdbID: this.IMDb_ID,
        type: value,
        poster
      })
    }


  }

  constructMovieDetailData = async (responseData) => {
    const getMovieDataInRealm = await getDataByPrimaryKey('FavouriteMoviesList', this.IMDb_ID)
    const isMovieLiked = !isEmpty(getMovieDataInRealm)

    log('getMovieDataInRealmgetMovieDataInRealm', isMovieLiked, getMovieDataInRealm, isEmpty(getMovieDataInRealm), typeof getMovieDataInRealm)
    const {Title = '' , Year = 0, Released = '', Runtime = 0, Genre = '', Director = '', Writer = '', Actors = '', Plot = '', Language = 'Hindi', Country = 'India', Awards = 0, Poster = '', imdbRating = 0, imdbVotes = 0, Type = 'movie', DVD = '', BoxOffice = 0 } = responseData

    const constructedData:I_MOVIE_DETAIL = {
      title: Title,
      runTime: Runtime,
      genre: Genre.split(','),
      plot: Plot,
      poster: Poster,
      released: Released,
      movieInfo:{
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
    }
    this.setMovieDetailData(constructedData)
    hideLoader()
  }

  getMovieDetailData = async () => {
    showLoader()
    const apiRequest = new BaseRequest(this, {
      apiId: API_IDS.GET_MOVIE_DETAIL,
      apiEndPoint: API_END_POINTS.GET_MOVIE_BY_SEARCH,
      methodType: 'get',
      urlParams: {
        i: this.IMDb_ID,
        apikey: API_KEY,
      }
    })
    await apiRequest.hitGetApi()
  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccessonSuccess', apiId, response)
    switch(apiId) {
      case API_IDS.GET_MOVIE_DETAIL:
        this.constructMovieDetailData(response)
        break
    }
  }
  onFailure(apiId: string, error: any) {
    switch(apiId) {
      case API_IDS.GET_MOVIE_DETAIL:
        break
    }
  }

}