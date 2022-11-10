import Button from '@ui/button';
import ErrorText from '@ui/error-text';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useForm } from 'react-hook-form';
import useMetamask from '../../../features/auth/hooks/useMetamask';
import {
  changePriceItem,
  findHistoryByItemId,
  listItem,
} from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';

type TForm = {
  price: string;
};

export const ListingTabContent = () => {
  const { address } = useMetamask();
  const { isLoading, selectedItem } = useAppSelector((state) => state.marketplace);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TForm>({
    mode: 'onChange',
  });

  const onSubmit = async ({ price }: TForm) => {
    if (!selectedItem.listId) {
      dispatch(
        listItem({
          address,
          price,
          tokenId: selectedItem.tokenId,
          itemId: selectedItem.itemId,
          ownerAddress: selectedItem.owner.address,
          listId: selectedItem.listId,
        })
      );
    } else {
      dispatch(
        changePriceItem({
          price,
          itemId: selectedItem.itemId,
          listId: selectedItem.listId,
          ownerAddress: selectedItem.owner.address,
        })
      );
    }
    dispatch(findHistoryByItemId({ itemId: selectedItem.itemId }));
  };

  return (
    <SpinnerContainer isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-5 mt-1">
          <div className="col-lg-12">
            <div className="form-wrapper-one">
              <div className="row">
                <div className="col-md-12">
                  <div className="input-box pb--20">
                    <label htmlFor="name" className="form-label">
                      Price (ETH)
                    </label>
                    <input
                      id="name"
                      placeholder="e. g. 0.001"
                      {...register('price', {
                        required: 'Price is required',
                        min: 0,
                      })}
                      step={0.0000001}
                      type="number"
                      min={0}
                    />
                    <ErrorText>{errors.price?.message}</ErrorText>
                  </div>
                </div>

                <div className="col-md-12 col-xl-12 mt_lg--15 mt_md--15 mt_sm--15">
                  <div className="input-box">
                    <Button type="submit" fullwidth {...{ disabled: !isValid }}>
                      List on marketplace
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </SpinnerContainer>
  );
};
