import { Review } from '../models/review.js';
import { User } from '../models/user.js';
import { Offer } from '../models/offer.js';
import ApiError from '../error/ApiError.js';
import { adaptReviewToClient } from '../adapters/reviewAdapter.js';

export const addReview = async (req, res, next) => {
  try {
    const { offerId } = req.params;
    const { comment, rating } = req.body;
    const userId = req.user.id;

    if (!comment || !rating) {
      return next(ApiError.badRequest('Некорректный comment или rating'));
    }

    const offer = await Offer.findByPk(offerId);
    if (!offer) {
      return next(ApiError.badRequest('Offer not found'));
    }

    const review = await Review.create({
      text: comment,
      rating,
      publishDate: new Date(),
      authorId: userId,
      OfferId: offerId
    });

    offer.commentsCount += 1;
    await offer.save();

    return res.status(201).json(review);
  } catch (error) {
    next(ApiError.internal('Ошибка добавления отзыва'));
  }
};

export const getReviewsByOfferId = async (req, res, next) => {
  try {
    const { offerId } = req.params;

    const reviews = await Review.findAll({
      where: { OfferId: offerId },
      include: [{ model: User, as: 'author' }],
      order: [['publishDate', 'DESC']]
    });

    const adapted = reviews.map(adaptReviewToClient);

    return res.status(200).json(adapted);
  } catch (error) {
    next(ApiError.internal('Ошибка получения отзывов'));
  }
};
