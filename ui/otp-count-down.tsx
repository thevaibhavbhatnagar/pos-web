import React, { useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

interface OtpCountdownProps {
  onResend: () => void;
}

const OtpCountdown: React.FC<OtpCountdownProps> = React.memo(({ onResend }) => {
  // Controls whether the resend button is disabled
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  // Triggers the re-rendering of the countdown
  const [countdownStartTime, setCountdownStartTime] = useState<number | null>(
    null,
  );

  // Initiates the countdown and triggers the resend action
  const handleResendClick = () => {
    onResend(); // External resend logic
    setIsResendDisabled(true); // Temporarily disable the button
    setCountdownStartTime(Date.now()); // Start the countdown anew
  };

  // Custom renderer for the Countdown component
  const renderCountdown = ({ seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      // Enable resend button after countdown completes
      setIsResendDisabled(false);
      return (
        <span className="text-sm text-grey-600 font-medium">
          You may now request a new code.
        </span>
      );
    } else {
      return (
        <span className="text-sm text-grey-600 font-medium">
          {" "}
          A new code can be sent in{" "}
          <span className="text-black">{seconds}s</span>{" "}
        </span>
      );
    }
  };

  return (
    <div className="mt-0 flex flex-col items-center justify-center w-full gap-2">
      {/* Show countdown only after it has been started */}

      <button
        type="button"
        onClick={handleResendClick}
        disabled={isResendDisabled}
        className={`text-sm font-semibold hover:underline hover:text-login-color ${isResendDisabled ? "text-login-color cursor-not-allowed" : "text-login-color"}`}
      >
        Resend OTP
      </button>
      {countdownStartTime && (
        <Countdown
          key={countdownStartTime}
          date={countdownStartTime + 60000}
          renderer={renderCountdown}
        />
      )}
    </div>
  );
});

// Set a display name for the OtpCountdown component for easier debugging in React DevTools
OtpCountdown.displayName = "OtpCountdown";

export default OtpCountdown;
