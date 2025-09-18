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

const clientPortalForgotPassword = gql`
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

const clienPortalResetPassword = gql`
  mutation clientPortalResetPasswordWithCode(
    $phone: String!
    $password: String!
    $code: String!
  ) {
    clientPortalResetPasswordWithCode(
      phone: $phone
      password: $password
      code: $code
    )
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

const clientPortalLogin = gql`
  mutation clientPortalLogin(
    $login: String!
    $password: String!
    $clientPortalId: String!
    $deviceToken: String
    $twoFactor: TwoFactor
  ) {
    clientPortalLogin(
      login: $login
      password: $password
      clientPortalId: $clientPortalId
      deviceToken: $deviceToken
      twoFactor: $twoFactor
    )
  }
`;

const clientPortalCurrentUser = gql`
  query clientPortalCurrentUser {
    clientPortalCurrentUser {
      _id
      email
      firstName
      lastName
      type
      erxesCompanyId
      phone
      erxesCustomerId
      username
      customFieldsData
      avatar
      twoFactorDevices {
        key
        device
        date
      }
      customer {
        _id
        state
        createdAt
        modifiedAt
        avatar
        integrationId
        firstName
        lastName
        middleName
        birthDate
        sex
        email
        primaryEmail
        emails
        primaryPhone
        phones
        primaryAddress
        addresses
        phone
        tagIds
        remoteAddress
        location
        visitorContactInfo
        customFieldsData
        customFieldsDataByFieldCode
        trackedData
        ownerId
        position
        department
        leadStatus
        hasAuthority
        description
        isSubscribed
        code
        emailValidationStatus
        phoneValidationStatus
        isOnline
        lastSeenAt
        sessionCount
        urlVisits
        links
        score
      }
    }
  }
`;

const customerDetail = gql`
  query customerDetail($_id: String!) {
    customerDetail(_id: $_id) {
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
      integrationId
      createdAt
      remoteAddress
      location
      customFieldsData
      trackedData
      tagIds
      __typename
    }
  }
`;

const clientPortalLogout = gql`
  mutation {
    clientPortalLogout
  }
`;

export default {
  register,
  clientPortalLoginWithPhone,
  clientPortalForgotPassword,
  clientPortalVerifyOTP,
  customerEdit,
  currentUser,
  clientPortalUserDetail,
  clientPortalLogin,
  clientPortalCurrentUser,
  clienPortalResetPassword,
  customerDetail,
  clientPortalLogout,
};
