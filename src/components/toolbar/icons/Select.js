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
    <path d="M2 0H26V3.25H2V0Z" fill="#444444"/>
    <path d="M2 13H28V16.25H2V13Z" fill="#444444"/>
    <path d="M2 17.875H24V21.125H2V17.875Z" fill="#444444"/>
    <path d="M2 22.75H30V26H2V22.75Z" fill="#444444"/>
    <path d="M0 4.875V11.375H32V4.875H0ZM22 9.75H2V6.5H22V9.75Z" fill="#444444"/>
  </svg>;