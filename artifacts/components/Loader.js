import { inject, observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { log } from '../config';
const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.5,
        zIndex: 999
    }
});
const loader = inject('loaderDataStore')(observer((props) => {
    log('loaderloader value props', props);
    const { loaderDataStore } = props;
    const { showLoader = false } = loaderDataStore;
    return (showLoader ? React.createElement(View, { style: styles.mainContainer },
        React.createElement(ActivityIndicator, { size: 'large', animating: true, color: 'lightBlue' })) : null);
}));
export { loader as Loader };
