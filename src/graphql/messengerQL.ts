import { gql } from '@apollo/client';

const integrations = gql`
  query integrations(
    $channelId: String
    $brandId: String
    $kind: String
    $perPage: Int
    $page: Int
    $searchValue: String
    $status: String
  ) {
    integrations(
      channelId: $channelId
      brandId: $brandId
      kind: $kind
      perPage: $perPage
      page: $page
      searchValue: $searchValue
      status: $status
    ) {
      _id
      name
      brandId
      languageCode
      isActive
      channels {
        _id
        name
        __typename
      }
      kind
      brand {
        _id
        name
        code
        __typename
      }
      createdAt
      webhookData
      leadData
      formId
      tagIds
      tags {
        _id
        colorCode
        name
        __typename
      }
      form {
        _id
        title
        code
        __typename
      }
      details
      healthStatus
      __typename
    }
  }
`;

const connect = gql`
  mutation connect(
    $brandCode: String!
    $email: String
    $phone: String
    $code: String
    $isUser: Boolean
    $data: JSON
    $companyData: JSON
    $cachedCustomerId: String
    $visitorId: String
  ) {
    widgetsMessengerConnect(
      brandCode: $brandCode
      email: $email
      phone: $phone
      code: $code
      isUser: $isUser
      data: $data
      companyData: $companyData
      cachedCustomerId: $cachedCustomerId
      visitorId: $visitorId
    ) {
      integrationId
      messengerData
      languageCode
      uiOptions
      customerId
      visitorId
      brand {
        name
        description
      }
    }
  }
`;

const automationDetail = gql`
  query automationDetail($_id: String!) {
    automationDetail(_id: $_id) {
      _id
      name
      status
      triggers {
        id
        type
        actionId
        style
        config
        icon
        label
        description
        position
        isCustom
        workflowId
        count
        __typename
      }
    }
  }
`;
const conversationChanged = gql`
  subscription conversationChanged($_id: String!) {
    conversationChanged(_id: $_id) {
      type
    }
  }
`;

const conversationMessageInserted = gql`
  subscription conversationMessageInserted($_id: String!) {
    conversationMessageInserted(_id: $_id) {
      _id
      conversationId
      customerId
      user {
        _id
        details {
          avatar
          fullName
          description
          location
          position
          shortName
          __typename
        }
        __typename
      }
      content
      createdAt
      internal
      fromBot
      contentType
      engageData {
        content
        kind
        sentAs
        messageId
        brandId
        __typename
      }
      botData
      messengerAppData
      attachments {
        url
        name
        size
        type
        __typename
      }
      __typename
    }
  }
`;

const insertMessage = gql`
  mutation widgetsInsertMessage(
    $integrationId: String!
    $customerId: String
    $visitorId: String
    $message: String
    $contentType: String
    $conversationId: String
    $attachments: [AttachmentInput]
    $skillId: String
    $payload: String
  ) {
    widgetsInsertMessage(
      integrationId: $integrationId
      customerId: $customerId
      visitorId: $visitorId
      contentType: $contentType
      message: $message
      conversationId: $conversationId
      attachments: $attachments
      skillId: $skillId
      payload: $payload
    ) {
      _id
      conversationId
      customerId
      user {
        _id
        details {
          avatar
          fullName
          __typename
        }
        __typename
      }
      content
      createdAt
      internal
      fromBot
      contentType
      botData
      messengerAppData
      attachments {
        url
        name
        size
        type
        __typename
      }
      __typename
    }
  }
`;

const conversation = gql`
  query widgetsConversations(
    $integrationId: String!
    $customerId: String
    $visitorId: String
  ) {
    widgetsConversations(
      integrationId: $integrationId
      customerId: $customerId
      visitorId: $visitorId
    ) {
      _id
      content
      createdAt
      participatedUsers {
        details {
          avatar
          fullName
          description
          location
          position
          shortName
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

const conversationClientMessageInserted = gql`
  subscription conversationClientMessageInserted($userId: String!) {
    conversationClientMessageInserted(userId: $userId) {
      _id
      content
    }
  }
`;

const conversationDetail = gql`
  query ($_id: String, $integrationId: String!) {
    widgetsConversationDetail(_id: $_id, integrationId: $integrationId) {
      _id
      messages {
        _id
        conversationId
        customerId
        user {
          _id
          details {
            avatar
            fullName
            description
            location
            position
            shortName
            __typename
          }
          __typename
        }
        content
        createdAt
        internal
        fromBot
        contentType
        engageData {
          content
          kind
          sentAs
          messageId
          brandId
          __typename
        }
        botData
        messengerAppData
        attachments {
          url
          name
          size
          type
          __typename
        }
      }
      participatedUsers {
        _id
        details {
          avatar
          fullName
          shortName
          description
          position
          location
        }
        links
      }
      isOnline
      persistentMenus
      __typename
    }
  }
`;

export default {
  integrations,
  connect,
  insertMessage,
  conversation,
  conversationDetail,
  conversationChanged,
  conversationMessageInserted,
  conversationClientMessageInserted,
  automationDetail,
};
