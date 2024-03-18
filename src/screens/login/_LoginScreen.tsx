import React, { useState, useRef, useCallback } from 'react';
import { InputHooked } from '../../components/InputHooked';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useApp, useAuth } from '@realm/react';

import LoginCommonStyle from './LoginStyle';
import StatusBarApp from '../../components/StatusBarApp';
import { Colors } from '../../styles/Index';
import { TextInput } from 'react-native-paper';
import ButtonCommon from '../../components/ButtonCommon';
import CONSTANTS, { SCREENS_IDX } from '../../constants';
import { images } from '../../assets';

type FormValues = {
  email: string;
  password: string;
};


interface IAtlasError {

  message: any,
  name: any


}
interface IAuthError {
  Error: IAtlasError
}

const _LoginScreen = ({ navigation }) => {
  // useForm hook and set default behavior/values
  const email = useRef('');
  const password = useRef('');
  const submissionError = useRef('');
  const { ...methods } = useForm({ mode: 'onChange' });
  const [formError, setError] = useState<Boolean>(false);

  const app = useApp();

  const [, setAsyncError] = useState();
  const useAsyncError = useCallback(
    (e: any) => {
      setError(() => {
        console.log(`error from inside useAsyncError is ${e}`);
        throw e;
      });
    },
    [setAsyncError]
  );


  // signIn() uses the emailPassword authentication provider to log in
  const { logInWithFunction, result } = useAuth();
  const signIn = useCallback(async () => {
    try {
      console.log(`submitted data is ${email.current} and ${password.current}`);
      // const currentEmail: string = "anna@codeable.net";
      // const currentPassword: string = "Hanson1!";
      const signInResult = await logInWithFunction({ "user": email.current, "password": password.current });
      console.log(`signInResult is ${signInResult}`);
    }
    catch (error: any) {
      console.log(`error from signIn function is ${error}`)
    }


  }, [app, email, password]);

  // onPressSignIn() uses the emailPassword authentication provider to log in
  const onPressSignIn = useCallback(async () => {
    try {
      submissionError.current = "";
      const signInResult = await signIn()
        .then((response) => { console.log(`response is ${response}`) })
        .catch((e) => useAsyncError(e));

      if (result.error) {

        /**[Sneha] - this is very specific case of error response from Atlas. If the response changes, this needs to be changed */
        const responseError = result.error.message.trim().replace("Error:", "");
        const errorJson: IAtlasError = JSON.parse(responseError) as IAtlasError;
        console.log(`errorJson is ${JSON.stringify(errorJson)}`);
        if (errorJson) {
          submissionError.current = errorJson?.message;
          console.log(`errorJson is ${errorJson?.message}`)
        }
      }
      console.log(`onPressSignIn result is ${signInResult}`)
      console.log(`result is ${JSON.stringify(result)}`);
    } catch (error: any) {
      console.log(`inside exception ${error}`)
      console.log(`Failed to sign in: ${error?.message}`);
    }
  }, [signIn]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!formError) {

      console.log(`result is ${JSON.stringify(result)}`);

      email.current = data.email;
      password.current = data.password;

      try {
        onPressSignIn()
          .catch(e => {
            console.log(`errror e from onSubmit is ${e}`)
          });

      } catch (error: any) {
        console.log(`errror from onSubmit is ${error}`)
      }
      console.log(`result from onSubmit is ${JSON.stringify(result)}`);
      // navigation.reset({
      //   index: 0,
      //   routes: [{name:SCREENS_IDX.HOME_NAV}]
      // })
    }
  }

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {

    return console.log(`form errors: ${errors}`)
  }

  return (
    <View style={LoginCommonStyle.container}>
      <StatusBarApp backgroundColor={Colors.PRIMARY_BLUE} barStyle="light-content" />
      <View style={LoginCommonStyle.containerOverlay}>
        <Text style={LoginStyle.errorMessage}>{submissionError.current}</Text>
        {formError ? <View><Text style={{ color: 'red' }}>There was a problem with loading the form. Please try again later.</Text></View> :
          <>
            <FormProvider {...methods}>
              <InputHooked
                name="email"
                label="Email"
                // placeholder="jon.doe@email.com"
                keyboardType="email-address"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                    message: 'Must be formatted: john.doe@email.com',
                  },
                }
                }
                setFormError={setError}
              />
              <InputHooked
                name="password"
                label="Password"
                // placeholder="**********"
                rules={{ required: 'Password is required' }}
                setFormError={setError}
                inputType="Password"
                togglePassword
              />
            </FormProvider>
          </>
        }
        <View style={LoginStyle.buttonContainer}>
          <ButtonCommon
            title="Submit"
            theme="orange"
            // disabled={formError as boolean}
            onPress={methods.handleSubmit(onSubmit, onError)} />
          <Text style={LoginStyle.forgotPasswordLink}>
            Forgot Password?
          </Text>
          <View style={LoginStyle.separator} />
          <ButtonCommon
            title="Log in with Google"
            icnImage={images.ICN_GOOGLE}
            theme="white"
            buttonStyle={LoginStyle.button} />
        </View>
      </View>
    </View>
  );
}

export default _LoginScreen;


const LoginStyle = StyleSheet.create({
  buttonContainer:
  {
    width: "100%",
    paddingTop: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    top: 0
  },
  forgotPasswordLink:
  {
    fontSize: 16,
    color: Colors.BLACK_DARK,
    fontFamily: CONSTANTS.FONT_FAMILY,
    fontWeight: "600",
    marginTop: 24
  },
  separator:
  {
    backgroundColor: Colors.LINE_LIGHT,
    height: 1,
    width: "100%",
    marginTop: 32,
    marginBottom: 16
  },
  button: {
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  errorMessage:
  {
    color: "red",
    fontSize: 14,
    fontFamily: CONSTANTS.FONT_FAMILY,
    alignSelf: "center",
    marginBottom: 15
  }

});