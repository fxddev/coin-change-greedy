import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useButton } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import axios from 'axios'

import '../assets/css/Main.css'

const CustomButtonRoot = styled('button')`
  background-color: #007fff;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #0059b2;
  }

  &.active {
    background-color: #004386;
  }

  &.focusVisible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`;

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { children } = props;
  const { active, disabled, focusVisible, getRootProps } = useButton({
    ...props,
    ref,
    component: CustomButtonRoot,
  });

  const classes = {
    active,
    disabled,
    focusVisible,
  };

  return (
    <CustomButtonRoot {...getRootProps()} className={clsx(classes)}>
      {children}
    </CustomButtonRoot>
  );
});

CustomButton.propTypes = {
  children: PropTypes.node,
};

export default function Main() {

  const [coinAwal, setCoinAwal] = React.useState();
  const [coinKandidat, setCoinKandidat] = React.useState();

  function handleCoinKandidat(e) {
    setCoinKandidat(e.target.value)
  }

  function CoinChangeHandle() {
    // console.log('coinAwal')
    // console.log(coinAwal)
    // console.log('coinKandidat')
    // console.log(coinKandidat)    

    const url = 'https://8000-red-kingfisher-lubl4cjs.ws-us23.gitpod.io/coin-change'

    const params = new URLSearchParams()
    params.append('coin_awal', coinAwal)
    params.append('coin_kandidat', coinKandidat)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios.post(url, params, config)
      .then((result) => {
        // Do somthing
        console.log(result)
      })
      .catch((err) => {
        // Do somthing
        console.log(err)
      })

  }

  return (
    <>
      <Box className='box_content'>
        <div className='side_left'>
          <Paper elevation={6} className='_paper'>
            <h2>Input</h2>
            <div className='_form'>
              <TextField
                id="outlined-number"
                label="Coin Awal"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={coinAwal}
                onChange={e => setCoinAwal(e.target.value)}
              />
              <TextField
                id="outlined-helperText"
                label="Kandidat Coin"
                helperText="Some important text"
                placeholder="e.g. 2 4 6 8 10"
                value={coinKandidat}
                onChange={handleCoinKandidat}
              />

              {coinAwal && coinKandidat ?
                <CustomButton onClick={CoinChangeHandle}>Solve</CustomButton>
                :
                <CustomButton disabled>Solve</CustomButton>
              }
            </div>
          </Paper>
          <Paper elevation={6} className='_paper'>
            lorem ipsummmmmm ADSSS
          </Paper>
        </div>

        <div className='side_right'>
          <Paper elevation={6} className='_paper'>
            lorem ipsummmmmm
          </Paper>
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Hello World"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            id="outlined-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField id="outlined-search" label="Search field" type="search" />
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            helperText="Some important text"
          />
        </div>

      </Box>
    </>
  );
}

// axios post using x-www-form-urlencoded{
//   https://gist.github.com/akexorcist/ea93ee47d39cf94e77802bc39c46589b
// }