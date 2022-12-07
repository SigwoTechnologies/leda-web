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

const NftNameComponent = ({ register, name, error, placeholder, type, ...rest }: Props) => {
  const registerProp = register && register(name);

  return (
    <>
      {error && <ErrorText>{error.message}</ErrorText>}
      <div className="col-md-12">
        <div className="input-box pb--20">
          <label htmlFor="name" className="form-label">
            NFT Name *
          </label>
          <input id="name" placeholder={placeholder} {...registerProp} {...rest} />
        </div>
      </div>
    </>
  );
};

export default NftNameComponent;
