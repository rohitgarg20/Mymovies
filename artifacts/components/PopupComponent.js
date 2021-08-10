import { inject, observer } from 'mobx-react';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { log } from '../config';
const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        right: 0,
        top: 0,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(52, 52, 52, 0.6)'
    },
    popupComponent: {
        maxHeight: 300,
        backgroundColor: 'white',
        borderTopEndRadius: 5,
        borderTopLeftRadius: 5,
        padding: 20
    },
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
    }
});
export const popupComponent = inject('popupStore')(observer((props) => {
    const { popupStore } = props;
    const { showPopup, popupRenderingContent: RenderingContent } = popupStore;
    log('showPopupshowPopupshowPopup', showPopup);
    return (showPopup ? React.createElement(View, { style: styles.mainContainer },
        React.createElement(View, { style: styles.popupComponent },
            React.createElement(RenderingContent, null))) : null);
}));
export { popupComponent as PopupComponent };
