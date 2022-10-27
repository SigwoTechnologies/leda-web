import { Item } from '@types';
import Button from '@ui/button';
import ErrorText from '@ui/error-text';
import { useForm } from 'react-hook-form';
import useMetamask from '../../../features/auth/hooks/useMetamask';
import { listItem } from '../../../features/marketplace/store/marketplace.actions';
import useAppDispatch from '../../../store/hooks/useAppDispatch';

type Props = {
  item: Item;
};

type TForm = {
  price: string;
};
export const PriceTabContent = ({ item }: Props) => {
  useMetamask();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const onSubmit = async ({ price }: TForm) => {
    dispatch(listItem({ price, tokenId: item.tokenId, itemId: item.itemId }));
  };

  return (
    <div>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-5 mt-1">
          <div className="col-lg-12">
            <div className="form-wrapper-one">
              <div className="row">
                <div className="col-md-12">
                  <div className="input-box pb--20">
                    <label htmlFor="name" className="form-label">
                      Item Price
                    </label>
                    <input
                      id="name"
                      placeholder="e. g. 0.001"
                      {...register('price', {
                        required: 'Price is required',
                      })}
                      step={0.0000001}
                      type="number"
                      defaultValue={5}
                    />
                    {errors.name && errors.name.message && (
                      <ErrorText>{errors.name.message}</ErrorText>
                    )}
                  </div>
                </div>

                <div className="col-md-12 col-xl-12 mt_lg--15 mt_md--15 mt_sm--15">
                  <div className="input-box">
                    <Button type="submit" fullwidth>
                      List NFT
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
    </div>
  );
};
