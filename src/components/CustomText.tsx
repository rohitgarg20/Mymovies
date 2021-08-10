import React from 'react'

import { View, Text, TextProps } from 'react-native';

interface IProps extends TextProps {
  textStyle?: any
  children: any
}

const customText = (props: IProps) => {
  const { textStyle, children, ...restProps } = props
  return (
    <View>
      <Text style = {textStyle} {...restProps}>
        {props.children}
      </Text>
    </View>
    )
}

export {
  customText as CustomText
}
