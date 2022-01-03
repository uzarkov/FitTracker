import React from 'react';
import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendContainer: {
    justifyContent: 'center',
    paddingLeft: 15,
    width: '45%'
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  itemColor: {
    width: 18,
    height: 18,
    borderRadius: 10,
    marginRight: 3,
  },
  itemText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  }
})

