import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RadioButtons } from '.';
import { popupStore } from '../store';
import { FILTER_KEYS } from '../store/movie-list-store';
import { CustomText } from './CustomText';
const styles = StyleSheet.create({
    outerCircleStyleRadioButtonSelected: {
        borderColor: '#1D7DEA'
    },
    outerCircleStyleRadioButtonNormal: {
        borderColor: '#B6B6B6'
    },
    innerCircleStyleRadioButtonSelected: {
        backgroundColor: '#1D7DEA',
        height: 12,
        width: 12
    },
    filterItemView: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center'
    },
    footerButtonContainerMobile: {
        justifyContent: 'flex-end',
        paddingRight: 10,
        paddingTop: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    borderButton: {
        backgroundColor: '#1D7DEA',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginLeft: 10
    },
    footerButtonLabel: {
        fontSize: 16,
        color: 'lightgrey',
        lineHeight: 20,
        paddingHorizontal: 20
    },
    cancelButton: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
});
const movieFilterComponent = inject('moviesListStore')(observer((props) => {
    const renderRadioButton = (isSelected) => {
        return React.createElement(RadioButtons, { outerCircleStyle: isSelected ? styles.outerCircleStyleRadioButtonSelected : styles.outerCircleStyleRadioButtonNormal, innerCircleStyle: isSelected ? styles.innerCircleStyleRadioButtonSelected : {} });
    };
    useEffect(() => {
        const { moviesListStore } = props;
        moviesListStore.setInitialFilterData();
    }, []);
    const updateSelectedFilter = (key) => {
        const { moviesListStore } = props;
        moviesListStore.updateSelectedFilterData(key);
    };
    const onPressApplyFilter = () => {
        const { moviesListStore } = props;
        moviesListStore.onPressApplyFilterButton();
        popupStore.hidePopupComponent();
    };
    const onCancelFilter = () => {
        popupStore.hidePopupComponent();
    };
    const onPressResetFilter = () => {
        const { moviesListStore } = props;
        popupStore.hidePopupComponent();
        moviesListStore.onPressReset();
    };
    const renderFooterButton = () => {
        return (React.createElement(View, { style: styles.footerButtonContainerMobile },
            React.createElement(TouchableOpacity, { style: styles.borderButton, onPress: onPressApplyFilter },
                React.createElement(CustomText, { textStyle: styles.footerButtonLabel }, "Apply")),
            React.createElement(TouchableOpacity, { style: styles.borderButton, onPress: onPressResetFilter },
                React.createElement(CustomText, { textStyle: styles.footerButtonLabel }, "Reset"))));
    };
    const renderFilterView = () => {
        const { moviesListStore } = props;
        const { filterData } = moviesListStore;
        return (React.createElement(FlatList, { ListHeaderComponent: () => (React.createElement(TouchableOpacity, { style: styles.cancelButton, onPress: onCancelFilter },
                React.createElement(CustomText, { textStyle: styles.footerButtonLabel }, "Cancel"))), data: Object.keys(filterData[FILTER_KEYS.FILTER_TYPE][FILTER_KEYS.FILTERS_LIST]), renderItem: ({ item, index }) => {
                const { key, isSelected, display: displayName } = filterData[FILTER_KEYS.FILTER_TYPE][FILTER_KEYS.FILTERS_LIST][item];
                return (React.createElement(TouchableOpacity, { style: styles.filterItemView, onPress: () => updateSelectedFilter(key) },
                    renderRadioButton(isSelected),
                    React.createElement(CustomText, { textStyle: {
                            paddingLeft: 10
                        } }, displayName)));
            }, keyExtractor: (item, index) => item, ItemSeparatorComponent: () => React.createElement(View, { style: { paddingBottom: 20 } }) }));
    };
    return (React.createElement(View, null,
        renderFilterView(),
        renderFooterButton()));
}));
export { movieFilterComponent as MovieFilterComponent };
