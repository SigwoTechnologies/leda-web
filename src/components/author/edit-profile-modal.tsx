import { changeAccountInformation } from '@features/auth/store/account.actions';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { openToastError, openToastSuccess } from '@store/ui/ui.slice';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

type Props = {
  visibility: boolean;
  handleEditModalVisibility: () => void;
};

type Form = { username: string };

export const EditProfileModal = ({ visibility, handleEditModalVisibility }: Props) => {
  const dispatch = useAppDispatch();
  const { account, isLoading } = useAppSelector((state) => state.auth);

  const { register, handleSubmit } = useForm<Form>({
    mode: 'onChange',
    defaultValues: {
      username: account.username,
    },
  });

  const onSubmit = ({ username }: Form) => {
    if (username.includes(' ')) {
      dispatch(openToastError('You can not add spaces'));
      return;
    }
    dispatch(changeAccountInformation({ ...account, username }));
    dispatch(openToastSuccess('Updating information'));
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
          <b>Edit your Information </b>
        </h3>
      </Modal.Header>
      <Modal.Body style={{ width: '100%' }}>
        <SpinnerContainer isLoading={isLoading}>
          <form className="align-items-center form-wrapper-two" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label htmlFor="collection-name">Enter your new username without spaces</label>
              <input
                placeholder='e. g. "stormBreaker"'
                type="text"
                id="collection-name"
                className="props-input mt-2"
                {...register('username', {
                  required: 'username is required',
                  maxLength: {
                    value: 70,
                    message: 'Please type a name shorter than 70 characters (including spaces)',
                  },
                })}
              />
            </div>

            <button type="submit" className="w-auto mt-5 addPropBtn">
              Edit Profile
            </button>
          </form>
        </SpinnerContainer>
      </Modal.Body>
    </Modal>
  );
};
