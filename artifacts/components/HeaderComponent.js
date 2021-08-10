import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CustomText } from './CustomText';
import { get } from 'lodash';
import { icons } from '../common/icons';
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#1c1d28',
        paddingVertical: 10
    },
    inputTextContainer: {
        backgroundColor: '#2a2b37',
        borderRadius: 8,
        paddingVertical: 5,
        borderColor: '#2a2b37',
        borderWidth: 0,
        paddingHorizontal: 5,
        width: '80%'
    },
    backIcon: {
        height: 20,
        width: 20
    },
    backContainer: {
        paddingRight: 10
    },
    filterContainer: {
        paddingLeft: 10
    }
});
const headerComponent = (props) => {
    const { headerLabel = '', showBackButton = false, showSearchBar = false, showFilterIcon = false } = props;
    const onPressSearchBar = () => {
        const { onPressSearchBar } = props;
        if (onPressSearchBar) {
            onPressSearchBar();
        }
    };
    const onPressBackIcon = () => {
        const { onBackButtonPress } = props;
        if (onBackButtonPress) {
            onBackButtonPress();
        }
    };
    const renderSearchBar = () => {
        const { defaultValue } = props;
        return (React.createElement(TouchableOpacity, { style: styles.inputTextContainer, onPress: onPressSearchBar },
            React.createElement(CustomText, null, defaultValue)));
    };
    const renderBackIcon = () => {
        return (React.createElement(TouchableOpacity, { onPress: onPressBackIcon, style: styles.backContainer },
            React.createElement(Image, { source: icons.BACK_WHITE_ARROW, style: styles.backIcon, resizeMode: 'contain' })));
    };
    const renderHeaderLabel = () => {
        const { headerLabel } = props;
        return (React.createElement(View, null,
            React.createElement(CustomText, null, headerLabel)));
    };
    const onPressFilterIcon = () => {
        const { onPressFilterIcon } = props;
        if (onPressFilterIcon) {
            onPressFilterIcon();
        }
    };
    const renderFilterIcon = () => {
        return (React.createElement(TouchableOpacity, { onPress: onPressFilterIcon, style: styles.filterContainer },
            React.createElement(Image, { source: icons.FILTER_ICOM, style: styles.backIcon, resizeMode: 'contain' })));
    };
    return (React.createElement(View, { style: styles.mainContainer },
        showBackButton && renderBackIcon(),
        get(headerLabel, 'length', 0) > 0 && renderHeaderLabel(),
        showSearchBar && renderSearchBar(),
        showFilterIcon && renderFilterIcon()));
};
export { headerComponent as HeaderComponent };
