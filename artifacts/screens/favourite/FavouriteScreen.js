import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { get } from 'lodash';
import { CustomText, MovieItemComponent } from '../../components';
import { log } from '../../config';
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
});
const favouriteScreen = inject('favMoviesListStore')(observer((props) => {
    useEffect(() => {
        const { favMoviesListStore } = props;
        favMoviesListStore.getFavMoviesList();
    }, []);
    const renderMovieItem = (movieItemData) => {
        const { title, imdbID, poster } = movieItemData;
        return (React.createElement(MovieItemComponent, { title: title, imdbID: imdbID, poster: poster }));
    };
    const renderHeaderComponent = () => {
        return (React.createElement(View, { style: styles.headerContainer },
            React.createElement(CustomText, { textStyle: styles.headerLabel }, "My Favourite Movies")));
    };
    const renderMoviesList = () => {
        const { favMoviesListStore } = props;
        const { savedFavMoviesList = [] } = favMoviesListStore;
        log('redner fav movoies list in render', savedFavMoviesList);
        return (React.createElement(FlatList, { ListHeaderComponent: renderHeaderComponent, data: savedFavMoviesList, renderItem: ({ item, index }) => renderMovieItem(item), keyExtractor: (item, index) => get(item, 'imdbID', index), numColumns: 2, ItemSeparatorComponent: () => (React.createElement(View, { style: {
                    marginBottom: 20
                } })), showsVerticalScrollIndicator: false }));
    };
    return (React.createElement(View, { style: styles.mainContainer }, renderMoviesList()));
}));
export { favouriteScreen as FavouriteScreen };
