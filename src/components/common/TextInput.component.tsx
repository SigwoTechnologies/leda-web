import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  register?: UseFormRegister<FieldValues>;
  name: string;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  type?: string;
};

const TextInputComponent = ({ register, name, error, placeholder, type, ...rest }: Props) => {
  const registerProp = register && register(name);

  return (
    <>
      <input autoComplete="off" placeholder={placeholder} type={type} {...registerProp} {...rest} />
      {error && <p>{error.message}</p>}
    </>
  );
};

export default TextInputComponent;
