import { useMutation, useQuery } from '@apollo/client/react';
import Loader from 'components/Loader';
import messengerQL from 'graph/messengerQL';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useLayoutEffect } from 'react';
import Conversation from './screen/home/Conversation';

const Connection: React.FC<any> = ({ route, navigation }) => {
  const autoText = route?.params?.text;

  const { loggedUser } = useAuth();

  const { data, loading } = useQuery<any>(messengerQL.integrations, {
    variables: {
      page: 1,
      perPage: 20,
      kind: 'messenger',
    },
  });

  const [connectMutation, { data: connectionData, loading: connectLoading }] =
    useMutation<any>(messengerQL.connect);

  const { data: conversation, loading: conversationLoading } = useQuery<any>(
    messengerQL.conversation,
    {
      variables: {
        integrationId: data?.integrations?.[0]?._id,
        customerId: loggedUser?.erxesCustomerId,
      },
      skip: !connectionData,
    },
  );

  useLayoutEffect(() => {
    if (loggedUser?.customer?.customFieldsData?.length === 0) {
      navigation.navigate('ReNew');
    }
  }, [loggedUser?.customer?.customFieldsData, navigation]);

  useEffect(() => {
    if (data?.integrations?.length > 0) {
      const integrationData = data?.integrations?.[0];
      connectMutation({
        variables: {
          brandCode: integrationData?.brand?.code,
          cachedCustomerId: loggedUser?.erxesCustomerId,
          isUser: true,
        },
      });
    }
  }, [connectMutation, data, loggedUser?.erxesCustomerId]);

  if (loading || connectLoading || conversationLoading) {
    return <Loader />;
  }

  console.log(conversation?.widgetsConversations?.[0]?._id);
  const updatedProps = {
    id: conversation?.widgetsConversations?.[0]?._id || '',
    integrationId: data?.integrations?.[0]?._id,
    autoText,
  };

  return <Conversation {...updatedProps} />;
};

export default Connection;
