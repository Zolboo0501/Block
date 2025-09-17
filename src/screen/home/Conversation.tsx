/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import { useMutation, useQuery } from '@apollo/client/react';
import { AUTOMATION_ID } from '@constants';
import { uploadHandler } from '@utils';
import Loader from 'components/Loader';
import Processing from 'components/Processing';
import messengerQL from 'graph/messengerQL';
import useAlert from 'hooks/useAlert';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Header from 'view/home/Header';
import InstantMessage from 'view/home/InstantMessage';
import MessageInput from 'view/home/MessageInput';
import MessageList from 'view/home/MessageList';

const Conversation: React.FC<any> = ({ id, integrationId, autoText }) => {
  const [conversationId, setConversationId] = useState('');
  const scrollRef = useRef<any>(null);
  const [text, setText] = useState('');
  const alert = useAlert();
  const { loggedUser } = useAuth();
  const [isUploading, onUploading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  const { data, loading, subscribeToMore } = useQuery<any>(
    messengerQL.conversationDetail,
    {
      variables: {
        _id: id,
        integrationId,
      },
      skip: !id,
    },
  );

  const { data: messageAuto, loading: messageLoading } = useQuery<any>(
    messengerQL.automationDetail,
    {
      variables: {
        _id: AUTOMATION_ID,
      },
    },
  );

  useEffect(() => {
    if (data?.widgetsConversationDetail?.messages?.length > 0) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 600);
    }
  }, [data]);

  useEffect(() => {
    if (autoText) {
      onSend();
    }
  }, [autoText]);

  const [insertMessage] = useMutation<any>(messengerQL.insertMessage, {
    onCompleted(data: any) {
      const _id = data?.widgetsInsertMessage?.conversationId;
      setConversationId(_id);
      setFiles([]);
      setText('');
    },
    onError(error) {
      alert.onError(error.message);
      console.log(error.message);
    },
  });

  useEffect(() => {
    const messageSubscription = subscribeToMore({
      document: messengerQL.conversationMessageInserted,
      variables: { _id: id ? id : conversationId },
      updateQuery: (prev, { subscriptionData }) => {
        const message = subscriptionData.data.conversationMessageInserted;
        const widgetsConversationDetail = prev.widgetsConversationDetail || {};
        const messages = widgetsConversationDetail.messages || [];

        // check whether or not already inserted
        const prevEntry = messages.find((m: any) => m._id === message._id);

        if (prevEntry) {
          return prev;
        }

        // do not show internal or bot messages
        if (message.internal) {
          return prev;
        }

        // add new message to messages list
        const next = {
          ...prev,
          widgetsConversationDetail: {
            ...widgetsConversationDetail,
            messages: [...messages, message],
          },
        };

        return next;
      },
    });

    return () => {
      messageSubscription();
    };
  }, [conversationId, id, subscribeToMore]);

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

  const onSend = () => {
    if (autoText?.length > 0 || text?.length > 0 || files?.length > 0) {
      insertMessage({
        variables: {
          integrationId,
          customerId: loggedUser?.erxesCustomerId,
          conversationId: id || conversationId,
          contentType: 'text',
          message: autoText ? autoText : text,
          attachments: autoText ? [] : [...files],
        },
      });
    }
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

  if (loading || messageLoading) {
    return <Loader />;
  }

  const suggest = messageAuto?.automationDetail?.triggers?.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <KeyboardAwareScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.space}>
            <InstantMessage data={suggest} onSend={onSend} />

            <MessageList
              data={data?.widgetsConversationDetail?.messages || []}
            />
            <MessageInput
              text={text}
              setText={setText}
              onSend={onSend}
              onImage={onImage}
              files={files}
              setFiles={setFiles}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <Processing isVisible={isUploading} onVisible={onUploading} />
    </SafeAreaView>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { paddingHorizontal: 15, flex: 1 },
});
