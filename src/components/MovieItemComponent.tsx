import React, { memo } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { CustomText, ImageComponent } from '.'
import { log } from '../config'

interface IProps {
  title: string
  imdbID: string
  poster: string
  onPressMovieItem?:(id) => void
}

const styles = StyleSheet.create({
  movieTitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    paddingTop: 10
  }
})

const propsAreEqual = (prevProps, currentProps) => {
  log('propsAreEqualpropsAreEqual', prevProps, currentProps)
  return true
}

export const movieItemComponent = memo((props: IProps) => {

  const onPressItem = () => {
    const { onPressMovieItem, imdbID }  = props
    if(onPressMovieItem) {
      onPressMovieItem(imdbID)
    }
  }



  const renderMovieItem = () => {
    const { title, imdbID, poster, onPressMovieItem } = props
    return (
      <TouchableOpacity style = {{
        flex: 0.5,
        alignItems: 'center'
      }}
      onPress = {() => onPressMovieItem(imdbID)}
      >
        <View style = {{
          height: 100,
          width: 100
        }}>
          <ImageComponent uri = {poster}/>
        </View>
        <CustomText textStyle = {styles.movieTitle}>{title}</CustomText>
      </TouchableOpacity>
    )
  }
  return (
    <>
      {renderMovieItem()}
    </>
  )
})

export {
  movieItemComponent as MovieItemComponent
}




