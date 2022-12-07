import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import ErrorText from '@ui/error-text';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  register?: UseFormRegister<FieldValues>;
  name: string;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  type?: string;
};

const NftImageComponent = ({ register, name, error, placeholder, type, ...rest }: Props) => {
  const registerProp = register && register(name);

  const [selectedImage, setSelectedImage] = useState(null);
  const [hasImageError, setHasImageError] = useState(false);
  const [hasImageTypeError, setHasImageTypeError] = useState(false);

  const FilesAllowed = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const isAbleToAdd = FilesAllowed.find((fileType) => fileType === e.target.files[0].type);
      if (isAbleToAdd) {
        setSelectedImage(e.target.files[0]);
        setHasImageTypeError(false);
      } else {
        setHasImageTypeError(true);
      }
    }
  };

  return (
    <div className="upload-area">
      <div className="upload-formate mb--30">
        <h6 className="title">Upload a file *</h6>
        <p className="formate">Choose your file to upload</p>
      </div>

      <div className="brows-file-wrapper">
        <input
          name="nftImage"
          id="file"
          type="file"
          {...registerProp}
          {...rest}
          className="inputfile"
          accept="image/*"
          onChange={imageChange}
        />
        {selectedImage && (
          <Image
            id="createfileImage"
            src={URL.createObjectURL(selectedImage)}
            alt=""
            data-black-overlay="6"
            layout="fill"
          />
        )}

        <label htmlFor="file" title="No File Choosen">
          <i className="feather-upload" />
          <span className="text-center">Choose a File</span>
          <p className="text-center mt--10">
            PNG, JPG, GIF or JPEG <br /> Max 1Gb.
          </p>
        </label>
      </div>
      {hasImageError && !selectedImage && <ErrorText>Image is required</ErrorText>}
      {hasImageTypeError && <ErrorText>The extension you uploaded is not allowed</ErrorText>}
    </div>
  );
};

export default NftImageComponent;
