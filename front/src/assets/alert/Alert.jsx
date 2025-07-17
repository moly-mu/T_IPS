import PropTypes from 'prop-types';

export const Alert = ({ type = 'info', message, onClose }) => {
  const colorMap = {
    info: 'blue',
    success: 'green',
    error: 'red',
    warning: 'yellow',
    dark: 'gray',
  };

  const color = colorMap[type] || 'blue';

  return (
    <div
      className={`flex items-center p-4 mb-4 text-${color}-800 border-t-4 border-${color}-300 bg-${color}-50 dark:text-${color}-400 dark:bg-gray-800 dark:border-${color}-800`}
      role="alert">
      <svg className="shrink-0 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ms-3 text-sm font-medium">
        {message}
      </div>
      <button
        type="button"
        onClick={onClose}
        className={`ms-auto -mx-1.5 -my-1.5 bg-${color}-50 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-${color}-400 dark:hover:bg-gray-700`}>
        <span className="sr-only">Dismiss</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning', 'dark']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
