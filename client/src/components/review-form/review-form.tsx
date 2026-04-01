import { FormEvent, useState } from 'react';

type ReviewFormProps = {
  onSubmit: (data: { comment: string; rating: number }) => void;
};

function ReviewForm({ onSubmit }: ReviewFormProps): JSX.Element {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const isValid = review.length >= 50 && review.length <= 300 && rating > 0;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValid) {
      return;
    }

    onSubmit({
      comment: review,
      rating,
    });

    setReview('');
    setRating(0);
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Add review</h2>

      <form className="reviews__form form" onSubmit={handleSubmit}>
        <label className="reviews__label form__label">Your rating</label>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px',
            marginTop: '10px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <label
              key={value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>

        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>

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
            To submit review please make sure to set rating and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
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
    </section>
  );
}

export { ReviewForm };