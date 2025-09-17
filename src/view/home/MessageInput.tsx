import { Attachment, Gallery, Send } from '@icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import RenderAttachments from './RenderAttachments';
import { launchImageLibrary } from 'react-native-image-picker';
import useAlert from 'hooks/useAlert';
import Processing from 'components/Processing';
import { uploadHandler } from '@utils';
import { isErrorWithCode, pick, types } from '@react-native-documents/picker';

const MessageInput: React.FC<any> = ({
  text,
  setText,
  files,
  onSend,
  setFiles,
  scrollRef,
}) => {
  const [isUploading, onUploading] = useState(false);

  const alert = useAlert();

  const onStart = () => {
    setTimeout(() => {
      onUploading(true);
    }, 1000);
  };

  const onError = (message: string) => {
    console.log(message);
    setTimeout(() => onUploading(false), 2000);
    setTimeout(() => alert.onError(message), 3500);
  };

  const onEnd = (result?: any, file?: any) => {
    if (result.status === 200) {
      if (files.length === 0) {
        setTimeout(
          () => scrollRef.current?.scrollToEnd({ animated: true }),
          600,
        );
      }
      const fileConvert = {
        name: file?.name,
        size: file?.size,
        type: file?.type,
        url: result?.data,
      };
      setFiles((prev: any) => [...prev, fileConvert]);
    }
    setTimeout(() => {
      onUploading(false);
    }, 1000);
  };

  const onImage = async () => {
    const result: any = await launchImageLibrary({
      mediaType: 'mixed',
    });

    if (result.errorCode) {
      return alert.onError(result.errorCode);
    }

    if (result.didCancel) {
      return;
    }

    if (files.length === 0) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 600);
    }
    const file = {
      name: result.assets[0].fileName,
      size: result.assets[0].fileSize,
      type: result.assets[0].type,
      uri: result?.assets[0]?.uri,
    };

    uploadHandler({
      file,
      event: (event: any) => {
        console.log(Math.round((100 * event.loaded) / event.total));
      },
      onStart,
      onError,
      onEnd,
    });
  };

  const onAttachment = async () => {
    try {
      const [result] = await pick({
        type: [types.allFiles],
        mode: 'open',
      });
      if (result.error) {
        return alert.onError(result.error);
      }

      const file = {
        name: result.name,
        size: result.size,
        type: result.type,
        uri: result.uri,
      };

      uploadHandler({
        file,
        event: (event: any) => {
          console.log(Math.round((100 * event.loaded) / event.total));
        },
        onStart,
        onError,
        onEnd,
      });
    } catch (err: any) {
      if (isErrorWithCode(err)) {
        console.log(err.message);
      }
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <RenderAttachments files={files} setFiles={setFiles} />
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
        <TouchableOpacity style={styles.padding} onPress={() => onAttachment()}>
          <Attachment />
        </TouchableOpacity>
        {(text.trim().length > 0 || files.length > 0) && (
          <TouchableOpacity style={styles.send} onPress={onSend}>
            <Send size={18} />
          </TouchableOpacity>
        )}
      </View>
      <Processing isVisible={isUploading} onVisible={onUploading} />
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
