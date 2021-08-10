const API_KEY = 'caca2375'

const REALM_SCHEMA_VERSION = 1
const REALM_LOC_PATH = '/data/data/com.mypat/files'
const DEFAULT_FILE_NAME = 'default.realm'

const API_IDS = {
  GET_MOVIE_BY_SEARCH: 'GET_MOVIE_BY_SEARCH',
  GET_MOVIE_DETAIL: 'GET_MOVIE_DETAIL'
}

const API_END_POINTS = {
  GET_MOVIE_BY_SEARCH: '/'
}

const MOVIES_DAT_KEY = {
  MOVIES_LIST: 'moviesList',
  CURRENT_PAGE_NUMBER: 'currentPageNumber',
  TOTAL_COUNT: 'totalCount'
}

interface I_MOVIES_LIST_DATA {
  title: string
  imdbID: string
  type: string
  poster: string
}

interface I_MOVIE_DATA {
  moviesList: I_MOVIES_LIST_DATA[]
  currentPageNumber: number
  totalCount: number
}

export {
  API_IDS,
  API_END_POINTS,
  API_KEY,
  REALM_SCHEMA_VERSION,
  REALM_LOC_PATH,
  DEFAULT_FILE_NAME,
  MOVIES_DAT_KEY,
  I_MOVIES_LIST_DATA,
  I_MOVIE_DATA
}