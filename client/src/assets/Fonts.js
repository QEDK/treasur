import {Global} from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    /* roboto-regular - latin */
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      src: local(''),
           url('../fonts/roboto-v20-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
           url('../fonts/roboto-v20-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }

    `}
  />
);

export default Fonts;
