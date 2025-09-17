import React from 'react';
import { StyleSheet, View } from 'react-native';
import MessageImage from './MessageImage';
import File from 'components/File';

const Attachments: React.FC<any> = ({ item }) => {
  const isAllImage = item?.attachments?.every((att: any) =>
    att.type?.includes('image'),
  );

  return (
    <View style={styles.container}>
      {item?.attachments?.map((att: any, index: number) => {
        if (att?.type?.includes('image')) {
          return (
            <MessageImage
              isAllImage={isAllImage}
              item={item}
              image={att}
              index={index}
              key={index}
            />
          );
        }
        return <File att={att} key={index} />;
      })}
    </View>
  );
};

export default Attachments;

const styles = StyleSheet.create({
  container: { flexDirection: 'column', gap: 10 },
});
