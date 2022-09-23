import PropTypes from 'prop-types';
import clsx from 'clsx';

// TODO: Type props and any types
const AddressBox = ({ className, icon, title, phoneNumbers, emails, address }: any) => (
  <div className={clsx('rn-address', className)}>
    <div className="icon">
      <i className={icon} />
    </div>
    <div className="inner">
      <h4 className="title">{title}</h4>
      {phoneNumbers?.map((phone: any) => (
        <p key={phone}>
          <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
        </p>
      ))}
      {emails?.map((email: any) => (
        <p key={email}>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      ))}
      {address && <p dangerouslySetInnerHTML={{ __html: address }} />}
    </div>
  </div>
);

AddressBox.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  phoneNumbers: PropTypes.arrayOf(PropTypes.string),
  emails: PropTypes.arrayOf(PropTypes.string),
  address: PropTypes.string,
};
export default AddressBox;
