import { useEffect } from 'react';
import getNftList from '../store/marketplace.actions';
import { selectState } from '../../wallet/store/wallet.slice';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';

const useMarketplace = () => {
  const dispatch = useAppDispatch();
  const nftList = useAppSelector(selectState);

  useEffect(() => {
    dispatch(getNftList());
  }, [dispatch]);

  console.log('nftList', nftList);
};

export default useMarketplace;
