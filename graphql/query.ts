import { gql } from "@apollo/client";
export const GET_ALL_PRODUCTS = gql`
  query {
    products {
      id
      title
      price
      description
      images
      creationAt
      category {
        id
        name
        image
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;

export const GET_SIMILAR_PRODUCTS = gql`
  query GetSimilarProducts($categoryId: Float!) {
    products(categoryId: $categoryId) {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $password: String!
    $avatar: String!
  ) {
    addUser(
      data: { name: $name, email: $email, password: $password, avatar: $avatar }
    ) {
      id
      name
      avatar
    }
  }
`;

export const GET_IF_EMAIL_IS_AVAILABLE = gql`
  query GetIfEmailIsAvailable($email: String!) {
    isAvailable(email: $email)
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query {
    myProfile {
      id
      name
      email
      avatar
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $price: Float!
    $description: String!
    $categoryId: Float!
    $images: [String!]!
  ) {
    addProduct(
      data: {
        title: $title
        price: $price
        description: $description
        categoryId: $categoryId
        images: $images
      }
    ) {
      title
      price
      images
      category {
        id
        name
        image
      }
    }
  }
`;
