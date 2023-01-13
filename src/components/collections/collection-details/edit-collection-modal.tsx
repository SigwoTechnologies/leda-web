import { changeCollectionInformation } from '@features/marketplace/store/marketplace.actions';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

type Props = {
  visibility: boolean;
  handleEditModalVisibility: () => void;
};

type Form = { name: string; description: string };

export const EditCollectionModal = ({ visibility, handleEditModalVisibility }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedCollection, isLoadingCollection } = useAppSelector((state) => state.marketplace);

  const { register, handleSubmit } = useForm<Form>({
    mode: 'onChange',
    defaultValues: {
      name: selectedCollection.name,
      description: selectedCollection.description,
    },
  });

  const onSubmit = ({ name, description }: Form) => {
    dispatch(changeCollectionInformation({ ...selectedCollection, name, description }));
  };

  return (
    <Modal
      className="rn-popup-modal placebid-modal-wrapper"
      show={visibility}
      onHide={handleEditModalVisibility}
      centered
    >
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={handleEditModalVisibility}
      >
        <i className="feather-x" />
      </button>
      <Modal.Header>
        <h3 className="modal-title fw-light">
          <b>Edit Collection Information</b>
        </h3>
      </Modal.Header>
      <Modal.Body style={{ width: '100%' }}>
        <SpinnerContainer isLoading={isLoadingCollection}>
          <form className="align-items-center form-wrapper-two" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label htmlFor="collection-name">Enter a name for the Collection</label>
              <input
                placeholder='e. g. "Fifa World Cup 2022"'
                type="text"
                id="collection-name"
                className="props-input mt-2"
                {...register('name', {
                  required: 'Name is required',
                  maxLength: {
                    value: 70,
                    message: 'Please type a name shorter than 70 characters (including spaces)',
                  },
                })}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="collection-name">Enter a description for the collection</label>
              <textarea
                placeholder='e. g. "The Fifa World Cup 2022 is the..."'
                id="collection-name"
                className="props-input mt-2"
                {...register('description', {
                  required: 'Name is required',
                  maxLength: {
                    value: 70,
                    message: 'Please type a name shorter than 70 characters (including spaces)',
                  },
                })}
              />
            </div>
            <button type="submit" className="w-auto mt-5 addPropBtn">
              Edit Collection
            </button>
          </form>
        </SpinnerContainer>
      </Modal.Body>
    </Modal>
  );
};
