import ErrorText from '@ui/error-text';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  register?: UseFormRegister<FieldValues>;
  name: string;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  type?: string;
};

const NftRoyaltyComponent = ({ register, name, error, placeholder, type, ...rest }: Props) => {
  const registerProp = register && register(name);

  return (
    <>
      {error && <ErrorText>{error.message}</ErrorText>}
      <div className="input-box pb--20">
        <label htmlFor="Royalty" className="form-label">
          Royalty in % *
        </label>
        <input id="royalty" type="number" placeholder={placeholder} {...registerProp} {...rest} />
      </div>
    </>
  );
};

export default NftRoyaltyComponent;
