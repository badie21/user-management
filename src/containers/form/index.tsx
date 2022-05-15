import Upload from 'components/upload';
import {UserContext, UserContextInterface} from 'context/user-context';
import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import styles from './form.module.scss';

export type FormValues = {
  firstName: string;
  lastName: string;
  mobile: string;
  id: string;
  birthDate: string;
  address: string;
  image: string;
};

const Form = () => {
  const {userHandler, getUser} = useContext(
    UserContext,
  ) as UserContextInterface;
  const [form, setForm] = useState({} as FormValues);
  const {register, handleSubmit, setValue, reset} = useForm<FormValues>({
    defaultValues: form,
  });
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if (!id) return;

    try {
      const user = getUser(id);
      setForm({...user});
      reset({...user});
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const submitHandler = (values: FormValues) => {
    userHandler(values, id);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles['form__block']}>
        <label htmlFor="firstName">name :</label>
        <input {...register('firstName', {required: true})} type="text" />
      </div>
      <div className={styles['form__block']}>
        <label htmlFor="lastName">family name :</label>
        <input {...register('lastName', {required: true})} type="text" />
      </div>
      <div className={styles['form__block']}>
        <label htmlFor="id">id no :</label>
        <input {...register('id', {required: true})} type="number" />
      </div>
      <div className={styles['form__block']}>
        <label htmlFor="mobile">mobile :</label>
        <input {...register('mobile')} type="text" />
      </div>
      <div className={styles['form__block']}>
        <label htmlFor="birthDate">birth date :</label>
        <input {...register('birthDate')} type="date" />
      </div>
      <div className={styles['form__block']}>
        <label htmlFor="address">address :</label>
        <input {...register('address')} type="text" />
      </div>
      <Upload
        register={register}
        setValue={setValue}
        className={styles['form__block']}
        defaultValue={form.image}
      />
      <div className={styles['form__actions']}>
        <input
          className={styles['form__actions--submit']}
          type="submit"
          value="save"
        />
        <button
          className={styles['form__actions--cancel']}
          type="button"
          onClick={() => navigate('/')}
        >
          cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
