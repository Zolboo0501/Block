import { gql } from '@apollo/client';

const register = gql`
  mutation clientPortalRegister(
    $clientPortalId: String!
    $phone: String
    $email: String
    $username: String
    $firstName: String
    $lastName: String
    $password: String
    $customFieldsData: JSON
  ) {
    clientPortalRegister(
      clientPortalId: $clientPortalId
      lastName: $lastName
      phone: $phone
      email: $email
      username: $username
      firstName: $firstName
      password: $password
      customFieldsData: $customFieldsData
    )
  }
`;

const currentUser = gql`
  query clientPortalCurrentUser {
    clientPortalCurrentUser {
      _id
      createdAt
      modifiedAt
      firstName
      lastName
      phone
      email
      username
      type
      companyName
      companyRegistrationNumber
      erxesCustomerId
      erxesCompanyId
      clientPortalId
      code
      ownerId
      links
      customFieldsData
      customFieldsDataByFieldCode
      password
      isEmailVerified
      isPhoneVerified
      isOnline
      lastSeenAt
      sessionCount
      avatar
      customer {
        score
        tagIds
        firstName
        primaryEmail
        primaryPhone
        customFieldsData
        avatar
        phoneValidationStatus
      }
    }
  }
`;

const clientPortalLoginWithPhone = gql`
  mutation clientPortalLoginWithPhone(
    $phone: String!
    $clientPortalId: String!
    $deviceToken: String
  ) {
    clientPortalLoginWithPhone(
      phone: $phone
      clientPortalId: $clientPortalId
      deviceToken: $deviceToken
    )
  }
`;

const clientPortalVerifyOTP = gql`
  mutation clientPortalVerifyOTP($userId: String!, $phoneOtp: String) {
    clientPortalVerifyOTP(userId: $userId, phoneOtp: $phoneOtp)
  }
`;

const cleintPortalForgotPassword = gql`
  mutation clientPortalForgotPassword(
    $clientPortalId: String!
    $phone: String
  ) {
    clientPortalForgotPassword(clientPortalId: $clientPortalId, phone: $phone)
  }
`;

const customerEdit = gql`
mutation customersEdit(
  $_id: String!
  $avatar: String
  $firstName: String
  $lastName: String
  $middleName: String
  $sex: Int
  $birthDate: Date
  $primaryEmail: String
  $primaryPhone: String
  $phones: JSON
  $emails: JSON
  $ownerId: String
  $position: String
  $department: String
  $leadStatus: String
  $hasAuthority: String
  $description: String
  $isSubscribed: String
  $links: JSON
  $customFieldsData: JSON
  $code: String
  $emailValidationStatus: String
  $registrationNumber: String
  $phoneValidationStatus: String
) {
  customersEdit(
    _id: $_id
    avatar: $avatar
    firstName: $firstName
    lastName: $lastName
    middleName: $middleName
    sex: $sex
    birthDate: $birthDate
    primaryEmail: $primaryEmail
    primaryPhone: $primaryPhone
    phones: $phones
    emails: $emails
    ownerId: $ownerId
    position: $position
    department: $department
    leadStatus: $leadStatus
    hasAuthority: $hasAuthority
    description: $description
    isSubscribed: $isSubscribed
    links: $links
    customFieldsData: $customFieldsData
    code: $code
    emailValidationStatus: $emailValidationStatus
    registrationNumber: $registrationNumber
    phoneValidationStatus: $phoneValidationStatus
  ) {
    _id
    firstName
    middleName
    lastName
    avatar
    sex
    birthDate
    primaryEmail
    emails
    primaryPhone
    phones
    state
    visitorContactInfo
    modifiedAt
    position
    department
    leadStatus
    hasAuthority
    description
    isSubscribed
    code
    emailValidationStatus
    registrationNumber
    phoneValidationStatus
    score
    isOnline
    lastSeenAt
    sessionCount
    links
    ownerId
    owner {
      _id
      details {
        fullName
        __typename
      }
      __typename
    }
    integrationId
    createdAt
    remoteAddress
    location
    customFieldsData
    trackedData
    tagIds
    getTags {
      _id
      name
      colorCode
      __typename
    }
    __typename
  }
}
`;

const clientPortalUserDetail = gql`
  query clientPortalUserDetail($_id: String!) {
    clientPortalUserDetail(_id: $_id) {
      _id
      erxesCustomerId
    }
  }
`;

export default {
  register,
  clientPortalLoginWithPhone,
  cleintPortalForgotPassword,
  clientPortalVerifyOTP,
  customerEdit,
  currentUser,
  clientPortalUserDetail,
};
