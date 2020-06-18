import { createMuiTheme } from '@material-ui/core/styles';
import Abel from '../Fonts/Abel-Regular.ttf';

export const theme = createMuiTheme({
    typography: {
      fontFamily: 'Abel',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [Abel],
        },
      },
    },
});
