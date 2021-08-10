import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    inputTextContainer: {
        margin: 0,
        padding: 0,
        color: '#5f6068',
        borderBottomWidth: 0
    },
    mainContainer: {
        borderWidth: 1,
        borderColor: 'white'
    }
});
const inputTextWrapper = (props) => {
    const { inputValue = '', mainContainerStyle, ...restProps } = props;
    return (React.createElement(View, { style: [styles.mainContainer, mainContainerStyle] },
        React.createElement(TextInput, { style: styles.inputTextContainer, value: inputValue, ...restProps, selectionColor: '#5f6068' })));
};
export { inputTextWrapper as InputTextWrapper };
