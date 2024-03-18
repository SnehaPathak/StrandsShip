import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
// import { useTheme } from '../../../theming'
// import dynamicStyles from './styles'
import { Colors } from '../styles/Index'

export const CountriesModalPicker = props => {
//   const { theme, appearance } = useTheme()
   const styles = dropDownStyles;

  const [animationType, setAnimationType] = useState('slide')
  const [modalVisible, setModalVisible] = useState(false)
  const [selected, setSelected] = useState('please select')
  const [data, setData] = useState([])
  const modal = useRef(null)

  useEffect(() => {
    setSelected(props.initValue)
    setData(props.data)
    setModalVisible(props.visible)
  })

  const close = () => {
    setModalVisible(false)
  }

  const onChange = (item) => {
    props.onChange(item)
    setSelected(item.label)
    props.onCancel()
  }

  const renderOption = (option) => {
    return (
      <TouchableOpacity key={option.key} onPress={() => onChange(option)}>
        <View style={[styles.optionStyle, props.optionStyle]}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={[styles.optionTextStyle, props.optionTextStyle]}>
              {option.value}
            </Text>
          </View>
          {/* <Text style={[styles.optionTextStyle, props.optionTextStyle]}>
            {option.dialCode}
          </Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  const renderOptionList = () => {
    const options = data.map(item => {
      return renderOption(item)
    })

    return (
      <View
        style={[styles.overlayStyle, props.overlayStyle]}
        // key={`modalPicker${componentIndex++}`}
      >
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ paddingHorizontal: 10 }}>{options}</View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={() => props.onCancel()}>
            <View style={[styles.cancelStyle, props.cancelStyle]}>
              <Text style={[styles.cancelTextStyle, props.cancelTextStyle]}>
                {props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const dp = (
    <Modal
      transparent
      ref={modal}
      visible={modalVisible}
      onRequestClose={close}
      animationType="slide">
      {renderOptionList()}
    </Modal>
  )

  return <View style={props.style}>{dp}</View>
}

CountriesModalPicker.defaultProps = {
  data: [],
  onChange: () => {},
  initValue: 'Select me!',
  style: {},
  selectStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: 'cancel',
}

const { height, width } = Dimensions.get('window')
const PADDING = 8
const BORDER_RADIUS = 5
const FONT_SIZE = 16
const OPTION_CONTAINER_HEIGHT = 400
const dropDownStyles =  StyleSheet.create({
    overlayStyle: {
      width: '100%',
      height: '100%',
      backgroundColor: '#000000bb',
    },

    optionContainer: {
      borderRadius: BORDER_RADIUS,
      width: width * 0.8,
      height: OPTION_CONTAINER_HEIGHT,
      backgroundColor: Colors.PRIMARY_BLUE,
      left: width * 0.1,
      top: (height - OPTION_CONTAINER_HEIGHT) / 2,
    },

    cancelContainer: {
      left: width * 0.1,
      top: (height - OPTION_CONTAINER_HEIGHT) / 2 + 10,
    },

    cancelStyle: {
      borderRadius: BORDER_RADIUS,
      width: width * 0.8,
      backgroundColor: Colors.GREEN_LIGHT,
      padding: PADDING,
    },

    cancelTextStyle: {
      textAlign: 'center',
      fontSize: FONT_SIZE,
      color: Colors.GREY_LIGHT
    },

    optionStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: PADDING,
      borderBottomWidth: 1,
      borderBottomColor: Colors.RED_BRIGHT
    },

    optionTextStyle: {
      color: "white",
      fontSize: 14,
    },

    sectionStyle: {
      padding: PADDING * 2,
      borderBottomWidth: 1,
      borderBottomColor: Colors.PRIMARY_GREEN,
    },

    sectionTextStyle: {
      textAlign: 'center',
      fontSize: FONT_SIZE,
    },
  })