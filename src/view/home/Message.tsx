import { WIDTH } from '@utils';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Message: React.FC<any> = ({ item }) => {
  const renderDate = () => {
    const now = dayjs();
    const messageTime = dayjs(item.createdAt);

    const diffMinutes = now.diff(messageTime, 'minute');
    const diffHours = now.diff(messageTime, 'hour');
    const diffDays = now.diff(messageTime, 'day');

    if (diffDays === 0) {
      if (diffMinutes < 1) return 'Just now';
      if (diffHours === 0) return `${diffMinutes} minutes ago`;
      if (diffHours < 12 && diffHours > 0) return `${diffHours} hours ago`;
      return messageTime.format('HH:mm'); // same day but older than 12h
    }

    if (diffDays === 1) return 'Yesterday';
    if (diffDays === 2) return 'The day before yesterday';

    return messageTime.format('YYYY.MM.DD');
  };

  return (
    <View style={styles.container}>
      <TextView fontSize={12} color="#666666">
        {renderDate()}
      </TextView>
      <View style={styles.messageContainer}>
        <TextView>{item?.content}</TextView>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: { alignItems: 'flex-end', gap: 10 },
  messageContainer: {
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    maxWidth: WIDTH - 100,
  },
});
