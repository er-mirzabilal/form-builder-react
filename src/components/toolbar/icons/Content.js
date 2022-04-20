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
      <path d="M27.6517 0.206238H1.98501C1.34073 0.206238 0.818359 0.803175 0.818359 1.53955V30.8729C0.818359 31.6093 1.34073 32.2062 1.98501 32.2062H27.6517C28.296 32.2062 28.8183 31.6093 28.8183 30.8729V1.53955C28.8184 0.803175 28.2961 0.206238 27.6517 0.206238ZM26.4851 29.5396H3.15171V2.87293H26.4851V29.5396V29.5396Z" fill="#3C4858"/>
      <path d="M22.9856 6.87292H6.65224C6.00792 6.87292 5.4856 7.46986 5.4856 8.20624C5.48554 8.94261 6.00792 9.53955 6.65224 9.53955H22.9856C23.6299 9.53955 24.1522 8.94261 24.1522 8.20624C24.1522 7.46986 23.63 6.87292 22.9856 6.87292Z" fill="#3C4858"/>
      <path d="M22.9856 12.2063H6.65224C6.00792 12.2063 5.4856 12.8032 5.4856 13.5396C5.48554 14.2759 6.00792 14.8729 6.65224 14.8729H22.9856C23.6299 14.8729 24.1522 14.276 24.1522 13.5396C24.1522 12.8032 23.63 12.2063 22.9856 12.2063Z" fill="#3C4858"/>
      <path d="M22.9856 17.5396H6.65224C6.00792 17.5396 5.4856 18.1365 5.4856 18.8729C5.48554 19.6093 6.00792 20.2062 6.65224 20.2062H22.9856C23.6299 20.2062 24.1522 19.6093 24.1522 18.8729C24.1522 18.1365 23.63 17.5396 22.9856 17.5396Z" fill="#3C4858"/>
      <path d="M13.6522 22.8729H6.65224C6.00792 22.8729 5.4856 23.4699 5.4856 24.2062C5.48554 24.9426 6.00792 25.5396 6.65224 25.5396H13.6522C14.2966 25.5396 14.8189 24.9426 14.8189 24.2062C14.8189 23.4699 14.2966 22.8729 13.6522 22.8729Z" fill="#3C4858"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect x="0.818359" y="0.206238" width="28" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg>;