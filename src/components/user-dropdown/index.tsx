import Image from 'next/image';
import Anchor from '@ui/anchor';
import constants from '../../common/configuration/constants';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import useMetamask from '../../features/auth/hooks/useMetamask';

const LogComponent = () => {
  const { isAuthenticated } = useAppSelector(selectAuthState);
  const { sign } = useMetamask();

  const handleDisconnectWallet = async () => {
    if (typeof window !== undefined) {
      localStorage.removeItem(constants.tokenKey);
      window.location.reload();
    }
  };

  return (
    <div className="add-fund-button mt--20 pb--20">
      <button
        className="btn btn-primary-alta w-100"
        type="button"
        onClick={isAuthenticated ? handleDisconnectWallet : sign}
      >
        {isAuthenticated ? 'Log out' : 'Log In'}
      </button>
    </div>
  );
};

const UserDropdown = () => {
  const { isAuthenticated } = useAppSelector(selectAuthState);

  return (
    <div className="icon-box">
      <Anchor path="/author">
        <Image
          src={`/images/icons/${isAuthenticated ? 'boy-avater' : 'unknown-user'}.png`}
          alt="Images"
          layout="fixed"
          width={38}
          height={38}
        />
      </Anchor>
      <div className="rn-dropdown">
        <div className="rn-inner-top">
          <h4 className="title">
            <Anchor path="/author">{isAuthenticated ? 'Jhon Doe' : 'Unnamed'}</Anchor>
          </h4>
        </div>
        <LogComponent />
        <ul className="list-inner">
          <li>
            <Anchor path="/author">My Profile</Anchor>
          </li>
          <li>
            <Anchor path="/edit-profile">Edit Profile</Anchor>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
