import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    me {
      id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        link
        image
      }
    }
  }
`;
