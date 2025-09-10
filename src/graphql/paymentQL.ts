import { gql } from '@apollo/client';

const invoiceCreate = gql`
  mutation InvoiceCreate(
    $amount: Float!
    $contentType: String
    $contentTypeId: String
    $customerId: String
    $customerType: String
    $phone: String
    $email: String
    $description: String
  ) {
    invoiceCreate(
      amount: $amount
      contentType: $contentType
      contentTypeId: $contentTypeId
      customerId: $customerId
      customerType: $customerType
      phone: $phone
      email: $email
      description: $description
    ) {
      _id
    }
  }
`;

const paymentTransactionsAdd = gql`
  mutation paymentTransactionsAdd(
    $invoiceId: String!
    $paymentId: String!
    $amount: Float!
  ) {
    paymentTransactionsAdd(
      invoiceId: $invoiceId
      paymentId: $paymentId
      amount: $amount
    ) {
      _id
      response
    }
  }
`;

const payments = gql`
  query payments($status: String) {
    payments(status: $status) {
      _id
      name
      kind
      status
      config
      __typename
    }
  }
`;

const invoiceDetail = gql`
  query invoiceDetail($id: String!) {
    invoiceDetail(_id: $id) {
      _id
      amount
      contentType
      contentTypeId
      createdAt
      customer
      customerId
      customerType
      description
      email
      phone
      remainingAmount
      status
      resolvedAt
      __typename
    }
  }
`;
export default { invoiceCreate, paymentTransactionsAdd, payments,invoiceDetail };
