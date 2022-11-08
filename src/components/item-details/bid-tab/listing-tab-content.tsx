import Button from '@ui/button';
import ErrorText from '@ui/error-text';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import { useForm } from 'react-hook-form';
import useMetamask from '../../../features/auth/hooks/useMetamask';
import {
  findHistoryByItemId,
  listItem,
} from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { Item } from '../../../types/item';

type Props = {
  item: Item;
  setSelectedTab: Function;
};

type TForm = {
  price: string;
};

export const ListingTabContent = ({ item, setSelectedTab }: Props) => {
  const { address } = useMetamask();
  const { isLoading } = useAppSelector((state) => state.marketplace);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TForm>({
    mode: 'onChange',
  });

  const onSubmit = async ({ price }: TForm) => {
    dispatch(
      listItem({
        address,
        price,
        tokenId: item.tokenId,
        itemId: item.itemId,
        ownerAddress: item.owner.address,
        setSelectedTab,
      })
    );
    dispatch(findHistoryByItemId({ itemId: item.itemId }));
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
          <div className="mt--100 mt_sm--30 mt_md--30 d-block d-lg-none">
            <h5> Note: </h5>
            <span>
              {' '}
              Service fee : <strong>2.5%</strong>{' '}
            </span>{' '}
            <br />
            <span>
              {' '}
              You will receive : <strong>25.00 ETH $50,000</strong>
            </span>
          </div>
        </div>
      </form>
    </SpinnerContainer>
  );
};
