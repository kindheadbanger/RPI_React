// src/components/review-form/review-form.tsx
import { useState, FormEvent } from 'react';

type ReviewFormProps = {
  onSubmit: (data: { comment: string; rating: number }) => void;
};

function ReviewForm({ onSubmit }: ReviewFormProps): JSX.Element {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const isValid = review.length >= 50 && rating !== 0;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValid) {
      return;
    }

    onSubmit({
      comment: review,
      rating,
    });

    // очищаем форму после успешной отправки
    setReview('');
    setRating(0);
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <span key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              onChange={() => setRating(star)}
              checked={rating === star} // делаем контролируемым, чтобы сбрасывался
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </span>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={(evt) => setReview(evt.target.value)}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export { ReviewForm };
