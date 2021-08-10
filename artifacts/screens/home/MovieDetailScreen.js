import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { log } from '../../config';
import { get } from 'lodash';
import { inject, observer } from 'mobx-react';
import { CustomText, ImageComponent } from '../../components';
import { strings } from '../../common';
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
});
export const movieDetailScreen = inject('movieDetailStore')(observer((props) => {
    const { navigation, route, movieDetailStore } = props;
    const movieIDMbid = get(route, 'params.id', '');
    useEffect(() => {
        movieDetailStore.setIMDbID(movieIDMbid);
        movieDetailStore.getMovieDetailData();
        return () => {
            movieDetailStore.init();
        };
    }, [movieIDMbid]);
    const { movieDetailData } = movieDetailStore;
    log('movieDetailDatamovieDetailDatamovieDetailData', movieDetailData);
    const renderMovieImage = () => {
        const { poster } = movieDetailData;
        return (React.createElement(View, { style: styles.imageContainer },
            React.createElement(ImageComponent, { uri: poster })));
    };
    const onAddMovieToFavSection = () => {
        movieDetailStore.saveMovieToRealm();
    };
    const renderAddToFavouritesButton = () => {
        const { ADD_TO_FAV, REMOVE_FROM_FAV } = strings.MOVIE_DETAILSCREEN;
        const { isLiked = false } = movieDetailData;
        const textToShow = isLiked ? REMOVE_FROM_FAV : ADD_TO_FAV;
        return (React.createElement(TouchableOpacity, { style: styles.likeButton, onPress: () => onAddMovieToFavSection() },
            React.createElement(CustomText, { textStyle: styles.buttonLabel },
                " ",
                textToShow)));
    };
    const renderMovieHeading = () => {
        const { title, released, runTime } = movieDetailData;
        return (React.createElement(View, { style: styles.headingContainer },
            React.createElement(CustomText, { textStyle: styles.movieTitle }, title),
            React.createElement(View, { style: styles.movieTitleSubContainer },
                React.createElement(View, { style: styles.subheadingContainer },
                    React.createElement(CustomText, { textStyle: styles.subLabel }, released),
                    React.createElement(View, { style: styles.dotted }),
                    React.createElement(CustomText, { textStyle: styles.subLabel },
                        runTime,
                        " ")),
                renderAddToFavouritesButton())));
    };
    const renderMovieInfo = () => {
        const { plot } = movieDetailData;
        return (React.createElement(View, { style: styles.movieInfoContainer },
            React.createElement(CustomText, { textStyle: styles.movieInfoHeading }, "About"),
            React.createElement(CustomText, { textStyle: styles.movieInfoContent }, plot)));
    };
    const renderGenresSection = () => {
        const { genre = [] } = movieDetailData;
        return (React.createElement(View, { style: styles.movieInfoContainer },
            React.createElement(CustomText, { textStyle: styles.movieInfoHeading }, "Genres"),
            React.createElement(FlatList, { horizontal: true, data: genre, renderItem: ({ item, index }) => (React.createElement(View, { style: styles.genreContainer },
                    React.createElement(CustomText, { textStyle: styles.movieInfoContent }, item))), ItemSeparatorComponent: () => React.createElement(View, { style: styles.itemSeparator }) })));
    };
    const renderMovieDetailsComponent = () => {
        const { movieInfo = {} } = movieDetailData;
        return (React.createElement(View, { style: styles.movieInfoContainer },
            React.createElement(CustomText, { textStyle: styles.movieInfoHeading }, "Movie Info"),
            React.createElement(FlatList, { data: Object.keys(movieInfo), renderItem: ({ item: key, index }) => {
                    const { heading, value } = movieInfo[key];
                    return (React.createElement(View, { style: styles.basicInfoContainer },
                        React.createElement(View, { style: { flex: 1 } },
                            React.createElement(CustomText, { textStyle: styles.subLabel },
                                heading,
                                ":")),
                        React.createElement(View, { style: { flex: 1 } },
                            React.createElement(CustomText, { textStyle: styles.movieInfoContent }, value))));
                }, keyExtractor: (item, index) => {
                    return item || index.toString();
                }, ItemSeparatorComponent: () => React.createElement(View, { style: styles.basicInfoSeparator }) })));
    };
    return (React.createElement(ScrollView, { style: {
            flex: 1,
            backgroundColor: '#1c1d28',
            paddingBottom: 20
        } },
        renderMovieImage(),
        React.createElement(View, { style: { paddingHorizontal: 10 } },
            renderMovieHeading(),
            renderMovieInfo(),
            renderGenresSection(),
            renderMovieDetailsComponent())));
}));
export { movieDetailScreen as MovieDetailScreen };
