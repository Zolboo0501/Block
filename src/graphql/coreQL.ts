import { gql } from "@apollo/client";

const fieldsGroups = gql`
  query fieldsGroups(
    $contentType: String!
    $isDefinedByErxes: Boolean
    $config: JSON
    $codes: [String]
  ) {
    fieldsGroups(
      contentType: $contentType
      isDefinedByErxes: $isDefinedByErxes
      config: $config
      codes: $codes
    ) {
      name
      _id
      description
      code
      order
      isVisible
      isVisibleInDetail
      contentType
      isDefinedByErxes
      logicAction
      logics {
        fieldId
        logicOperator
        logicValue
        __typename
      }
      isMultiple
      alwaysOpen
      parentId
      config
      lastUpdatedUser {
        details {
          fullName
          __typename
        }
        __typename
      }
      fields {
        type
        text
        validation
        options
        groupId
        isRequired
        _id
        description
        code
        order
        isVisible
        isVisibleToCreate
        contentType
        logicAction
        logics {
          fieldId
          logicOperator
          logicValue
          __typename
        }
        logicAction
        logics {
          fieldId
          logicOperator
          logicValue
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

export default {fieldsGroups}