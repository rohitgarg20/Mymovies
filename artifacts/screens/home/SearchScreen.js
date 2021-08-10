import React, { useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { strings } from '../../common';
import { CustomText, InputTextWrapper } from '../../components';
import { hideLoader, navigateSimple, showLoader } from '../../service';
import { moviesListStore } from '../../store';
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1c1d28',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    headingStyle: {
        fontSize: 20,
        lineHeight: 28,
        color: 'white',
        textAlign: 'center'
    },
    inputTextContainer: {
        backgroundColor: '#2a2b37',
        borderRadius: 8,
        marginVertical: 20,
        paddingVertical: 5,
        borderColor: '#2a2b37',
        borderWidth: 0,
        paddingHorizontal: 5,
        width: '100%'
    },
    buttonContainer: {
        justifyContent: 'center',
        backgroundColor: '#dba106',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 18
    },
    buttonLabel: {
        color: '#212026',
        fontSize: 14,
        fontWeight: 'bold'
    }
});
const searchScreen = ({ navigation }) => {
    const { SEARCH_SCREEN } = strings;
    const { HEADING, BUTTON_TEXT, SEARCH_PLACEHOLDER } = SEARCH_SCREEN;
    const [searchVal, setSearchValue] = useState('');
    const callBackOnSuccess = () => {
        hideLoader();
        navigateSimple(navigation, 'tabBar');
    };
    const getMoviesList = () => {
        Keyboard.dismiss();
        showLoader();
        moviesListStore.setSearchTextVal(searchVal);
        moviesListStore.getMoviesListData(callBackOnSuccess);
    };
    return (React.createElement(View, { style: styles.mainContainer },
        React.createElement(CustomText, { textStyle: styles.headingStyle }, HEADING),
        React.createElement(InputTextWrapper, { mainContainerStyle: styles.inputTextContainer, inputValue: searchVal, onChangeText: (value) => setSearchValue(value), placeholder: SEARCH_PLACEHOLDER, placeholderTextColor: '#5f6068' }),
        React.createElement(TouchableOpacity, { style: styles.buttonContainer, onPress: getMoviesList },
            React.createElement(CustomText, { textStyle: styles.buttonLabel }, BUTTON_TEXT))));
};
export { searchScreen as SearchScreen };
