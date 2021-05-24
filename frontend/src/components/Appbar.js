import React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  InputBase,
  Typography,
  Box
} from '@material-ui/core'
import LoginForm from './LoginForm'
import CreateUserForm from './CreateUserForm'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    letterSpacing: 6,
    fontSize: 24
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  alignRight: {
    marginLeft: 'auto'
  },
  welcomeText: {
    margin: 25,
    color: '#F9EAE1'
  }
}))

const CAppBar = ({ filter, setFilter, handleLogin, handleSignUp, logout, user }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={filter}
              name="Filter"
              onChange={({ target }) => setFilter(target.value)}
            />
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            SIDE PROJECT IDEAS
          </Typography>
          {user === null ?
            <>
              <LoginForm
                handleLogin={handleLogin}
                className={classes.alignRight}
              />
              or
              <CreateUserForm
                createUser={handleSignUp}
              />
            </>
            :
            <div>
              <Box
                component="div"
                display="inline-block"
                className={classes.welcomeText}
              >
                Welcome, {user.name}!
              </Box>
              <Button
                onClick={logout}
                variant="outlined"
                style={{ color: '#F9EAE1', borderColor: '#F9EAE1' }}
              >
                Logout
              </Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default CAppBar