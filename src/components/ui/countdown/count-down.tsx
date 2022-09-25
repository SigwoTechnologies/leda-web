import Countdown, { zeroPad } from 'react-countdown';
import clsx from 'clsx';

type Props = {
  date: string;
  className?: string;
};

const CountdownTimer = ({ date, className }: Props) => {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) return <div>Completed</div>;
    return (
      <div className={clsx('countdown', className)}>
        <div className="countdown-container days">
          <span className="countdown-value days-bottom">{days}</span>
          <span className="countdown-heading days-top">Day</span>
        </div>
        <div className="countdown-container hours">
          <span className="countdown-value hours-bottom">{zeroPad(hours)}</span>
          <span className="countdown-heading hours-top">Hr&apos;s</span>
        </div>
        <div className="countdown-container minutes">
          <span className="countdown-value minutes-bottom">{zeroPad(minutes)}</span>
          <span className="countdown-heading minutes-top">Min&apos;s</span>
        </div>
        <div className="countdown-container seconds">
          <span className="countdown-value seconds-bottom">{zeroPad(seconds)}</span>
          <span className="countdown-heading seconds-top">Sec</span>
        </div>
      </div>
    );
  };
  return <Countdown date={new Date(date)} renderer={renderer} />;
};

export default CountdownTimer;
