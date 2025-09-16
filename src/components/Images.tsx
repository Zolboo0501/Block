import React from 'react';
import { StyleSheet, View } from 'react-native';
import MessageImage from './MessageImage';

const Images: React.FC<any> = ({ item }) => {
  return (
    <View style={styles.container}>
      {item?.attachments?.map((image: any, index: number) => {
        return (
          <MessageImage item={item} image={image} index={index} key={index} />
        );
      })}
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  container: { flexDirection: 'column', gap: 10 },
});
