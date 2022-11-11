import { useEffect } from 'react';
import AuthorIntroArea from '@containers/author-intro';
import AuthorProfileArea from '@containers/author-profile';
import SEO from '@components/seo';
import withAuth from '@components/auth/withAuth';
import authorData from '../data/author.json';
import {
  findItemsByAccount,
  findLikedItemsByAccount,
} from '../features/account/store/account.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useMetamask from '../features/auth/hooks/useMetamask';

const Author = () => {
  const dispatch = useAppDispatch();
  const { address } = useMetamask();

  useEffect(() => {
    if (address) {
      dispatch(findItemsByAccount(address));
      dispatch(findLikedItemsByAccount(address));
    }
  }, [dispatch, address]);

  return (
    <>
      <SEO pageTitle="Author" />
      <AuthorIntroArea data={authorData} address={address} />
      <AuthorProfileArea address={address} />
    </>
  );
};

export default withAuth(Author);
