import React from 'react';
import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
   container: {
       width: '100%',
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       marginBottom: '5%',
   },
   title: {
       color: 'white',
       fontWeight: 'bold',
       fontSize: 18
   },
    description: {
       color: 'grey',
       fontSize: 15
    }
});