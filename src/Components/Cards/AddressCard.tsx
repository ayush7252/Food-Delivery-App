import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../../Colors';

type AddressItem = {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string | number;
};

type AddressCardProps = {
  data: AddressItem;
  selected?: boolean;
  onPress?: () => void;
};

const AddressCard = ({ data, selected = false, onPress }: AddressCardProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.MainContainer,
        selected && { borderColor: '#b8b8b8', borderWidth: 2 },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={selected}
    >
      <Text style={styles.cardTitle}>{data.name}</Text>
      <Text style={styles.cardField}>Phone: {data.phone}</Text>
      <Text style={styles.cardField}>{data.line1}</Text>
      {data.line2 ? <Text style={styles.cardField}>{data.line2}</Text> : null}
      <Text style={styles.cardField}>
        {data.city}, {data.state} {data.zip}
      </Text>
    </TouchableOpacity>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent', // default border
  },
  cardTitle: {
    fontSize: 16,
    color: Colors.primaryText,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  cardField: {
    fontSize: 13,
    color: Colors.primaryText,
    fontFamily: 'Poppins-Regular',
    marginBottom: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.primaryText,
    fontFamily: 'Poppins-Regular',
    opacity: 0.7,
  },
});