import {FC, useContext} from 'react';
import styles from './user-card.module.scss';
import {ReactComponent as Edit} from 'assets/edit.svg';
import {ReactComponent as Approve} from 'assets/approve.svg';
import {useNavigate} from 'react-router-dom';
import {UserContext, UserContextInterface} from 'context/user-context';
import {UserInterface} from 'typs';

interface Props {
  user: UserInterface;
}

const UserCard: FC<Props> = ({user}) => {
  const {pinUserHandler} = useContext(UserContext) as UserContextInterface;

  const navigate = useNavigate();
  const handlePinChange = () => {
    pinUserHandler(user.id as string);
  };

  return (
    <div className={styles.card}>
      <Edit
        className={styles['card__edit']}
        onClick={() => navigate(`/user-form/${user.id}`)}
      />
      <input
        checked={user.pin}
        type="checkbox"
        className={styles['card__pin']}
        onChange={handlePinChange}
      />
      <img className={styles['card__img']} src={user.image} alt="image" />
      <div className={styles['card__info']}>
        <div className={styles['card__info--block']}>
          <span>Name :</span>
          <span>{user.firstName}</span>
        </div>
        <div className={styles['card__info--block']}>
          <span>Family Name :</span>
          <span>{user.lastName}</span>
        </div>
        <div className={styles['card__info--block']}>
          <span>Birth Date :</span>
          <span>{user.birthDate}</span>
        </div>
        <div className={styles['card__info--block']}>
          <span>ID No :</span>
          <span>{user.id}</span>
        </div>
        <div
          className={`${styles['card__info--block--approve']} ${
            user.approve
              ? styles['card__info--block--approve--success']
              : styles['card__info--block--approve--danger']
          }`}
        >
          <Approve />
        </div>
      </div>
      {!user.approve && (
        <button
          className={styles['card__check-btn']}
          onClick={() => navigate(`/check-user/${user.id}`)}
          type="button"
        >
          check
        </button>
      )}
    </div>
  );
};

export default UserCard;
