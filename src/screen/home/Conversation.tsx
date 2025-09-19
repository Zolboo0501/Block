/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import { useMutation, useQuery } from '@apollo/client/react';
import { AUTOMATION_ID } from '@constants';
import Loader from 'components/Loader';
import messengerQL from 'graph/messengerQL';
import useAlert from 'hooks/useAlert';
import useAuth from 'hooks/useAuth';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
  const [files, setFiles] = useState<any[]>([]);

  const { data, loading, subscribeToMore } = useQuery<any>(
    messengerQL.conversationDetail,
    {
      variables: {
        _id: id ? id : conversationId,
        integrationId,
      },
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

  useLayoutEffect(() => {
    if (data?.widgetsConversationDetail?.messages?.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [data?.widgetsConversationDetail?.messages?.length]);

  useEffect(() => {
    if (autoText) {
      onSend(autoText);
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
        const message = subscriptionData?.data?.conversationMessageInserted;
        if (!message) return prev;

        const messages = prev.widgetsConversationDetail?.messages || [];

        // Avoid duplicate lookup every time
        if (
          messages.some((m: any) => m._id === message._id) ||
          message.internal
        ) {
          return prev;
        }

        return {
          ...prev,
          widgetsConversationDetail: {
            ...prev.widgetsConversationDetail,
            messages: [
              ...messages,
              { ...message, isOnline: message.isOnline ?? false },
            ],
          },
        };
      },
    });

    return () => {
      messageSubscription();
    };
  }, [conversationId, id, subscribeToMore]);

  const onSend = useCallback(
    (hasText?: string) => {
      if (hasText || text?.length > 0 || files?.length > 0) {
        insertMessage({
          variables: {
            integrationId,
            customerId: loggedUser?.erxesCustomerId,
            conversationId: id || conversationId,
            contentType: 'text',
            message: hasText ? hasText : text,
            attachments: [...files],
          },
        });
      }
    },
    [
      text,
      files,
      conversationId,
      id,
      integrationId,
      loggedUser?.erxesCustomerId,
      insertMessage,
    ],
  );

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
              files={files}
              setFiles={setFiles}
              scrollRef={scrollRef}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Conversation);

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { paddingHorizontal: 15, flex: 1, paddingVertical: 10 },
});
