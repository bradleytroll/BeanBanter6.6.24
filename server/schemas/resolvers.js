const { AuthenticationError } = require('apollo-server-express');
const { User, CoffeeShop, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate({
          path: 'coffeeShops',
          populate: {
            path: 'comments',
            populate: 'user'
          }
        });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    coffeeShops: async () => {
      return CoffeeShop.find().populate('user').populate({
        path: 'comments',
        populate: 'user'
      });
    },
    comments: async (parent, { coffeeShopId }) => {
      return Comment.find({ coffeeShop: coffeeShopId }).populate('user');
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
    addComment: async (parent, { coffeeShopId, content }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          content,
          user: context.user._id,
          coffeeShop: coffeeShopId,
        });

        await CoffeeShop.findByIdAndUpdate(coffeeShopId, {
          $push: { comments: comment._id },
        });

        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateComment: async (parent, { commentId, content }, context) => {
      if (context.user) {
        const comment = await Comment.findById(commentId);
        if (comment.user.toString() !== context.user._id) {
          throw new AuthenticationError('You can only edit your own comments!');
        }
        comment.content = content;
        await comment.save();
        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findById(commentId);

        if (comment.user.toString() !== context.user._id) {
          throw new AuthenticationError('You are not authorized to delete this comment');
        }

        await Comment.findByIdAndDelete(commentId);
        return comment;
      }
      throw new AuthenticationError('Not logged in');
    },
  }
};

module.exports = resolvers;
