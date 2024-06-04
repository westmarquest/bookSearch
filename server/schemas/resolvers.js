const { User } = require("../models"); // Adjust the path as needed
const { bookSchema } = require("../models/Book");
const { findById } = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You must be logged in");
      }
      const user = await User.findById(context.user._id);
      return user;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("No user found with this email address");
      }

      const validPassword = await user.isCorrectPassword(password);

      if (!validPassword) {
        throw new Error("Incorrect password");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      console.log("input", input);
      if (!context.user) {
        throw new Error("You must be logged in");
      }
      console.log("context", context.user);
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { savedBooks: input } },
        { new: true }
      );
      console.log("user", user);
      // const newBook = new bookSchema(input);
      // console.log("new book", newBook);
      // user.savedBooks.push(newBook);
      // await user.save();

      return user;
    },
    removeBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new Error("You must be logged in");
      }

      const user = await User.findById(context.user.id);

      // Filter out the book with the provided bookId
      user.savedBooks = user.savedBooks.filter((book) => book.id !== bookId);

      await user.save();

      return user;
    },
  },
};

module.exports = resolvers;
