import React, { memo } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { CustomText, ImageComponent } from '.';
import { log } from '../config';
const styles = StyleSheet.create({
    movieTitle: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        paddingTop: 10
    }
});
const propsAreEqual = (prevProps, currentProps) => {
    log('propsAreEqualpropsAreEqual', prevProps, currentProps, prevProps.onPressMovieItem === currentProps.onPressMovieItem);
    return true;
};
const movieItemComponent = (props) => {
    const onPressItem = () => {
        const { onPressMovieItem, imdbID } = props;
        if (onPressMovieItem) {
            onPressMovieItem(imdbID);
        }
    };
    log('renderMovieItemrenderMovieItem is called');
    const renderMovieItem = () => {
        const { title, imdbID, poster, onPressMovieItem } = props;
        return (React.createElement(TouchableOpacity, { style: {
                flex: 0.5,
                alignItems: 'center'
            }, onPress: () => onPressMovieItem(imdbID) },
            React.createElement(View, { style: {
                    height: 100,
                    width: 100
                } },
                React.createElement(ImageComponent, { uri: poster })),
            React.createElement(CustomText, { textStyle: styles.movieTitle }, title)));
    };
    return (React.createElement(React.Fragment, null, renderMovieItem()));
};
const MovieItemComponent = memo(movieItemComponent);
export { MovieItemComponent };
