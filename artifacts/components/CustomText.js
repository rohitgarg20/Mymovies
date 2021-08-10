import React from 'react';
import { View, Text } from 'react-native';
const customText = (props) => {
    const { textStyle, children, ...restProps } = props;
    return (React.createElement(View, null,
        React.createElement(Text, { style: textStyle, ...restProps }, props.children)));
};
export { customText as CustomText };
