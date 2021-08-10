import React, { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { log } from '../../config'
import { get } from 'lodash'
import { inject, observer } from 'mobx-react'
import { I_MOVIE_DETAIL, MovieDetailStore } from '../../store/movie-detail-store'
import { CustomText, ImageComponent } from '../../components'
import { strings } from '../../common'

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 350
  },
  headingContainer: {
    paddingVertical: 15
  },
  movieTitle: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 20,
    lineHeight: 30,
    paddingBottom: 5
  },
  movieTitleSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  subLabel: {
    fontSize: 14,
    color: '#5f6068',
    paddingRight: 10
  },
  dotted: {
    height: 7,
    width: 7,
    borderRadius: 10,
    backgroundColor: '#5f6068',
    marginRight: 10
  },
  movieInfoContainer: {
    paddingVertical: 10
  },
  movieInfoHeading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 10
  },
  movieInfoContent: {
    color: 'white',
    fontSize: 14,
    // lineHeight: 20
  },
  genreContainer: {
    borderRadius: 20,
    backgroundColor: '#333542',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 1,
  },
  itemSeparator: {
    paddingRight: 10
  },
  basicInfoContainer: {
    flexDirection: 'row',
  },
  basicInfoSeparator: {
    paddingBottom: 10
  },
  subheadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#d19b03',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLabel: {
    color: 'white'
  }
})

interface IProps {
  navigation: any
  route: any
  movieDetailStore: MovieDetailStore
}

export const movieDetailScreen = inject('movieDetailStore')(observer((props: IProps) => {
  const {navigation, route, movieDetailStore } = props
  const movieIDMbid = get(route, 'params.id', '')

  useEffect(() => {
    movieDetailStore.setIMDbID(movieIDMbid)
    movieDetailStore.getMovieDetailData()

    return () => {
      movieDetailStore.init()
    }
  }, [movieIDMbid])
  const { movieDetailData } = movieDetailStore
  log('movieDetailDatamovieDetailDatamovieDetailData', movieDetailData)

  const renderMovieImage = () => {
    const { poster } = movieDetailData as I_MOVIE_DETAIL
    return (
      <View style = {styles.imageContainer}>
        <ImageComponent uri = {poster}/>
      </View>
    )
  }

  const onAddMovieToFavSection = () => {
    movieDetailStore.saveMovieToRealm()
  }

  const renderAddToFavouritesButton = () => {
    const { ADD_TO_FAV, REMOVE_FROM_FAV } = strings.MOVIE_DETAILSCREEN
    const { isLiked = false } = movieDetailData as I_MOVIE_DETAIL
    const textToShow = isLiked ? REMOVE_FROM_FAV : ADD_TO_FAV
    return (
      <TouchableOpacity style = {styles.likeButton} onPress = {() => onAddMovieToFavSection()}>
        <CustomText textStyle = {styles.buttonLabel}> {textToShow}</CustomText>
      </TouchableOpacity>
    )
  }

  const renderMovieHeading = () => {
    const { title, released, runTime } = movieDetailData as I_MOVIE_DETAIL
    return (
      <View style = {styles.headingContainer}>
        <CustomText textStyle = {styles.movieTitle}>{title}</CustomText>
        <View style = {styles.movieTitleSubContainer}>
          <View style = {styles.subheadingContainer}>
            <CustomText textStyle = {styles.subLabel}>{released}</CustomText>
            <View style = {styles.dotted}/>
            <CustomText textStyle = {styles.subLabel}>{runTime} </CustomText>
          </View>
          {renderAddToFavouritesButton()}
        </View>
      </View>
    )
  }

  const renderMovieInfo = () => {
    const { plot } = movieDetailData as I_MOVIE_DETAIL

    return (
      <View style = {styles.movieInfoContainer}>
        <CustomText textStyle = {styles.movieInfoHeading}>About</CustomText>
        <CustomText textStyle = {styles.movieInfoContent}>{plot}</CustomText>
      </View>
    )
  }

  const renderGenresSection = () => {
    const { genre = [] } = movieDetailData as I_MOVIE_DETAIL

    return (
      <View style = {styles.movieInfoContainer}>
        <CustomText textStyle = {styles.movieInfoHeading}>Genres</CustomText>
        <FlatList
          horizontal = {true}
          data = {genre}
          renderItem = {({item, index}) => (
            <View style = {styles.genreContainer}>
              <CustomText textStyle = {styles.movieInfoContent}>{item}</CustomText>
            </View>
          )}
          ItemSeparatorComponent = {() => <View style = {styles.itemSeparator}/>}
        />
      </View>
    )
  }

  const renderMovieDetailsComponent = () => {
    const { movieInfo = {} } = movieDetailData as I_MOVIE_DETAIL
    return (<View style = {styles.movieInfoContainer}>
               <CustomText textStyle = {styles.movieInfoHeading}>Movie Info</CustomText>
               <FlatList
                  data = {Object.keys(movieInfo)}
                  renderItem = {({item: key, index}) => {
                    const { heading, value } = movieInfo[key]
                    return (
                      <View style = {styles.basicInfoContainer}>
                        <View style  = {{ flex: 1}}>
                          <CustomText textStyle = {styles.subLabel}>{heading}:</CustomText>
                        </View>
                        <View style  = {{ flex: 1}}>
                          <CustomText textStyle = {styles.movieInfoContent}>{value}</CustomText>
                        </View>
                      </View>
                    )
                  }}
                  keyExtractor = {(item, index) => {
                    return item || index.toString()
                  }}
                  ItemSeparatorComponent = {() => <View style = {styles.basicInfoSeparator}/>}
               />
           </View>)
  }

  return (
    <ScrollView style = {{
      flex: 1,
      backgroundColor: '#1c1d28',
      paddingBottom: 20
    }}>
      {renderMovieImage()}
      <View style = {{ paddingHorizontal: 10 }}>
        {renderMovieHeading()}
        {renderMovieInfo()}
        {renderGenresSection()}
        {renderMovieDetailsComponent()}
      </View>
    </ScrollView>
  )
}))

export {
  movieDetailScreen as MovieDetailScreen
}
