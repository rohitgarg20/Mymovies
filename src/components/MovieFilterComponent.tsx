import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'

import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { RadioButtons } from '.'
import { popupStore } from '../store'
import { FILTER_KEYS, MoviesListStore } from '../store/movie-list-store'
import { CustomText } from './CustomText'

const styles = StyleSheet.create({
  outerCircleStyleRadioButtonSelected: {
    borderColor: '#1D7DEA'
  },
  outerCircleStyleRadioButtonNormal: {
    borderColor: '#B6B6B6'
  },
  innerCircleStyleRadioButtonSelected: {
    backgroundColor: '#1D7DEA',
    height: 12,
    width: 12
  },
  filterItemView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerButtonContainerMobile: {
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: 'white',

    flexDirection: 'row',

  },
  borderButton: {
    backgroundColor: '#1D7DEA',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginLeft: 10
  },
  footerButtonLabel: {
    fontSize: 16,
    color: 'lightgrey',
    lineHeight: 20,
    paddingHorizontal: 20
  },
  cancelButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
})

interface IProps {

  moviesListStore?: MoviesListStore
}

const movieFilterComponent = inject('moviesListStore')(observer((props: IProps) => {
  const renderRadioButton = (isSelected) => {
    return <RadioButtons
                  outerCircleStyle={isSelected ? styles.outerCircleStyleRadioButtonSelected : styles.outerCircleStyleRadioButtonNormal}
                  innerCircleStyle={isSelected ? styles.innerCircleStyleRadioButtonSelected : {}}
                />
  }

  useEffect(() => {
    const { moviesListStore } = props
      moviesListStore.setInitialFilterData()
  }, [])

  const updateSelectedFilter = (key) => {
    const { moviesListStore } = props
    moviesListStore.updateSelectedFilterData(key)
  }

  const onPressApplyFilter = () => {
    const { moviesListStore } = props
    moviesListStore.onPressApplyFilterButton()
    popupStore.hidePopupComponent()

  }

  const onCancelFilter = () => {
    popupStore.hidePopupComponent()
  }

  const onPressResetFilter = () => {
    const { moviesListStore } = props
    popupStore.hidePopupComponent()
    moviesListStore.onPressReset()

  }

  const renderFooterButton = () => {
    return (
      <View style = {styles.footerButtonContainerMobile}>
        <TouchableOpacity style = {styles.borderButton} onPress = {onPressApplyFilter}>
          <CustomText textStyle = {styles.footerButtonLabel}>Apply</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.borderButton} onPress = {onPressResetFilter}>
          <CustomText textStyle = {styles.footerButtonLabel}>Reset</CustomText>
        </TouchableOpacity>
      </View>
    )
  }



  const renderFilterView = () => {
    const { moviesListStore } = props
    const { filterData } = moviesListStore
    return (
      <FlatList
        ListHeaderComponent = {() => (
          <TouchableOpacity style = {styles.cancelButton} onPress = {onCancelFilter}>
          <CustomText textStyle = {styles.footerButtonLabel}>Cancel</CustomText>
        </TouchableOpacity>
        )}
        data = {Object.keys(filterData[FILTER_KEYS.FILTER_TYPE][FILTER_KEYS.FILTERS_LIST])}
        renderItem = {({item, index}) => {
          const { key, isSelected, display: displayName} = filterData[FILTER_KEYS.FILTER_TYPE][FILTER_KEYS.FILTERS_LIST][item]
          return (
            <TouchableOpacity style = {styles.filterItemView} onPress = {() => updateSelectedFilter(key)}>
              {renderRadioButton(isSelected)}
              <CustomText textStyle = {{
                paddingLeft: 10
              }}>{displayName}</CustomText>
            </TouchableOpacity>
          )
        }}
        keyExtractor = {(item, index) => item }
        ItemSeparatorComponent = {() => <View style = {{ paddingBottom: 20 }}/>}
      />
    )
  }
  return (
    <View>
      {renderFilterView()}
      {renderFooterButton()}
    </View>
  )
}))

export {
  movieFilterComponent as MovieFilterComponent
}
