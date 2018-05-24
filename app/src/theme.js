import {grey100, grey300, grey400, grey500, white, darkBlack, fullBlack} from 'material-ui/styles/colors';
import spacing from 'material-ui/styles/spacing';
import {fade} from 'material-ui/utils/colorManipulator';

import constants from './parameters/constants';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default getMuiTheme({
  spacing: spacing,
  fontFamily: 'Helvetica Neue, sans-serif',
  palette: {
    primary1Color: constants.primaryColor,
    primary2Color: constants.primaryColor,
    primary3Color: grey400,
    accent1Color: constants.primary2Color,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: constants.primaryColor,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
});
