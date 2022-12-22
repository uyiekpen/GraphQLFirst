import userModel from "./userModel";

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} from "graphql";

const myDocument = new GraphQLObjectType({
  name: "myDocument",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const documentQuery = new GraphQLObjectType({
  name: "documentQuery",
  fields: {
    getUsers: {
      type: new GraphQLList(myDocument),
      resolve: () => {
        return userModel.find();
      },
    },

    getUser: {
      type: myDocument,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_, args) => {
        const id = args;
        return userModel.findById(id);
      },
    },
  },
});

const mutateDocument = new GraphQLObjectType({
  name: "mutateDocument",
  fields: {
    createuser: {
      type: myDocument,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (_, args) => {
        const { name, email, password } = args;

        return userModel.create({
          name,
          email,
          password,
        });
      },
    },

    UpdateUser: {
      type: myDocument,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      resolve: (_, args) => {
        const { id, name } = args;

        return userModel.findByIdAndUpdate(id, { name }, { new: true });
      },
    },

    deleteUser: {
      type: myDocument,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_, args) => {
        const { id } = args;

        return userModel.findByIdAndDelete(id);
      },
    },
  },
});

const myExport = new GraphQLSchema({
  query: documentQuery,
  mutation: mutateDocument,
});

export default myExport;
