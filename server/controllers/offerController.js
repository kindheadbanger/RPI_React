import { Offer } from '../models/offer.js';
import { User } from '../models/user.js';
import ApiError from '../error/ApiError.js';
import { adaptOfferToClient, adaptFullOfferToClient } from '../adapters/offerAdapter.js';

export const getAllOffers = async (req, res, next) => {
  try {
    const offers = await Offer.findAll();
    const adapted = offers.map(adaptOfferToClient);
    return res.status(200).json(adapted);
  } catch {
    next(ApiError.internal('Не удалось получить список предложений'));
  }
};

export const getFullOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findByPk(id, {
      include: { model: User, as: 'author' }
    });

    if (!offer) {
      return next(ApiError.badRequest('Offer not found'));
    }

    const adapted = adaptFullOfferToClient(offer);

    return res.send(adapted);
  } catch {
    next(ApiError.internal('Ошибка получения предложения'));
  }
};