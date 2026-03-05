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

export const createOffer = async (req, res, next) => {
  try {
    const {
      title, description, publishDate, city,
      isPremium, isFavorite, rating, type, rooms, guests, price,
      features, commentsCount, latitude, longitude, userId
    } = req.body;

    if (!req.files?.previewImage || req.files.previewImage.length === 0) {
      return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
    }

    const previewImagePath = `/static/${req.files.previewImage[0].filename}`;

    let processedPhotos = [];
    if (req.files?.photos) {
      processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
    }

    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
      } catch {
        parsedFeatures = features.split(',');
      }
    }

    const offer = await Offer.create({
      title,
      description,
      publishDate,
      city,
      previewImage: previewImagePath,
      photos: processedPhotos,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      features: parsedFeatures,
      commentsCount,
      latitude,
      longitude,
      authorId: userId
    });

    return res.status(201).json(offer);
  } catch (error) {
    next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
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

export const getFavoriteOffers = async (req, res, next) => {
  try {
    const offers = await Offer.findAll({ where: { isFavorite: true } });
    const adapted = offers.map(adaptOfferToClient);
    return res.status(200).json(adapted);
  } catch (error) {
    next(ApiError.internal('Ошибка получения избранных предложений'));
  }
};

export const toggleFavorite = async (req, res, next) => {
  try {
    const { offerId, status } = req.params;

    const offer = await Offer.findByPk(offerId);
    if (!offer) {
      return next(ApiError.badRequest('Offer not found'));
    }

    const newStatus = status === '1' || status === 'true';
    offer.isFavorite = newStatus;
    await offer.save();

    return res.status(200).json(offer);
  } catch (error) {
    next(ApiError.internal('Ошибка обновления избранного'));
  }
};