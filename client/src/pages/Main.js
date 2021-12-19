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
  const [msgCoinKandidat, setMsgCoinKandidat] = React.useState('');
  const [statusMsgCoinKandidatAman, setStatusMsgCoinKandidatAman] = React.useState(true);

  function handleCoinKandidat(e) {
    setCoinKandidat(e.target.value)
    console.log('isi koin kanddidat saat ini adlh')
    console.log(e.target.value)

    let coin_kandidat = e.target.value
    let array_string = []
    array_string = coin_kandidat.split(/[ ,]+/);
    console.log('array_string')
    console.log(array_string)
    // console.log(array_string.length)

    let array_int = []
    let array_salah = []
    for (let index = 0; index < array_string.length; index++) {

      console.log('array_string[index]')
      console.log(array_string[index])

      let convert_to_int = parseInt(array_string[index])
      if (array_string[index]) {
        if (isNaN(convert_to_int)) {
          // console.log(`${array_string[index]} bukan angka`)

          array_salah.push(array_string[index])
          setMsgCoinKandidat(`${array_string[index]} bukan angka`)
          setStatusMsgCoinKandidatAman(false)
          break;

          // console.log(`array_salah.length = ${array_salah.length}`)
          // if (array_salah.length > 0) {
          console.log('masih ada selain angka')
          // }
        } else {
          array_int.push(convert_to_int)

          setMsgCoinKandidat('')
          setStatusMsgCoinKandidatAman(true)

          // console.log(`array_salah.length = ${array_salah.length}`)
          // if (array_salah.length > 0) {
          //   console.log('masih ada selain angka')
          // }


          // for (let j = 0; j < array_salah.length; j++) {
          //   console.log('array_string[index]')
          //   console.log(array_string[index])
          // }
          // setStatusMsgCoinKandidatAman(true)
        }
      }

    }
    console.log(array_int)
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
        // console.log(result)
        console.log(result.data)
      })
      .catch((err) => {
        // Do somthing
        console.log(err)
      })

  }

  function contohSoalHandle() {

  }

  return (
    <>
      <Box className='box_content'>
        <div className='side_left'>
          <Paper elevation={6} className='_paper'>
            <h3>Gaskeun slurr!</h3>
            <div className='_form'>
              <TextField
                id="outlined-number"
                label="Uang Yang ingin Ditukar?"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="misal 7"
                value={coinAwal}
                onChange={e => setCoinAwal(e.target.value)}
              />
              {statusMsgCoinKandidatAman ?
                <TextField
                  id="outlined-helperText"
                  label="Kandidat Coin?"
                  helperText={msgCoinKandidat}
                  placeholder="misal 5 4 3 1"
                  value={coinKandidat}
                  onChange={handleCoinKandidat}
                />
                :
                <TextField
                  error
                  id="outlined-helperText"
                  label="Kandidat Coin?"
                  helperText={msgCoinKandidat}
                  placeholder="e.g. 5 4 3 1"
                  value={coinKandidat}
                  onChange={handleCoinKandidat}
                />
              }


              {coinAwal && coinKandidat && statusMsgCoinKandidatAman ?
                <CustomButton onClick={CoinChangeHandle}>Gasss</CustomButton>
                :
                <CustomButton disabled>Gasss</CustomButton>
              }
            </div>
          </Paper>
          <Paper elevation={6} className='_paper'>
            lorem ipsummmmmm ADSSS
          </Paper>
        </div>

        <div className='side_right'>
          <Paper elevation={6} className='_paper'>
            <h3>Nemu soal kek gini?</h3>
            <p>Terdapat lembaran uang sebesar 100.000, 50.000, 10.000, 5000, 2500, akan ditukar dengan
              uang yang jumlahnya 150.000. Jika menggunakan algoritnna Greedy maka banyaknya
              lembaran yang harus ditukar dengan jumlah uang tersebut adalah</p>
            <CustomButton onClick={contohSoalHandle}>Iya</CustomButton>
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