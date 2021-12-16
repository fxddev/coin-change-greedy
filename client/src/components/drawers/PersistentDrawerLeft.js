import { createContext, useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

import '../../assets/css/PersistentDrawerLeft.css'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
  const ColorModeContext = createContext({ toggleColorMode: () => { } });

  // default mode
  const [mode, setMode] = useState('dark');
  let mode_trick = 'dark'

  async function GetMode() {
    let get_mode = await localStorage.getItem("mode");
    // console.log(`get_mode = ${get_mode}`)

    if (get_mode === undefined || get_mode === null) {
      setMode('dark')
      mode_trick = 'dark'
    } else {
      setMode(get_mode)
      mode_trick = get_mode
    }
  }
  GetMode()

  // console.log(`mode_trick = ${mode_trick}`)

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

        if (mode_trick === 'dark') {
          mode_trick = 'light'
        } else {
          mode_trick = 'dark'
        }
        // console.log(`mode = ${mode}`)
        // console.log(`mode_trick = ${mode_trick}`)
        localStorage.setItem("mode", mode_trick);
      },
    }),
    [],
  );

  let my_theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={my_theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" >
            <Container>
              <Toolbar className='_toolbar'>
                <Typography variant="h6" noWrap component="div">
                  Coin Change Greedy
                </Typography>

                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {mode === 'dark' ? <LightModeIcon /> : <ModeNightIcon />}
                </IconButton>
              </Toolbar>
            </Container>
          </AppBar>
          <Main className='_main'>
            <DrawerHeader />

            <CssBaseline />
            <Container className='container_content'>
              {props.children}
            </Container>

          </Main>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// dark mode {
//   https://mui.com/customization/dark-mode/ (Toggling color mode)
// }