import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { verticalScale } from '../../Dimensions'
import Colors from '../../Colors'
import { MoreIcon } from '../../assets/Icons'
import OptionModal from '../Modals/OptionModal'

const MenuButton = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.MainContainer}
        onPress={() => setModalVisible(true)}
      >
        <Image source={MoreIcon} style={styles.menuIcon} />
      </TouchableOpacity>
      <OptionModal data={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}

export default MenuButton

const styles = StyleSheet.create({
    MainContainer: {
        height:verticalScale(45),
        width:verticalScale(45),
        borderRadius: verticalScale(50),
        elevation: 10,
        backgroundColor: Colors.primaryText,
        justifyContent:'center',
        alignItems:'center',
    },
    menuIcon: {
        height:verticalScale(25),
        width: verticalScale(25),
        tintColor:'#fff'
    }
})