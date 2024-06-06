// const { User, CoffeeShop } = require('../models');
// const { signToken } = require('../utils/auth');
// const { AuthenticationError } = require('apollo-server-express'); // Ensure correct import for AuthenticationError
// const resolvers = {
//   Query: {
//     me: async (parent, args, context) => {
//       if (context.user) {
//         return User.findById(context.user._id).populate('coffeeShops');
//       }
//       throw new AuthenticationError('Not logged in');
//     },
//     coffeeShops: async () => {
//       return CoffeeShop.find().populate('user');
//     },
//     coffeeShop: async (parent, { id }) => {
//       return CoffeeShop.findById(id).populate('user');
//     },
//   },
//   Mutation: {
//     signup: async (parent, args) => {
//       const user = await User.create(args);
//       const token = signToken(user);
//       return { token, user };
//     },
//     addUser: async (parent, args) => {
//       try {
//         const user = await User.create(args);
//         const token = signToken(user);
//         return { token, user };
//       } catch (error) {
//         console.error(error);
//         throw new Error('Failed to add user');
//       }
//     },
//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });
//       if (!user) {
//         throw new AuthenticationError('Incorrect credentials');
//       }
//       const correctPw = await user.isCorrectPassword(password);
//       if (!correctPw) {
//         throw new AuthenticationError('Incorrect credentials');
//       }
//       const token = signToken(user);
//       return { token, user };
//     },
//     addCoffeeShop: async (parent, args, context) => {
//       if (context.user) {
//         const coffeeShop = await CoffeeShop.create({ ...args, user: context.user._id });
//         await User.findByIdAndUpdate(context.user._id, { $push: { coffeeShops: coffeeShop._id } });
//         return coffeeShop;
//       }
//       throw new AuthenticationError('Not logged in');
//     },
//     updateCoffeeShop: async (parent, { id, ...args }, context) => {
//       if (context.user) {
//         return CoffeeShop.findByIdAndUpdate(id, args, { new: true });
//       }
//       throw new AuthenticationError('Not logged in');
//     },
//     deleteCoffeeShop: async (parent, { id }, context) => {
//       if (context.user) {
//         return CoffeeShop.findByIdAndDelete(id);
//       }
//       throw new AuthenticationError('Not logged in');
//     },
//   },
// };
// module.exports = resolvers;
const { User, CoffeeShop } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    coffeeShops: async () => {
      return CoffeeShop.find().populate('user', 'username').exec();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('coffeeShops');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    signup: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addCoffeeShop: async (parent, args, context) => {
      if (context.user) {
        const coffeeShop = await CoffeeShop.create({ ...args, user: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { coffeeShops: coffeeShop._id } });
        return coffeeShop;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateCoffeeShop: async (parent, { id, ...args }, context) => {
      if (context.user) {
        return CoffeeShop.findByIdAndUpdate(id, args, { new: true });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteCoffeeShop: async (parent, { id }, context) => {
      if (context.user) {
        return CoffeeShop.findByIdAndDelete(id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteUser: async (parent, { id }, context) => {
      if (context.user) {
        return User.findByIdAndDelete(id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
