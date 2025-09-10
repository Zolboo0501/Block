/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { Attachment, Microphone, Send } from '@icons';
import { FlashList } from '@shopify/flash-list';
import TextView from 'components/TextView';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Header from 'view/home/Header';
import Message from 'view/home/Message';
import UserMessage from 'view/home/UserMessage';

const suggest = [
  'I’d like to reserve  a VIP table',
  'Arrange chauffeur pickup',
  'Request custom drinks',
];

const Home: React.FC<any> = ({ navigation, route }) => {
  const textFromChats = route.params?.text;
  const [text, setText] = React.useState('');
  const scrollRef = useRef<any>(null);

  const [message, setMessage] = useState<any>([
    {
      text: 'Goodmorning',
      date: new Date('2025-08-24'),
      type: 'me',
    },
    {
      text: 'Good morning.! How are you today?',
      date: new Date('2025-08-24'),
      type: 'user',
    },
    {
      text: 'I’m fine, thank you. And you?',
      date: new Date('2025-08-21'),
      type: 'me',
    },
  ]);

  useEffect(() => {
    if (message.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [message]);

  useEffect(() => {
    if (textFromChats) {
      onSend(textFromChats);
    }
  }, [textFromChats]);

  const onSend = (value?: string) => {
    if (value) {
      setMessage((prev: any) => [
        ...prev,
        { text: value, date: new Date(), type: 'me' },
      ]);
    } else {
      setMessage((prev: any) => [
        ...prev,
        { text, date: new Date(), type: 'me' },
      ]);
    }

    setText('');
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 600);
  };

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'user') {
      return <UserMessage item={item} />;
    }
    return <Message item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <KeyboardAwareScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.space}>
            <View style={[styles.container, { paddingVertical: 10 }]}>
              <View style={styles.center}>
                <TextView center>
                  Charon, your personal concierge – How may I assist you today?
                </TextView>
              </View>
              <View style={styles.column}>
                {suggest.map((item: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.select}
                    onPress={() => onSend(item)}
                  >
                    <TextView>{item}</TextView>
                  </TouchableOpacity>
                ))}
              </View>
              <FlashList
                data={message}
                keyExtractor={(_, index: number) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  value={text}
                  style={styles.input}
                  placeholder="Type message..."
                  placeholderTextColor={'#DEDEDE'}
                  onChangeText={(value: string) => setText(value)}
                  onSubmitEditing={() => {
                    onSend();
                  }}
                />
                <TouchableOpacity>
                  <Microphone />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Attachment />
                </TouchableOpacity>
                {text.trim().length > 0 && (
                  <TouchableOpacity
                    style={styles.send}
                    onPress={() => onSend()}
                  >
                    <Send size={18} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1 },
  select: {
    backgroundColor: '#333333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  send: {
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    paddingLeft: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 20,
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  space: { paddingHorizontal: 15, flex: 1 },
  center: { alignSelf: 'center', width: '80%' },
  column: {
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
  },
});
