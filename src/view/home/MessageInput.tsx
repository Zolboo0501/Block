import { Attachment, Gallery, Send } from '@icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import RenderImages from './RenderImages';

const MessageInput: React.FC<any> = ({
  text,
  setText,
  files,
  onSend,
  onImage,
  setFiles,
}) => {
  return (
    <View style={styles.container}>
      <RenderImages files={files} setFiles={setFiles} />
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
        <TouchableOpacity onPress={() => onImage()} style={styles.padding}>
          <Gallery />
        </TouchableOpacity>
        <TouchableOpacity style={styles.padding}>
          <Attachment />
        </TouchableOpacity>
        {(text.trim().length > 0 || files.length > 0) && (
          <TouchableOpacity style={styles.send} onPress={onSend}>
            <Send size={18} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  padding: {
    padding: 3,
  },
  container: {
    gap: 10,
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
  send: {
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    paddingLeft: 6,
  },
});
