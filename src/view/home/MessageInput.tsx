import { Attachment, Microphone, Send } from '@icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const MessageInput: React.FC<any> = ({ text, setText, onSend }) => {
  return (
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
        <TouchableOpacity style={styles.send} onPress={() => onSend()}>
          <Send size={18} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
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
  send: {
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    paddingLeft: 6,
  },
});
