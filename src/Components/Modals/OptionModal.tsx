import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {height, verticalScale, width} from '../../Dimensions';
import Colors from '../../Colors';
import Modal from 'react-native-modal';

type OptionModalProps = {
  data: boolean;
  onClose: () => void;
};

const OptionModal = ({data, onClose}: OptionModalProps) => {
  return (
    <Modal
      isVisible={data}
      animationIn="bounceInRight"
      animationOut="bounceOutRight"
      animationInTiming={1500} 
      animationOutTiming={1500}
      onBackdropPress={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={onClose}>
            <Text style={styles.optionText}>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onClose}>
            <Text style={styles.optionText}>About Developer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onClose}>
            <Text style={styles.optionText}>Resturants</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onClose}>
            <Text style={styles.optionText}>Meals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onClose}>
            <Text style={styles.optionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onClose}>
            <Text style={styles.optionText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OptionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: verticalScale(-15),
  },
  modalContainer: {
    width: width,
    height: height * 0.5,
    padding: verticalScale(20),
    backgroundColor: Colors.cardBackground,
    borderTopStartRadius: verticalScale(90),
    alignItems: 'center',
  },
  title: {
    fontSize: verticalScale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
    color: Colors.primaryText || '#000',
  },
  optionButton: {
    paddingVertical: verticalScale(10),
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: verticalScale(14),
    color: Colors.primaryText || '#000',
  },
  closeButton: {
    marginTop: verticalScale(15),
    paddingVertical: verticalScale(8),
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    color: Colors.primaryText,
    fontWeight: 'bold',
    fontSize: verticalScale(14),
  },
});
