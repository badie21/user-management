import {ReactComponent as Icon} from 'assets/search.svg';
import {UserContext, UserContextInterface} from 'context/user-context';
import {useContext} from 'react';
import styles from './search.module.scss';

const SearchInput = () => {
  const {searchHandler} = useContext(UserContext) as UserContextInterface;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchHandler(event.target.value);
  };

  return (
    <div className={styles['search']}>
      <Icon className={styles['search__icon']} />
      <input
        onChange={changeHandler}
        placeholder="جستجوی‌نام‌فرد"
        type="text"
        className={styles['search__input']}
        name="search"
      />
    </div>
  );
};

export default SearchInput;
