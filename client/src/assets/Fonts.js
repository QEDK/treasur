import {Global} from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  src: local(''),
       url('../fonts/lato-v17-latin-ext_latin-regular.woff2') format('woff2'), 
       url('../fonts/lato-v17-latin-ext_latin-regular.woff') format('woff'); 
}
    `}
  />
);

export default Fonts;
