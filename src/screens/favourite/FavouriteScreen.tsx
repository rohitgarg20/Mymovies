import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'
import { FavMoviesListStore } from '../../store/favourite-store'
import { get } from 'lodash'
import { CustomText, MovieItemComponent } from '../../components'
import { I_MOVIES_LIST_DATA } from '../../common'
import { log } from '../../config'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#1c1d28',
    paddingVertical: 10
  },
  headerLabel: {
    color: 'white',
    fontSize: 20
  },
  headerContainer: {
    paddingBottom: 20
  }
})

interface IProps {
  navigation: any
  route: any
  favMoviesListStore: FavMoviesListStore
}

const  favouriteScreen = inject('favMoviesListStore')(observer((props: IProps) => {

   useEffect(() => {

    const { favMoviesListStore } = props
    favMoviesListStore.getFavMoviesList()
  }, [])

  const renderMovieItem = (movieItemData: I_MOVIES_LIST_DATA) => {
    const { title, imdbID, poster } = movieItemData
    return (
      <MovieItemComponent
        title = {title}
        imdbID = {imdbID}
        poster = {poster}
      />
    )
  }

  const renderHeaderComponent = () => {
    return (
      <View style = {styles.headerContainer}>
        <CustomText textStyle = {styles.headerLabel}>My Favourite Movies</CustomText>
      </View>
    )
  }

  const renderMoviesList = () => {
    const { favMoviesListStore }  = props
    const { savedFavMoviesList = [] } = favMoviesListStore
    log('redner fav movoies list in render', savedFavMoviesList)
    return (
      <FlatList
        ListHeaderComponent = {renderHeaderComponent}
        data = {savedFavMoviesList}
        renderItem =  {({item, index}) => renderMovieItem(item)}
        keyExtractor = {(item, index) => get(item, 'imdbID', index)}
        numColumns = {2}
        ItemSeparatorComponent = {() => (
          <View style = {{
            marginBottom: 20
          }}/>
        )}
        showsVerticalScrollIndicator = {false}
        />
    )
  }

  return (
    <View style = {styles.mainContainer}>
      {renderMoviesList()}
    </View>
  )
}))

export {
  favouriteScreen as FavouriteScreen
}
