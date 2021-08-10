import React from 'react';
import { View, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.6)'
    }
});
export const drawerComponent = () => {
    return (React.createElement(View, { style: styles.mainContainer }));
};
