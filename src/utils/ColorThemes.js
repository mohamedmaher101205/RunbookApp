import { createMuiTheme } from '@material-ui/core/styles';
import { yellow, green, red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    success: {
      // This is green.A700 as hex.
      main: green[500],
    },
    warning: {
        main: yellow[500],
    },
    secondary:{
        main: red[500],
    }
  },
});
