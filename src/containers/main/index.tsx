import Search from 'components/search';
import styles from './main.module.scss';
import {ReactComponent as Plus} from 'assets/plus.svg';
import {ReactComponent as Trash} from 'assets/trash.svg';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {UserContext, UserContextInterface} from 'context/user-context';
import UserCard from 'components/user-card';
import {UserInterface} from 'typs';

const Main = () => {
  const {usersList, pinAllHandler, pinAll, removeallUsers} = useContext(
    UserContext,
  ) as UserContextInterface;

  return (
    <div className={styles.main}>
      <Search />
      {usersList.length > 0 && (
        <div className={styles['main__pin']}>
          {pinAll && (
            <Trash onClick={removeallUsers} width={16} height={16} fill="red" />
          )}
          <input
            checked={pinAll}
            type="checkbox"
            className={styles['main__selectAll']}
            onChange={pinAllHandler}
          />
        </div>
      )}
      <div className={styles['user-list']}>
        {usersList.map((user: UserInterface) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <Link to="/user-form">
        <div className={styles['add--icon']}>
          <Plus />
        </div>
      </Link>
    </div>
  );
};

export default Main;
