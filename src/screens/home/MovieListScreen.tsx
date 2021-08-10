import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { CustomText, HeaderComponent, ImageComponent, MovieFilterComponent, MovieItemComponent } from '../../components'
import { log } from '../../config'
import { MoviesListStore } from '../../store/movie-list-store'
import { get } from 'lodash'
import { navigateSimple } from '../../service'
import { I_MOVIES_LIST_DATA, I_MOVIE_DATA } from '../../common'
import { navigationStore, popupStore } from '../../store'

interface IProps {
  moviesListStore?: MoviesListStore
  navigation: any
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1c1d28',
  },
  movieTitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    paddingTop: 10
  }
})


@inject('moviesListStore')
@observer
export  class MovieListScreen extends Component<IProps> {

  onPressMovieItem = (id) => {
    const { navigation } = this.props
    navigateSimple(navigation, 'movieDetailScreen', {
      id
    })
  }
  renderMovieItem = (movieItemData: I_MOVIES_LIST_DATA) => {
    const { title, imdbID, poster } = movieItemData
    return (
      // <TouchableOpacity style = {{
      //   flex: 1,
      //   alignItems: 'center'
      // }}
      // onPress = {() => this.onPressMovieItem(imdbID)}
      // >
      //   <View style = {{
      //     height: 100,
      //     width: 100
      //   }}>
      //     <ImageComponent uri = {poster}/>
      //   </View>
      //   <CustomText textStyle = {styles.movieTitle}>{title}</CustomText>
      // </TouchableOpacity>
      <MovieItemComponent
        title = {title}
        imdbID = {imdbID}
        poster = {poster}
        onPressMovieItem = {this.onPressMovieItem}
      />
    )
  }

  isMoreDataAvailable = () => {
    const { moviesListStore }  = this.props
    const { moviesData } = moviesListStore
    const { currentPageNumber, totalCount } = moviesData as I_MOVIE_DATA
    const fetchedCount = currentPageNumber * 10
    return fetchedCount < totalCount
  }

  loadMoreMoviesListData = () => {
    const { moviesListStore }  = this.props
    const { updateCurrentPageNumber, getMoviesListData } = moviesListStore
    log('loadMoreMoviesListDataloadMoreMoviesListData', this.isMoreDataAvailable())
    if(this.isMoreDataAvailable()) {
      updateCurrentPageNumber()
      getMoviesListData()
    }

  }

  renderFooterComponent = () => {
    log('renderFooterComponentrenderFooterComponent', this.isMoreDataAvailable())

    return (
      this.isMoreDataAvailable() && <ActivityIndicator size = {'large'} animating = {true} color  ={'#1D7DEA'} style = {{
        marginVertical: 10
      }}/>
    )
  }

  componentWillUnmount() {
    const { navigation, moviesListStore } = this.props
    log('componentWillUnmount is called')
    moviesListStore.resetMovieData()
  }

  onHeaderBackPress = () => {
    const { navigation, moviesListStore } = this.props
    navigation.goBack()

  }

  onPressFilterIcon = () => {
    popupStore.showPopupComponent()
    popupStore.setPopuprenderingContent(() => <MovieFilterComponent/>)
  }

  renderHeaderComponent = () => {
    const { moviesListStore } = this.props
    const { searchText, moviesListData = [] } = moviesListStore
    return (
      <HeaderComponent
        showBackButton = {true}
        showSearchBar = {true}
        showFilterIcon = {true}
        onBackButtonPress = {this.onHeaderBackPress}
        defaultValue = {searchText}
        onPressFilterIcon = {this.onPressFilterIcon}
      />
    )
  }



  renderMoviesList = () => {
    const { moviesListStore }  = this.props
    const { moviesListData = [] } = moviesListStore
    return (
      <FlatList
        style = {{
          paddingHorizontal: 20
        }}
        data = {moviesListData}
        renderItem =  {({item, index}) => this.renderMovieItem(item)}
        keyExtractor = {(item, index) => get(item, 'imdbID', index)}
        numColumns = {2}
        ItemSeparatorComponent = {() => (
          <View style = {{
            marginBottom: 20
          }}/>
        )}
        showsVerticalScrollIndicator = {false}
        onEndReachedThreshold = {0.01}
        onEndReached = {this.loadMoreMoviesListData}
        ListFooterComponent = {this.renderFooterComponent}
        />
    )
  }

  render() {
    const { moviesListStore } = this.props
    log('moviesListStoremoviesListStore', moviesListStore)
    return (
      <View style  = {styles.mainContainer}>
        {this.renderHeaderComponent()}
        {this.renderMoviesList()}
      </View>
    )

  }
}
