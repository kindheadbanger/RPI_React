import { useState, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { SortOffer } from '../../types/sort';
import { SortOffersType } from '../../const';

type SortOptionsProps = {
  activeSorting: SortOffer;
  onChange: (newSorting: SortOffer) => void;
};

function SortOptions({ activeSorting, onChange }: SortOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const iconStyle = {
    transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`,
  };

  function keyDownHandler(evt: KeyboardEvent) {
    if (evt.key === 'Escape' && isOpen) {
      evt.preventDefault();
      setIsOpen(false);
    }
  }

  function typeClickHandler() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  function sortingItemClickHandler(type: SortOffer) {
    onChange(type);
    setIsOpen(false);
  }

  return (
    <form className="places__sorting" action="#" method="get" onKeyDown={keyDownHandler}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={typeClickHandler}>
        {SortOffersType[activeSorting]}
        <svg className="places__sorting-arrow" width={7} height={4} style={iconStyle}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames(
          { 'places__options--opened': isOpen },
          'places__options',
          'places__options--custom'
        )}
      >
        {Object.entries(SortOffersType).map(([key, value]) => (
          <li
            key={key}
            className={classNames(
              { 'places__option--active': key === activeSorting },
              'places__option'
            )}
            tabIndex={0}
            onClick={() => sortingItemClickHandler(key as SortOffer)}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

export { SortOptions };