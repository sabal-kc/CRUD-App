const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require("graphql");
exports.teacherType = new GraphQLObjectType({
  name: "Teacher",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    mobileNumber: { type: GraphQLInt },
    birthday: { type: GraphQLString },
    gender: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

exports.studentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    class: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    phoneNumber: { type: GraphQLInt },
    email: { type: GraphQLString },
    address: { type: GraphQLString }
  })
});

exports.authenticationType = new GraphQLObjectType({
  name: "Authentication",
  fields: () => ({
    userId: { type: GraphQLID },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLString }
  })
});
