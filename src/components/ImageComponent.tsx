import React, { useEffect, useReducer } from 'react'
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { icons } from '../common/icons'
import { log } from '../config'
import { getImageAspectRatio } from '../utils/AppUtils'

const styles = StyleSheet.create({
  mainContainer: {

    height: '100%',
  },
  image: {
    height: '100%',
    width: '100%'
  },
  activityLoaderContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: '#f9f9f9'
	}
})

interface IProps {
  uri: string
}

const initialState = {
  isLoading: false,
  isError: false,
  imageHeight: 0,
  imageWidth: 0
}

const ACTION_TYPE = {
  UPDATE_LOADING_STATUS: 'UPDATE_LOADING_STATUS',
  UPDATE_ERROR_STATUS: 'UPDATE_ERROR_STATUS',
  UPDATE_IMAGE_CONFIG: 'UPDATE_IMAGE_CONFIG'
}

const reducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPE.UPDATE_LOADING_STATUS: {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case ACTION_TYPE.UPDATE_ERROR_STATUS: {
      return {
        ...state,
        isError: action.payload,
        isLoading: false
      }
    }
    default:
    return state
  }
}

const imageComponent = (props: IProps) => {
  const { uri } = props

  const [state, dispatch] = useReducer(reducer, initialState)
  const { isLoading, isError } = state

  // useEffect(() => {
  //   log('useEffectuseEffectuseEffect', uri)
  //     Image.getSize(uri, (width, height) => {
  //       log('image get size is called', width, height)
  //       dispatch({
  //         type: ACTION_TYPE.UPDATE_IMAGE_CONFIG,
  //         payload: {
  //           height,
  //           width
  //         }
  //       })
  //     }, (err) => {
  //       log('on error is called', err)
  //     })
  // }, [])

  const onLoadStart = () => {
    // log('onLoadStartonLoadStart')
    dispatch({
      type: ACTION_TYPE.UPDATE_LOADING_STATUS,
      payload: true
    })
  }

  const onLoadEnd = () => {
    // log('onLoadEndonLoadEnd')
    dispatch({
      type: ACTION_TYPE.UPDATE_LOADING_STATUS,
      payload: false
    })
  }

  const onError = () => {
    // log('onErroronErroronError')
    dispatch({
      type: ACTION_TYPE.UPDATE_ERROR_STATUS,
      payload: true
    })
  }

  const getImageConfig = () => {
    const { imageHeight, imageWidth } = state
    const ar = getImageAspectRatio(imageHeight, imageWidth) || 0
    // log('getImageConfiggetImageConfig', ar, state)
    // return {
    //   width: 100,
    //   height: ar * 100,
    // }
    return {
      height: '100%',
      width: '100%'
    }
  }

  return (
    <View style = {styles.mainContainer}>

     { isError ? <Image
        source = {icons.ERROR_IMAGE}
        style = {styles.image}
     /> : <Image
        source = {{
          uri,
          cache: 'force-cache'
        }}
        style = {styles.image}
        onLoadStart = {onLoadStart}
        onLoadEnd  = {onLoadEnd}
        onError = {onError}
        resizeMode = {'stretch'}
       />}
       {isLoading && (
         <View style = {styles.activityLoaderContainer}>
            <ActivityIndicator animating = {true} size = {'small'} color = {'lightBlue'}/>
         </View>
       )}
    </View>
  )
}

export {
  imageComponent as ImageComponent
}
