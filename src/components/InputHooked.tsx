import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

import { useController, useFormContext, ControllerProps, UseControllerProps } from 'react-hook-form';
import { Colors } from '../styles/Index';

interface InputHookedProps extends TextInputProps, UseControllerProps {
  label: string
  name: string
  defaultValue?: string
  setFormError: Function,
  /**
   * If true, a toggle password icon will be displayed in the input.
   */
  togglePassword?: boolean,
  inputType?: 
  | "Name"
  | "Email"
  | "Password"
  | "Phone"
  | "Date"
}

export enum InputType {
  Name,
  Email,
  Password,
  Phone,
  Date
}

const ControlledInput = (props: InputHookedProps) => {

  const formContext = useFormContext();
  const { formState } = formContext;

  const {
    name,
    label,
    rules,
    defaultValue,
    ...inputProps
  } = props;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state 
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let inputContent = (
    <TextInput
      autoCapitalize="none"
      textAlign="left"
      style={InputStyle.editor}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      mode="outlined"
      outlineColor={Colors.LINE_LIGHT}
      activeOutlineColor={Colors.PRIMARY_BLUE}
      outlineStyle={{borderWidth:0.5}}
      error={hasError}
      {...inputProps}
    />
  );

  if (props.inputType
    && props.inputType == "Password"
    && props.togglePassword) {
    inputContent = (
      <TextInput
        autoCapitalize="none"
        secureTextEntry ={!showPassword}
        textAlign="left"
        style={InputStyle.editor}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...inputProps}
        mode="outlined"
        outlineColor={Colors.LINE_LIGHT}
        activeOutlineColor={Colors.PRIMARY_BLUE}
        outlineStyle={{borderWidth:0.5}}
        error={hasError}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={toggleShowPassword}
            style={{alignSelf:"center"}} />}
      />)
  }

  return (
    <View>
      {label && (<Text style={InputStyle.label}>{label}</Text>)}
      <View>
       {inputContent}
        <View style={InputStyle.errorContainer}>
          {hasError && (<Text style={InputStyle.error}>{formState.errors[name].message}</Text>)}
        </View>
      </View>
    </View>

  );
}

export const InputHooked = (props: InputHookedProps) => {

  const {
    name,
    rules,
    label,
    defaultValue,
    setFormError,
    ...inputProps
  } = props;

  const formContext = useFormContext();

  // Placeholder until input name is initialized
  if (!formContext || !name) {
    const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
    console.error(msg)
    setFormError(true)
    return null
  }

  return <ControlledInput {...props} />;

};

const InputStyle = StyleSheet.create({
  label: {
    marginTop: 10,
    fontSize: 14,
    width: "100%",
    color: Colors.GREY_MEDIUM,
// backgroundColor:"red"
  },
  editor:
  {
    borderRadius: 5,
    marginTop: 5,
    width: "100%",
    marginBottom: 5,
    fontSize: 15,
    backgroundColor:"white"
  },
  error:
  {
    fontSize: 12,
    color: "red",
    // paddingLeft: 5
  },
  errorContainer: {
    flex: -1,
    height: 25
  },
});

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  container: {
    flex: -1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#0e101c',
    borderColor: 'white',
    borderWidth: 1
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errorContainer: {
    flex: -1,
    height: 25
  },
  error: {
    color: 'red'
  }
});