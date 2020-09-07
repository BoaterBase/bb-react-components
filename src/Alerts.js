import React, { createContext, useState, useContext, useEffect } from 'react';
import classNames from 'classnames';

const Context = createContext({ createAlert: (message, level) => alert(message) });

export function useAlerts() {
  const context = useContext(Context);
  return context;
}

function Alerts({ children }) {
  let mounted = true;

  useEffect(() => {
    return () => {
      mounted = false;
    };
  }, []);

  const [alerts, setAlerts] = useState([]);
  function deleteAlert(deleteKey) {
    if (mounted) {
      // Timeout caches old state so use reducer
      setAlerts((currentAlerts) => currentAlerts.filter(({ key }) => key !== deleteKey));
    }
  }

  function createAlert(message, level = 'warning', to, link) {
    const key = Date.now() + Math.random();
    setAlerts([...alerts, { key, message, level }]);
    setTimeout(() => deleteAlert(key), 5000);
  }

  return (
    <Context.Provider value={{ createAlert }}>
      {children}
      {alerts.length ? (
        <div className="bb-z-50 bb-fixed bb-bottom-0 bb-left-0 bb-w-full bb-space-y-1 bb-p-3">
          {alerts.map(({ key, message, level }) => (
            <Alert key={key} message={message} level={level} onClick={() => deleteAlert(key)} />
          ))}
        </div>
      ) : null}
    </Context.Provider>
  );
}

export default Alerts;

function Alert({ message, level, onClick }) {
  // Write out classes to prevent css purging
  const styles = {
    success: {
      bg: 'bb-bg-green-100 bb-border-green-500',
      icon: 'bb-text-green-400',
      text: 'bb-text-green-800',
      button: 'bb-text-green-500 hover:bb-bg-green-100 focus:bb-bg-green-100',
    },
    warning: {
      bg: 'bb-bg-orange-100 bb-border-orange-500',
      icon: 'bb-text-orange-400',
      text: 'bb-text-orange-800',
      button: 'bb-text-orange-500 hover:bb-bg-orange-100 focus:bb-bg-orange-100',
    },
    error: {
      bg: 'bb-bg-red-100 bb-border-red-500',
      icon: 'bb-text-red-400',
      text: 'bb-text-red-800',
      button: 'bb-text-red-500 hover:bb-bg-red-100 focus:bb-bg-red-100',
    },
  };

  return (
    <div className={classNames('bb-rounded-md bb-p-4 bb-shadow-sm bb-border-2', styles[level].bg)}>
      <div className="bb-flex">
        <div className="bb-flex-shrink-0">
          <svg className={classNames('bb-h-5 bb-w-5', styles[level].icon)} viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="bb-ml-3">
          <p className={classNames('bb-text-sm bb-leading-5 bb-font-medium', styles[level].text)}>{message}</p>
        </div>
        <div className="bb-ml-auto bb-pl-3">
          <div className="bb--mx-1.5 bb--my-1.5">
            <button
              onClick={onClick}
              className={classNames(
                'bb-inline-flex bb-rounded-md bb-p-1.5 focus:bb-outline-none bb-transition bb-ease-in-out bb-duration-150',
                styles[level].button
              )}
              aria-label="Dismiss"
            >
              <svg className="bb-h-5 bb-w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
