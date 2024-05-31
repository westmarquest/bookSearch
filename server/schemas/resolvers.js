const { User } = require("../models"); // Adjust the path as needed
const { bookSchema } = require("../models/Book");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: (parent, args, context) => {
      if (!context.user) {
        throw new Error("You must be logged in");
      }
      return context.user;
    },
    savedBooks: (parent, args, context) => {
      if (!context.user) {
        throw new Error("You must be logged in");
      }
      return context.user.savedBooks;
    },
    bookCount: (parent, args, context) => {
      if (!context.user) {
        throw new Error("You must be logged in");
      }
      return context.user.savedBooks ? context.user.savedBooks.length : 0;
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
      if (!context.user) {
        throw new Error("You must be logged in");
      }

      const user = await User.findById(context.user.id);

      const newBook = new bookSchema(input);

      user.savedBooks.push(newBook);
      await user.save();

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
