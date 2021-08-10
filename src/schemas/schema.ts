import { DEFAULT_FILE_NAME, REALM_LOC_PATH, REALM_SCHEMA_VERSION } from "../common"

const FavouriteMovie = {
  schema: {
    name: 'FavouriteMoviesList',
    primaryKey: 'imdbID',
    properties: {
      title: 'string',
      imdbID: 'string',
      type: 'string',
      poster: 'string',
    }
  }
}

export {
  FavouriteMovie as FAVOURITE_MOVIE
}


export const REALM_CONFIGRATION = {
  schema: [FavouriteMovie.schema],
  schemaVersion: REALM_SCHEMA_VERSION,
  // path: `${REALM_LOC_PATH}/${DEFAULT_FILE_NAME}`,
}