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

const cleintPortalForgotPassword = gql`
  mutation clientPortalForgotPassword(
    $clientPortalId: String!
    $phone: String
  ) {
    clientPortalForgotPassword(clientPortalId: $clientPortalId, phone: $phone)
  }
`;

export default { register, clientPortalLoginWithPhone, cleintPortalForgotPassword };
