import React from 'react';

export default ({
               style = {},
               fill = '#fff',
               width = '100%',
               className = '',
               height = '100%',
               viewBox = '0 0 32 32',
             }) =>
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g clipPath="url(#clip0)">
      <path d="M24.4438 7.26259L17.4438 0.762586C17.2538 0.587086 16.9798 0.484711 16.6918 0.484711C16.4038 0.484711 16.1298 0.587086 15.9398 0.762586L8.93977 7.26259C8.68177 7.50309 8.61777 7.84271 8.78177 8.13359C8.94377 8.42284 9.29977 8.60971 9.69177 8.60971H13.6918V19.1722C13.6918 19.6207 14.1398 19.9847 14.6918 19.9847H18.6918C19.2438 19.9847 19.6918 19.6207 19.6918 19.1722V8.60971H23.6918C24.0838 8.60971 24.4398 8.42446 24.6018 8.13359C24.7638 7.84271 24.7038 7.50146 24.4438 7.26259Z" fill="#3C4858"/>
      <path d="M27.6895 18.3597V23.2347H5.68945V18.3597H1.68945V24.8597C1.68945 25.7583 2.58545 26.4847 3.68945 26.4847H29.6895C30.7955 26.4847 31.6895 25.7583 31.6895 24.8597V18.3597H27.6895Z" fill="#3C4858"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect x="0.689697" y="0.484711" width="32" height="26" fill="white"/>
      </clipPath>
    </defs>
  </svg>;