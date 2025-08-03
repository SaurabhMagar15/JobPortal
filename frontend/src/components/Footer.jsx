import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray-200 border-t border-gray-300">
      <footer className="py-2 sm:py-3 lg:py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Name */}
          <div className="text-center mb-1.5 sm:mb-2 lg:mb-3">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              job <span className="text-[#f83002]">portal</span>
            </h2>
            <p className="text-gray-600 mt-0.5 text-xs sm:text-sm lg:text-base">Find your dream job today</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-3 sm:space-x-4 lg:space-x-6 mb-1.5 sm:mb-2 lg:mb-3">
            {/* Facebook */}
            <a 
              href='https://facebook.com' 
              className='p-1.5 sm:p-2 lg:p-2.5 bg-white border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 shadow-sm' 
              aria-label='Facebook'
            >
              <svg className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600' viewBox='0 0 24 24' fill="currentColor">
                <path d='M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.83c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z' />
              </svg>
            </a>

            {/* Twitter */}
            <a 
              href='https://twitter.com' 
              className='p-1.5 sm:p-2 lg:p-2.5 bg-white border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 shadow-sm' 
              aria-label='Twitter'
            >
              <svg className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-500' viewBox='0 0 24 24' fill="currentColor">
                <path d='M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.6 8.6 0 01-2.72 1.04A4.28 4.28 0 0016.1 4c-2.37 0-4.28 1.92-4.28 4.28 0 .34.04.68.11 1A12.13 12.13 0 013 5.14a4.27 4.27 0 001.33 5.7A4.23 4.23 0 012.8 10v.05a4.29 4.29 0 003.43 4.2 4.27 4.27 0 01-1.12.15c-.27 0-.54-.03-.8-.08a4.28 4.28 0 004 2.97A8.6 8.6 0 012 19.54 12.1 12.1 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.53A8.3 8.3 0 0022.46 6z' />
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href='https://linkedin.com' 
              className='p-1.5 sm:p-2 lg:p-2.5 bg-white border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-700 transition-all duration-300 transform hover:scale-105 shadow-sm' 
              aria-label='LinkedIn'
            >
              <svg className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-700' viewBox='0 0 24 24' fill="currentColor">
                <path d='M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.5h5V24H0V8.5zm7.5 0h4.74v2.1h.07c.66-1.24 2.28-2.54 4.7-2.54 5.02 0 5.95 3.31 5.95 7.61V24h-5v-6.81c0-1.62-.03-3.7-2.26-3.7-2.26 0-2.6 1.76-2.6 3.58V24h-5V8.5z' />
              </svg>
            </a>

            {/* GitHub */}
            <a 
              href='https://github.com' 
              className='p-1.5 sm:p-2 lg:p-2.5 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-sm' 
              aria-label='GitHub'
            >
              <svg className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-700' viewBox='0 0 24 24' fill="currentColor">
                <path d='M12 .5C5.37.5 0 5.87 0 12.5c0 5.28 3.44 9.75 8.2 11.33.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.78-1.34-1.78-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.84 1.32 3.53 1 .11-.78.42-1.32.76-1.63-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.88-.01 3.27 0 .32.22.69.82.57A12 12 0 0024 12.5C24 5.87 18.63.5 12 .5z' />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-gray-300 pt-1 sm:pt-1.5 lg:pt-2">
            <p className="text-gray-600 text-xs sm:text-sm">
              © {currentYear} Job Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
