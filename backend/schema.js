const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const teacherType = new GraphQLObjectType({
  name: "Teacher",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});



const teachers = [
  { id: "1", username: "John Doe", age: "12" },
  { id: "2", username: "John Doe2", age: "12" },
  { id: "3", username: "John Doe3", age: "12" }
];

//Root
const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    teacher: {
      type: teacherType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < teachers.length; i++) {
          if (teachers[i].id === args.id) return teachers[i];
        }
      }
    },
    teachers: {
      type: new GraphQLList(teacherType),
      resolve(parentValue, args) {
        return teachers;
      }
    }
  }
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTeacher: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {}
    },
    deleteTeacher: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {}
    },
    editTeacher: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parentValue, args) {}
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: mutation
});
