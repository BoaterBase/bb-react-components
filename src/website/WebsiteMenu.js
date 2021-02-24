import React from 'react';

/** Main website menu */
function Menu({ ...props }) {
  return (
    <nav className="bb-bg-gray-800">
      <div className="bb-max-w-7xl bb-mx-auto bb-px-4 sm:bb-px-6 lg:bb-px-8">
        <div className="bb-flex bb-justify-between bb-h-16">
          <div className="bb-flex">
            <div className="bb--ml-2 bb-mr-2 bb-flex bb-items-center md:bb-hidden">
              {/* Mobile menu button */}
              <button
                className="bb-inline-flex bb-items-center bb-justify-center bb-p-2 bb-rounded-md bb-text-gray-400 hover:bb-text-white hover:bb-bg-gray-700 focus:bb-outline-none focus:bb-ring-2 focus:bb-ring-inset focus:bb-ring-white"
                aria-expanded="false"
              >
                <span className="bb-sr-only">Open main menu</span>
                {/* Icon when menu is closed. */}
                {/*
          Heroicon name: menu
  
          Menu open: "hidden", Menu closed: "block"
        */}
                <svg
                  className="bb-block bb-h-6 bb-w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Icon when menu is open. */}
                {/*
          Heroicon name: x
  
          Menu open: "block", Menu closed: "hidden"
        */}
                <svg
                  className="bb-hidden bb-h-6 bb-w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="bb-flex-shrink-0 bb-flex bb-items-center">
              <img className="bb-block lg:bb-hidden bb-h-8 bb-w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
              <img
                className="bb-hidden lg:bb-block bb-h-8 bb-w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="bb-hidden md:bb-ml-6 md:bb-flex md:bb-items-center md:bb-space-x-4">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <a href="#" className="bb-bg-gray-900 bb-text-white bb-px-3 bb-py-2 bb-rounded-md bb-text-sm bb-font-medium">
                Home
              </a>
              <a href="#" className="bb-text-gray-300 hover:bb-bg-gray-700 hover:bb-text-white bb-px-3 bb-py-2 bb-rounded-md bb-text-sm bb-font-medium">
                Listings
              </a>
              <a href="#" className="bb-text-gray-300 hover:bb-bg-gray-700 hover:bb-text-white bb-px-3 bb-py-2 bb-rounded-md bb-text-sm bb-font-medium">
                Contact
              </a>
            </div>
          </div>
          <div className="bb-flex bb-items-center">
            <div className="bb-flex-shrink-0">
              <button
                type="button"
                className="bb-relative bb-inline-flex bb-items-center bb-px-4 bb-py-2 bb-border bb-border-transparent bb-shadow-sm bb-text-sm bb-font-medium bb-rounded-md bb-text-white bb-bg-indigo-500 hover:bb-bg-indigo-600 focus:bb-outline-none focus:bb-ring-2 focus:bb-ring-offset-2 focus:bb-ring-offset-gray-800 focus:bb-ring-indigo-500"
              >
                {/* Heroicon name: plus */}
                <svg className="bb--ml-1 bb-mr-2 bb-h-5 bb-w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>New Job</span>
              </button>
            </div>
            <div className="bb-hidden md:bb-ml-4 md:bb-flex-shrink-0 md:bb-flex md:bb-items-center">
              <button className="bb-bg-gray-800 bb-p-1 bb-rounded-full bb-text-gray-400 hover:bb-text-white focus:bb-outline-none focus:bb-ring-2 focus:bb-ring-offset-2 focus:bb-ring-offset-gray-800 focus:bb-ring-white">
                <span className="sr-only">View notifications</span>
                {/* Heroicon name: bell */}
                <svg className="bb-h-6 bb-w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              {/* Profile dropdown */}
              <div className="bb-ml-3 bb-relative">
                <div>
                  <button
                    className="bb-bg-gray-800 bb-flex bb-text-sm bb-rounded-full focus:bb-outline-none focus:bb-ring-2 focus:bb-ring-offset-2 focus:bb-ring-offset-gray-800 focus:bb-ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span className="bb-sr-only">Open user menu</span>
                    <img
                      className="bb-h-8 bb-w-8 bb-rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt
                    />
                  </button>
                </div>
                {/*
          Profile dropdown panel, show/hide based on dropdown state.
  
          Entering: "transition ease-out duration-200"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        */}
                <div
                  className="bb-hidden bb-origin-top-right bb-absolute bb-right-0 bb-mt-2 bb-w-48 bb-rounded-md bb-shadow-lg bb-py-1 bb-bg-white bb-ring-1 bb-ring-black bb-ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <a href="#" className="bb-block bb-px-4 bb-py-2 bb-text-sm bb-text-gray-700 hover:bb-bg-gray-100" role="menuitem">
                    Your Profile
                  </a>
                  <a href="#" className="bb-block bb-px-4 bb-py-2 bb-text-sm bb-text-gray-700 hover:bb-bg-gray-100" role="menuitem">
                    Your Profile
                  </a>
                  <a href="#" className="bb-block bb-px-4 bb-py-2 bb-text-sm bb-text-gray-700 hover:bb-bg-gray-100" role="menuitem">
                    Your Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*
Mobile menu, toggle classes based on menu state.
  
Menu open: "block", Menu closed: "hidden"
    */}
      <div className="bb-hidden md:bb-hidden">
        <div className="bb-px-2 bb-pt-2 bb-pb-3 bb-space-y-1 sm:bb-px-3">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          <a href="#" className="bb-bg-gray-900 bb-text-white bb-block bb-px-3 bb-py-2 bb-rounded-md bb-text-base bb-font-medium">
            Dashboard
          </a>
          <a href="#" className="bb-text-gray-300 hover:bb-bg-gray-700 hover:bb-text-white bb-block bb-px-3 bb-py-2 bb-rounded-md bb-text-base bb-font-medium">
            Team
          </a>
          <a href="#" className="bb-text-gray-300 hover:bb-bg-gray-700 hover:bb-text-white bb-block bb-px-3 bb-py-2 bb-rounded-md bb-text-base bb-font-medium">
            Team
          </a>
          <a href="#" className="bb-text-gray-300 hover:bb-bg-gray-700 hover:bb-text-white bb-block bb-px-3 bb-py-2 bb-rounded-md bb-text-base bb-font-medium">
            Team
          </a>
        </div>
        <div className="bb-pt-4 bb-pb-3 bb-border-t bb-border-gray-700">
          <div className="bb-flex bb-items-center bb-px-5 sm:bb-px-6">
            <div className="bb-flex-shrink-0">
              <img
                className="bb-h-10 bb-w-10 bb-rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt
              />
            </div>
            <div className="bb-ml-3">
              <div className="bb-text-base bb-font-medium bb-text-white">Tom Cook</div>
              <div className="bb-text-sm bb-font-medium bb-text-gray-400">tom@example.com</div>
            </div>
            <button className="bb-ml-auto bb-flex-shrink-0 bb-bg-gray-800 bb-p-1 bb-rounded-full bb-text-gray-400 hover:bb-text-white focus:bb-outline-none focus:bb-ring-2 focus:bb-ring-offset-2 focus:bb-ring-offset-gray-800 focus:bb-ring-white">
              <span className="bb-sr-only">View notifications</span>
              {/* Heroicon name: bell */}
              <svg className="bb-h-6 bb-w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          <div className="bb-mt-3 bb-px-2 sm:bb-px-3">
            <a
              href="#"
              className="bb-block bb-px-3 bb-py-2 bb-rounded-md bb-space-y-1 bb-text-base bb-font-medium bb-text-gray-400 hover:bb-text-white hover:bb-bg-gray-700"
            >
              Your Profile
            </a>
            <a
              href="#"
              className="bb-block bb-px-3 bb-py-2 bb-rounded-md bb-text-base bb-font-medium bb-text-gray-400 hover:bb-text-white hover:bb-bg-gray-700"
            >
              Settings
            </a>
            <a
              href="#"
              className="bb-block bb-px-3 bb-py-2 bb-rounded-md bb-text-base bb-font-medium bb-text-gray-400 hover:bb-text-white hover:bb-bg-gray-700"
            >
              Settings
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Menu;
