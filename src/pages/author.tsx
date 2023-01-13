import withAuth from '@components/auth/withAuth';
import { AuthorIntroArea } from '@components/author/author-indroduction';
import { AuthorProfileArea } from '@components/author/author-profile-area';
import SEO from '@components/seo';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { useEffect } from 'react';
import {
  findItemsByAccount,
  findLikedItemsByAccount,
} from '../features/auth/store/account.actions';

const Author = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.marketplace);

  useEffect(() => {
    dispatch(findItemsByAccount(filters));
    dispatch(findLikedItemsByAccount(filters));
  }, [dispatch, filters]);

  return (
    <>
      <SEO pageTitle="Author" />
      <div style={{ minHeight: '100vh' }}>
        <AuthorIntroArea />
        <AuthorProfileArea />
      </div>
    </>
  );
};

export default withAuth(Author);
