import React from 'react'
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native'

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
})

interface IProps extends TextInputProps {
  inputValue?: string
  mainContainerStyle?: any
}

const inputTextWrapper = (props: IProps) => {
  const { inputValue = '', mainContainerStyle, ...restProps } = props
  return (
    <View style = {[styles.mainContainer, mainContainerStyle]}>
      <TextInput
        style = {styles.inputTextContainer}
        value =   { inputValue }
        {...restProps}
        selectionColor = {'#5f6068'}

      />
    </View>
  )
}

export {
  inputTextWrapper as InputTextWrapper
}
