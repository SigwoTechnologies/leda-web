import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

const withAuth = (WrappedConmponent: React.FunctionComponent) => {
  const Component = (props: object) => {
    const router = useRouter();
    const { isAuthenticated, isAuthCompleted, isConnected } = useAppSelector(selectAuthState);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const shouldRenderComponent = useMemo(
      () => isAuthenticated && mounted,
      [isAuthenticated, mounted]
    );

    if (typeof window !== 'undefined') {
      if (!isConnected) {
        router.push({
          pathname: 'connect',
          query: { callbackUrl: router.pathname.replace('/', '') },
        });
        return null;
      }

      if (!isAuthenticated && isAuthCompleted) {
        router.push({
          pathname: 'signature',
          query: { callbackUrl: router.pathname.replace('/', '') },
        });
        return null;
      }

      if (shouldRenderComponent) return <WrappedConmponent {...props} />;
    }
    return null;
  };

  return Component;
};

export default withAuth;
