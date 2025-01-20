export type ErrorProps = {
  message?: string | null;
};

const InputError = ({ message }: ErrorProps) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-label={message}
      className="text-sm font-semibold text-red-500"
    >
      <span className="mr-1">*</span>
      {message}
    </div>
  );
};
export default InputError