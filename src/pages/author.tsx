import { useEffect } from 'react';
import AuthorIntroArea from '@containers/author-intro';
import AuthorProfileArea from '@containers/author-profile';
import SEO from '@components/seo';
import withAuth from '@components/auth/withAuth';
import authorData from '../data/author.json';
import findItemsByAccount from '../features/account/store/account.actions';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useMetamask from '../features/auth/hooks/useMetamask';

export async function getStaticProps() {
  return { props: { className: 'template-color-1' } };
}

const Author = () => {
  const dispatch = useAppDispatch();
  const { address } = useMetamask();

  useEffect(() => {
    if (address) {
      dispatch(findItemsByAccount(address));
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
