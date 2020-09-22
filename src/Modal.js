import React, { createContext, useState, useContext, useEffect } from 'react';
import classNames from 'classnames';

const Context = createContext(() => {});

export function useModal() {
  const context = useContext(Context);
  return context;
}

function Modal({ children }) {
  const [state, setState] = useState({ modal: null, options: {} });

  function setModal(modal, options) {
    setState({
      modal,
      options,
    });
  }

  function onBackdropClick() {
    setModal();
  }

  return (
    <Context.Provider value={setModal}>
      {children}
      {state.modal ? (
        <div className="bb-fixed bb-inset-0 bb-z-10">
          <div
            style={{ backdropFilter: 'blur(5px)' }}
            onClick={onBackdropClick}
            className="bb-cursor-not-allowed bb-fixed bb-inset-0 bb-h-full bb-bg-gray-600 bb-bg-opacity-75"
          ></div>

          <div className="bb-flex bb-flex-col bb-fixed bb-inset-0 bb-overflow-y-auto">
            <div onClick={onBackdropClick} className="bb-cursor-not-allowed bb-flex-auto"></div>
            <div onClick={onBackdropClick} className="bb-cursor-not-allowed bb-h-4 bb-flex-none"></div>
            <div className="bb-flex">
              <div onClick={onBackdropClick} className="bb-cursor-not-allowed bb-flex-auto"></div>
              <div onClick={onBackdropClick} className="bb-cursor-not-allowed bb-w-4 bb-flex-none"></div>
              {state.modal}
              <div onClick={onBackdropClick} className="bb-cursor-not-allowed bb-w-4 bb-flex-none"></div>
              <div onClick={onBackdropClick} className="bb-cursor-not-allowed bb-flex-auto"></div>
            </div>
            <div onClick={onBackdropClick} className="bb-cursor-not-allowed bb-h-4 bb-flex-none"></div>
            <div onClick={onBackdropClick} className="bb-cursor-not-allowed bb-flex-auto"></div>
          </div>
        </div>
      ) : null}
    </Context.Provider>
  );
}
export default Modal;
