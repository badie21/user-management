import {UserContext, UserContextInterface} from 'context/user-context';
import {useContext, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {ReactComponent as Check} from 'assets/checked.svg';
import {ReactComponent as UnCheck} from 'assets/close.svg';
import {ReactComponent as Camera} from 'assets/camera.svg';
import styles from './approve.module.scss';
import {UserState} from 'typs';

export const defaultApproveState = {
  firstName: false,
  lastName: false,
  mobile: false,
  id: false,
  birthDate: false,
  address: false,
  image: false,
};

const Approve = () => {
  const {getUser, getUserApproveState, updateUserApproveState} = useContext(
    UserContext,
  ) as UserContextInterface;
  const navigate = useNavigate();
  const [approveState, setApproveState] =
    useState<UserState>(defaultApproveState);
  const {id} = useParams();

  useEffect(() => {
    if (!id) return;
    setActiveUser(id);
  }, []);
  const setActiveUser = async (id: string) => {
    const userState = (await getUserApproveState(id)) as UserState;
    setApproveState(userState ? {...userState} : {...defaultApproveState});
  };

  const approveHandler = (filed: string, approve: boolean) => {
    setApproveState(prev => ({...prev, [filed]: approve} as UserState));
  };

  const submitHandler = () => {
    let approved = true;
    for (const key in approveState) {
      if (!approveState[key as keyof UserState]) {
        approved = false;
      }
    }
    updateUserApproveState(id as string, approved ? true : approveState);
  };

  const user = getUser(id as string);

  return (
    <div className={styles['approve']}>
      <div className={styles['approve__block']}>
        <span>Name: </span>
        <span>{user.firstName}</span>
        <div className={styles['approve__action']}>
          <Check
            className={`${
              approveState.firstName ? styles['approve__action--checked'] : ''
            }`}
            onClick={() => approveHandler('firstName', true)}
          />
          <UnCheck
            className={`${
              !approveState.firstName ? styles['approve__action--reject'] : ''
            }`}
            onClick={() => approveHandler('firstName', false)}
          />
        </div>
      </div>
      <div className={styles['approve__block']}>
        <span>Family Name: </span>
        <span>{user.lastName}</span>
        <div className={styles['approve__action']}>
          <Check
            className={`${
              approveState.lastName ? styles['approve__action--checked'] : ''
            }`}
            onClick={() => approveHandler('lastName', true)}
          />
          <UnCheck
            className={`${
              !approveState.lastName ? styles['approve__action--reject'] : ''
            }`}
            onClick={() => approveHandler('lastName', false)}
          />
        </div>
      </div>
      <div className={styles['approve__block']}>
        <span>Mobile: </span>
        <span>{user.mobile}</span>
        <div className={styles['approve__action']}>
          <Check
            className={`${
              approveState.mobile ? styles['approve__action--checked'] : ''
            }`}
            onClick={() => approveHandler('mobile', true)}
          />
          <UnCheck
            className={`${
              !approveState.mobile ? styles['approve__action--reject'] : ''
            }`}
            onClick={() => approveHandler('mobile', false)}
          />
        </div>
      </div>
      <div className={styles['approve__block']}>
        <span>ID No: </span>
        <span>{user.id}</span>
        <div className={styles['approve__action']}>
          <Check
            className={`${
              approveState.id ? styles['approve__action--checked'] : ''
            }`}
            onClick={() => approveHandler('id', true)}
          />
          <UnCheck
            className={`${
              !approveState.id ? styles['approve__action--reject'] : ''
            }`}
            onClick={() => approveHandler('id', false)}
          />
        </div>
      </div>
      <div className={styles['approve__block']}>
        <span>Birth Date: </span>
        <span>{user.birthDate}</span>
        <div className={styles['approve__action']}>
          <Check
            className={`${
              approveState.birthDate ? styles['approve__action--checked'] : ''
            }`}
            onClick={() => approveHandler('birthDate', true)}
          />
          <UnCheck
            className={`${
              !approveState.birthDate ? styles['approve__action--reject'] : ''
            }`}
            onClick={() => approveHandler('birthDate', false)}
          />
        </div>
      </div>
      <div className={styles['approve__block']}>
        <span>Address: </span>
        <span>{user.address}</span>
        <div className={styles['approve__action']}>
          <Check
            className={`${
              approveState.address ? styles['approve__action--checked'] : ''
            }`}
            onClick={() => approveHandler('address', true)}
          />
          <UnCheck
            className={`${
              !approveState.address ? styles['approve__action--reject'] : ''
            }`}
            onClick={() => approveHandler('address', false)}
          />
        </div>
      </div>
      <div className={styles['approve__block']}>
        <span>Image: </span>
        {user.image.length ? (
          <img src={user.image} alt="userImage" />
        ) : (
          <div>
            <Camera width={35} height={30} fill="#6eebe7" />
          </div>
        )}
        <div className={styles['approve__action']}>
          <Check
            className={`${
              approveState.image ? styles['approve__action--checked'] : ''
            }`}
            onClick={() => approveHandler('image', true)}
          />
          <UnCheck
            className={`${
              !approveState.image ? styles['approve__action--reject'] : ''
            }`}
            onClick={() => approveHandler('image', false)}
          />
        </div>
      </div>
      <div className={styles['approve__submit']}>
        <button
          className={styles['approve__submit--save']}
          onClick={submitHandler}
          type="button"
        >
          save
        </button>
        <button
          className={styles['approve__submit--cancel']}
          type="button"
          onClick={() => navigate('/')}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default Approve;
