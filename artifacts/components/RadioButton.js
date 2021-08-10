import React from 'react';
import { View, StyleSheet } from 'react-native';
const style = StyleSheet.create({
    outerCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerCircle: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: 'white'
    }
});
const RadioButtons = (props) => {
    return (React.createElement(View, { style: [style.outerCircle, props.outerCircleStyle] },
        React.createElement(View, { style: [style.innerCircle, props.innerCircleStyle] })));
};
export { RadioButtons };
