import clsx from 'clsx';

type Props = {
  className?: string;
  icon: string;
  title: string;
  phoneNumbers?: string[];
  emails?: string[];
  address?: string;
};

const AddressBox = ({ className, icon, title, phoneNumbers, emails, address }: Props) => (
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

export default AddressBox;
