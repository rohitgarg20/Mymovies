var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { HeaderComponent, MovieFilterComponent, MovieItemComponent } from '../../components';
import { log } from '../../config';
import { get } from 'lodash';
import { navigateSimple } from '../../service';
import { popupStore } from '../../store';
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
});
let MovieListScreen = class MovieListScreen extends Component {
    onPressMovieItem = (id) => {
        const { navigation } = this.props;
        navigateSimple(navigation, 'movieDetailScreen', {
            id
        });
    };
    renderMovieItem = (movieItemData) => {
        const { title, imdbID, poster } = movieItemData;
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
        React.createElement(MovieItemComponent, { title: title, imdbID: imdbID, poster: poster, onPressMovieItem: this.onPressMovieItem }));
    };
    isMoreDataAvailable = () => {
        const { moviesListStore } = this.props;
        const { moviesData } = moviesListStore;
        const { currentPageNumber, totalCount } = moviesData;
        const fetchedCount = currentPageNumber * 10;
        return fetchedCount < totalCount;
    };
    loadMoreMoviesListData = () => {
        const { moviesListStore } = this.props;
        const { updateCurrentPageNumber, getMoviesListData } = moviesListStore;
        log('loadMoreMoviesListDataloadMoreMoviesListData', this.isMoreDataAvailable());
        if (this.isMoreDataAvailable()) {
            updateCurrentPageNumber();
            getMoviesListData();
        }
    };
    renderFooterComponent = () => {
        log('renderFooterComponentrenderFooterComponent', this.isMoreDataAvailable());
        return (this.isMoreDataAvailable() && React.createElement(ActivityIndicator, { size: 'large', animating: true, color: '#1D7DEA', style: {
                marginVertical: 10
            } }));
    };
    componentWillUnmount() {
        const { navigation, moviesListStore } = this.props;
        log('componentWillUnmount is called');
        moviesListStore.resetMovieData();
    }
    onHeaderBackPress = () => {
        const { navigation, moviesListStore } = this.props;
        navigation.goBack();
    };
    onPressFilterIcon = () => {
        popupStore.showPopupComponent();
        popupStore.setPopuprenderingContent(() => React.createElement(MovieFilterComponent, null));
    };
    renderHeaderComponent = () => {
        const { moviesListStore } = this.props;
        const { searchText, moviesListData = [] } = moviesListStore;
        return (React.createElement(HeaderComponent, { showBackButton: true, showSearchBar: true, showFilterIcon: true, onBackButtonPress: this.onHeaderBackPress, defaultValue: searchText, onPressFilterIcon: this.onPressFilterIcon }));
    };
    renderMoviesList = () => {
        const { moviesListStore } = this.props;
        const { moviesListData = [] } = moviesListStore;
        return (React.createElement(FlatList, { style: {
                paddingHorizontal: 20
            }, data: moviesListData, renderItem: ({ item, index }) => this.renderMovieItem(item), keyExtractor: (item, index) => get(item, 'imdbID', index), numColumns: 2, ItemSeparatorComponent: () => (React.createElement(View, { style: {
                    marginBottom: 20
                } })), showsVerticalScrollIndicator: false, onEndReachedThreshold: 0.01, onEndReached: this.loadMoreMoviesListData, ListFooterComponent: this.renderFooterComponent }));
    };
    render() {
        const { moviesListStore } = this.props;
        log('moviesListStoremoviesListStore', moviesListStore);
        return (React.createElement(View, { style: styles.mainContainer },
            this.renderHeaderComponent(),
            this.renderMoviesList()));
    }
};
MovieListScreen = __decorate([
    inject('moviesListStore'),
    observer
], MovieListScreen);
export { MovieListScreen };
