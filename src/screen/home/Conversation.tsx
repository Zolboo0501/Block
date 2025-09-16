/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import { useMutation, useQuery } from '@apollo/client/react';
import { AUTOMATION_ID } from '@constants';
import Loader from 'components/Loader';
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
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [data]);

  useEffect(() => {
    if (autoText) {
      onSend(autoText);
    }
  }, [autoText]);

  const [insertMessage] = useMutation<any>(messengerQL.insertMessage, {
    onCompleted(data: any) {
      const _id = data?.widgetsInsertMessage?.conversationId;
      setConversationId(_id);
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

  const onSend = (hasText: string) => {
    insertMessage({
      variables: {
        integrationId,
        customerId: loggedUser?.erxesCustomerId,
        conversationId: id ? id : conversationId,
        contentType: 'text',
        message: hasText ? hasText : text,
      },
    });
    setText('');
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
            <MessageInput text={text} setText={setText} onSend={onSend} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { paddingHorizontal: 15, flex: 1 },
});
