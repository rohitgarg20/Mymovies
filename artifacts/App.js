/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { observer, Provider } from 'mobx-react';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Loader, PopupComponent } from './components';
import { routerGenerator } from './navigator';
import stores, { navigationStore } from './store';
const services = [
    React.createElement(Loader, null),
    React.createElement(PopupComponent, null)
];
const app = observer(() => {
    useEffect(() => {
        routerGenerator();
    }, []);
    const { currentStackName, router: Router } = navigationStore;
    console.log('currentStackNamecurrentStackName', currentStackName, Router);
    return (React.createElement(Provider, { ...stores }, Router ?
        React.createElement(View, { style: {
                flex: 1
            } },
            React.createElement(Router, null),
            services.map((item) => item)) : React.createElement(View, { style: {
            flex: 1
        } },
        React.createElement(Text, null, "App file is"))));
});
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});
export { app as App };
/**
* @format
*/ 
