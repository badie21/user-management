import {defaultApproveState} from 'containers/approve';
import localforage from 'localforage';
import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  ApprovedUsersState,
  UserInterface,
  UsersApproveListState,
  UserState,
} from 'typs';

export interface UserContextInterface {
  users: UserInterface[];
  usersList: UserInterface[];
  pinAll: boolean;
  pinUserHandler: (userId: string) => void;
  searchHandler: (userId: string) => void;
  userHandler: (newUsers: UserInterface, id: string | undefined) => void;
  getUser: (id: string) => UserInterface;
  getUserApproveState: (id: string) => Promise<UserState>;
  updateUserApproveState: (
    id: string,
    approveState: UserState | boolean,
  ) => void;
  pinAllHandler: () => void;
  removeallUsers: () => void;
}

export const UserContext = createContext<UserContextInterface | null>(null);

const UserProvider: FC<React.PropsWithChildren<Record<string, unknown>>> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [usersApproveList, setUsersApproveList] =
    useState<UsersApproveListState>({});
  const [search, setSearch] = useState('');
  const [pinAll, setPinAll] = useState(false);

  const searchHandler = (value: string) => {
    setSearch(value);
  };

  const getInitialState = async () => {
    let userList = (await localforage.getItem('users')) as UserInterface[];
    userList = userList.map((user: UserInterface) => {
      const userObj = {...user};
      if (!user.pin) userObj.pin = false;
      return user;
    });
    const isAllPin = userList.reduce((acc: boolean, cur: UserInterface) => {
      if (!cur.pin) {
        return false;
      }
      return acc;
    }, true);
    setPinAll(isAllPin);
    const usersState = (await localforage.getItem(
      'approveStateList',
    )) as UsersApproveListState;
    setUsers(userList);
    if (usersState) setUsersApproveList(usersState);
  };

  useEffect(() => {
    try {
      getInitialState();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const userHandler = (
    values: UserInterface,
    id: string | undefined = undefined,
  ) => {
    let newUsers = [...users];

    if (id) {
      newUsers = users.map((user: UserInterface) =>
        user.id === values.id ? {...user, ...values} : user,
      );
    } else {
      const index = users.find(user => user.id === id);
      if (index) {
        throw new Error(`این کاربر با کد شناسایی ${id} قبلا اضافه شده است`);
      }
      newUsers.push({...values});
    }
    localforage
      .setItem('users', newUsers)
      .then(function () {
        setUsers(newUsers);
        navigate('/');
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getUser = useCallback(
    (id: string) => {
      const user = users.find((user: UserInterface) => user.id === id);
      if (user) return user;
      throw new Error('این کاربر موجود نمیباشد');
    },
    [users],
  );
  const getUserApproveState = async (id: string) => {
    const approveStateList = (await localforage.getItem(
      'approveStateList',
    )) as ApprovedUsersState;
    if (!!approveStateList && approveStateList[id]) return approveStateList[id];
    return defaultApproveState;
  };

  const updateUserApproveState = async (
    id: string,
    userState: UserState | boolean,
  ) => {
    let approveState = (await localforage.getItem(
      'approveStateList',
    )) as UsersApproveListState;
    approveState = {...approveState, [id]: userState};
    await localforage.setItem('approveStateList', approveState);
    setUsersApproveList(approveState);
    navigate('/');
  };

  const pinUserHandler = (id: string) => {
    const newUsers = users.map((user: UserInterface) =>
      user.id === id ? {...user, pin: !user.pin} : user,
    );
    setUsers(newUsers);
  };

  const pinAllHandler = () => {
    const pinnedUsers = users.map((user: UserInterface) => ({
      ...user,
      pin: !pinAll,
    }));
    setPinAll(prev => !prev);
    setUsers(pinnedUsers);
    localforage.setItem('users', pinnedUsers);
  };

  const usersList = useMemo(() => {
    return users
      .sort((a, b) => {
        if (a.pin && b.pin) return 0;
        if (a.pin && !b.pin) return -1;
        if (!a.pin && b.pin) return 1;
        return 0;
      })
      .filter(
        (user: UserInterface) =>
          user.pin ||
          user.firstName.includes(search.trim()) ||
          user.lastName.includes(search.trim()),
      )
      .map((user: UserInterface) => {
        const userState = usersApproveList[user.id];
        return {...user, approve: userState === true ? true : false};
      });
  }, [users, search, usersApproveList]);

  const removeallUsers = async () => {
    await localforage.removeItem('users');
    await localforage.removeItem('approveStateList');
    setUsers([]);
    setUsersApproveList({});
    setPinAll(false);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        pinAll,
        pinUserHandler,
        searchHandler,
        usersList,
        userHandler,
        getUser,
        getUserApproveState,
        updateUserApproveState,
        pinAllHandler,
        removeallUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
