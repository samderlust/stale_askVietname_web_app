import React, { useState } from 'react';
import {
  Container,
  TextField,
  CardMedia,
  Button,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box
} from '@material-ui/core';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { signIn, signUp } from '../stores/actions';
import { RouteComponentProps } from 'react-router-dom';

const Div = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

interface ISignScreenProps extends RouteComponentProps {
  signIn: Function;
  signUp: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: 10,
      maxWidth: 300
    },
    bottomText: {
      justifySelf: 'flex-end',
      marginBottom: 20
    },
    inputBox: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      paddingBottom: 50
    }
  })
);

const _SignScreen: React.FC<ISignScreenProps> = (props: ISignScreenProps) => {
  const classes = useStyles();
  const { signIn, signUp } = props;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [errorField, setErrorField] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');

  const onSubmit = (): void => {
    if (!validateField()) {
      return;
    }
    if (isSignIn) {
      if (email === '' || password === '') return;
      signIn({ email, password });
      return;
    } else {
      signUp({
        email,
        username,
        password,
        passwordConfirm
      });
    }
  };

  const validateField = (): boolean => {
    setErrorField('');
    setErrorText(``);
    if (username === '' && !isSignIn) {
      setErrorField('username');
      setErrorText(`User name can't be empty`);
      return false;
    } else if (email === '') {
      setErrorField('email');
      setErrorText(`Email can't be empty`);
      return false;
    } else if (password === '') {
      setErrorField('password');
      setErrorText(`Password can't be empty`);
      return false;
    } else if (passwordConfirm === '' && !isSignIn) {
      setErrorField('passwordConfirm');
      setErrorText(`Confirm password can't be empty`);
      return false;
    } else if (passwordConfirm !== password && !isSignIn) {
      setErrorField('passwordConfirm');
      setErrorText(`Confirm password doesn't match`);
      return false;
    }
    return true;
  };

  return (
    <Container style={{ background: 'white' }} maxWidth="lg">
      <Div
      // style={{ height: '100%', width: '100%', display: 'flex' }}
      >
        <CardMedia
          component="img"
          image={require('../assets/images/Logo.png')}
          height={300}
          style={{
            objectFit: 'contain',
            maxWidth: 300
          }}
        />
        <Box className={classes.inputBox}>
          {!isSignIn && (
            <TextField
              error={errorField === 'username'}
              helperText={errorField === 'username' && errorText}
              className={classes.input}
              label="User Name"
              placeholder="Jonny Deep"
              value={username}
              onChange={evt => setUsername(evt.target.value)}
              variant="outlined"
              fullWidth
            />
          )}

          <TextField
            error={errorField === 'email'}
            helperText={errorField === 'email' && errorText}
            className={classes.input}
            label="email"
            placeholder="name@example.com"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            error={errorField === 'password'}
            helperText={errorField === 'password' && errorText}
            className={classes.input}
            value={password}
            onChange={evt => setPassword(evt.target.value)}
            label="password"
            onKeyDown={evt => evt.keyCode === 13 && onSubmit()}
            placeholder=""
            variant="outlined"
            fullWidth
            type="password"
          />
          {!isSignIn && (
            <TextField
              error={errorField === 'passwordConfirm'}
              helperText={errorField === 'passwordConfirm' && errorText}
              className={classes.input}
              value={passwordConfirm}
              onChange={evt => setPasswordConfirm(evt.target.value)}
              label="confirm password"
              onKeyDown={evt => evt.keyCode === 13 && onSubmit()}
              placeholder=""
              variant="outlined"
              fullWidth
              type="password"
            />
          )}
          <Button
            onClick={onSubmit}
            style={{ margin: '5px auto' }}
            variant="contained"
            color="primary"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </Box>

        <Typography className={classes.bottomText}>
          <Box component="span">
            {isSignIn ? "Don't have an account? " : 'Already have an account  '}
          </Box>
          <Button
            onClick={() => setIsSignIn(!isSignIn)}
            variant="outlined"
            color="secondary"
          >
            <Box color="#b05700" component="span" fontWeight={500}>
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </Box>
          </Button>
        </Typography>
      </Div>
    </Container>
  );
};

export const SignScreen = connect(null, { signIn, signUp })(_SignScreen);
