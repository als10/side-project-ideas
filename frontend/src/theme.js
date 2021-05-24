import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#7D4F50',
    },
    secondary: {
      main: '#AA998F',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F9EAE1',
    },
  },
})