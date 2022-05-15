import {FormValues} from 'containers/form';
import {FC, useEffect, useRef, useState} from 'react';
import {UseFormRegister, UseFormSetValue} from 'react-hook-form';
import {ReactComponent as Camera} from 'assets/camera.svg';
import styles from './upload.module.scss';

interface Props {
  className: string;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  defaultValue?: string;
}

const Upload: FC<Props> = ({register, className, setValue, defaultValue}) => {
  const [file, setFile] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (defaultValue) setFile(defaultValue);
  }, [defaultValue]);

  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.length ? event?.target?.files[0] : null;
    const base64Image = await getBase64(image as File);
    setFile(URL.createObjectURL(image as File));
    setValue('image', base64Image as string);
  };

  const handleOpenUpload = () => inputRef.current?.click();

  return (
    <div className={`${className} ${styles['upload']}`}>
      <label htmlFor="image">profile pic :</label>
      <input
        {...register('image')}
        ref={inputRef}
        style={{display: 'none'}}
        onChange={handleChange}
        type="file"
        accept=".jpg, .jpeg, .png"
      />
      {file ? (
        <img
          className={styles['upload__preview--img']}
          onClick={handleOpenUpload}
          src={file}
          alt="file"
        />
      ) : (
        <div onClick={handleOpenUpload} className={styles['upload__preview']}>
          <Camera className={styles['upload__preview--icon']} />
        </div>
      )}
    </div>
  );
};

export default Upload;
