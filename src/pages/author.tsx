import { useEffect } from 'react';
import { AuthorIntroArea } from '@containers/author-intro/AuthorIntroArea';
import { AuthorProfileArea } from '@containers/author-profile/AuthorProfileArea';
import SEO from '@components/seo';
import withAuth from '@components/auth/withAuth';
import useAppDispatch from '@store/hooks/useAppDispatch';
import {
  findItemsByAccount,
  findLikedItemsByAccount,
} from '../features/account/store/account.actions';
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
      <div style={{ minHeight: '100vh' }}>
        <AuthorIntroArea address={address} />
        <AuthorProfileArea address={address} />
      </div>
    </>
  );
};

export default withAuth(Author);
