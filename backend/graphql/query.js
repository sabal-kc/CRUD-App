const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = require("../secrets").SECRET;

//Types
const teacherType = require("./types").teacherType;
const studentType = require("./types").studentType;
const authType = require("./types").authenticationType;

//Models
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

//Root
const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    signup: {
      type: teacherType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        mobileNumber: { type: GraphQLString },
        birthday: { type: GraphQLString },
        gender: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parentValue, args) {
        const teacher = new Teacher(args);
        teacher.password = await bycrypt.hash(teacher.password, 12);
        try {
          const saved = await teacher.save();
          return saved;
        } catch (err) {
          if (err.name === "MongoError" && err.code === 11000) {
            // Duplicate username
            throw new Error("Email or number already exists");
          }
        }
      }
    },
    login: {
      type: authType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parentValue, args) {
        console.log("Login");
        const user = await Teacher.findOne({ email: args.email });
        if (!user) {
          throw new Error("User does not exist!");
        }
        const isValid = await bycrypt.compare(args.password, user.password);
        if (!isValid) {
          throw new Error("Password is incorrect!");
        }

        //Correct entry for user
        const token = jwt.sign(
          { teacherId: user.id, email: user.email },
          secret,
          {
            expiresIn: "1h"
          }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 };
      }
    },
    student: {
      type: studentType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, args) {
        return Student.findById(args.id);
      }
    },
    students: {
      type: new GraphQLList(studentType),
      resolve(parentValue, args) {
        return Student.find({});
      }
    }
  }
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStudent: {
      type: studentType,
      args: {
        name: { type: GraphQLString },
        class: { type: GraphQLString },
        age: { type: GraphQLInt },
        rollNumber: { type: GraphQLString },
        phoneNumber: { type: GraphQLInt },
        email: { type: GraphQLString },
        address: { type: GraphQLString }
      },
      resolve(parentValue, args, req) {
        if (!req.isAuth) {
          throw new Error("Unauthenticated");
        }
        const student = new Student({
          name: args.name,
          class: args.class,
          rollNumber: args.rollNumber,
          phoneNumber: args.phoneNumber,
          age: args.age,
          email: args.email,
          address: args.address
        });
        return student.save();
      }
    },
    deleteStudent: {
      type: studentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return "Hello";
      }
    },
    editStudent: {
      type: studentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        class: { type: GraphQLString },
        age: { type: GraphQLInt },
        rollNumber: { type: GraphQLString },
        phoneNumber: { type: GraphQLInt },
        email: { type: GraphQLString },
        address: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return "Hello";
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: mutation
});
