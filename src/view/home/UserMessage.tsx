import TextView from 'components/TextView';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const UserMessage: React.FC<any> = ({ item }) => {
  const renderDate = () => {
    const now = dayjs();
    const messageTime = dayjs(item.date);

    const diffMinutes = now.diff(messageTime, 'minute');
    const diffHours = now.diff(messageTime, 'hour');
    const diffDays = now.diff(messageTime, 'day');

    if (diffDays === 0) {
      if (diffMinutes < 1) return 'Just now';
      if (diffHours < 12) return `${diffHours} hours ago`;
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
        <TextView>{item.text}</TextView>
      </View>
    </View>
  );
};

export default UserMessage;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  messageContainer: {
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
});
