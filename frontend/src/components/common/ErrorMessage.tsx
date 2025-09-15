export const ErrorMessage = ({message}: {message?: string}) =>
  message ? <span className="text-sm text-red-600">{message}</span> : null;
