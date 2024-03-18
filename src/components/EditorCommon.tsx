import React, { Component } from "react";
import { useState, useEffect, useReducer } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
// import DatePicker from "react-native-date-picker";


import { Colors } from "../styles/Index";
import { IsBlank } from "../helpers/ContentChecks";

export type EditorProps =
    {
        PropId?: string;
        Title?: string,
        DefaultValue?: any,
        Placeholder?: string,
        HelpMessage?: string,
        ValidationMessage?: string,
        IsRequired?: boolean,
        Type: EditorType,
        IsMultiLine?: boolean,
        Value?: string,
        IsValidInput?: boolean
        onChange?: (arg: EditorProps) => void,
        ErrorText?:string
    };

export type SetEditorInput<X> = {};

export enum EditorType {
    Name,
    Email,
    Password,
    Phone,
    Date
}

const EditorCommon = (props: EditorProps, textInputProps) => {
    const [isValidInput, setIsValidInput] = React.useState('');
    const [errors, setErrors] = React.useState(props.ErrorText);
    const [inputField, setInputField] = React.useState<EditorProps>(props);

    let content;

    function onSetInputField() { }

    // setErrors(props.ErrorText);

    const ValidateInput = (textEditorProps: EditorProps) => {
        console.log("inside ValidateInput");
        console.log("editor input is:" + textEditorProps.Value);
        let errors = "";

        const isEmpty = IsBlank(textEditorProps.Value);
        console.log(`isBlank check result ${isEmpty}`);
        if (textEditorProps.IsRequired && IsBlank(textEditorProps.Value)) {
            console.log("blank check went thru");
            errors = textEditorProps.Title + " is required.";
        }
        else {
            errors="";
            if (!IsBlank(textEditorProps.Value)) {
                if (textEditorProps.Type == EditorType.Email && !/\S+@\S+\.\S+/.test(textEditorProps.Value)) {
                    errors = "E-mail id isn't valid.";
                }
            }
        }
        setErrors(errors);
        textEditorProps.ValidationMessage = errors;
        console.log("errors: " + errors);
    }

    const setInputValue = (input: any) => {

        let newProps = {
            ...props,
            Value: input
        };
        console.log("newProps value is: " + newProps.Value);
        setInputField(newProps);
        console.log("Inside setInputValue");

        console.log("input is: " + input);
        console.log("Input value before: " + newProps.Value);
        console.log("title is: " + props.Title);
        //props.Value = input;
        console.log("Input value after: " + props.Value?.toString());
        console.log("props:" + props.PropId);
        newProps.onChange?.(newProps);
        // ValidateInput(newProps);
    }

    var styleProp;
    if (props.IsRequired?.valueOf() === false) {
        styleProp = { style: EditorStyle.editor };
    }
    else {
        styleProp = { style: EditorStyle.editor };
    }

    if (props.Type == EditorType.Email) {
        content = <TextInput
            defaultValue={props.Value}
            secureTextEntry={props.Type == EditorType.Password}
            inputMode={"email"}
            {...styleProp}
            placeholder={props.Placeholder}
            onChangeText={setInputValue}
            mode="outlined"
            error={props.IsValidInput}
            onBlur={() => ValidateInput(inputField)} />
    }
    else if (props.Type == EditorType.Phone) {
        content = <TextInput
            defaultValue={props.Value}
            secureTextEntry={props.Type == EditorType.Password}
            inputMode={"tel"}
            {...styleProp}
            placeholder={props.Placeholder}
            onChangeText={setInputValue}
            {...textInputProps}
             />
    }
    // else if (props.Type == TextEditorType.Date) {
    //     let dateString = Date.now.toString();
    //     if (props.Value && typeof props.Value != 'undefined') {
    //         dateString = props.Value.toString();
    //     }

    //     content = <DatePicker
    //         date={new Date(dateString)}
    //         mode='date'
    //         open={false}
    //         onDateChange={setInputValue} />
    // }
    else {
        content = <TextInput
            defaultValue={props.Value}
            secureTextEntry={props.Type == EditorType.Password}
            multiline={props.IsMultiLine}
            inputMode={"text"}
            {...styleProp}
            placeholder={props.Placeholder}
            onChangeText={setInputValue}
            mode="outlined"
            right={<TextInput.Icon icon="eye" />}
            onBlur={() => ValidateInput(inputField)}/>
    }

    return (
        <View>
            <Text style={EditorStyle.title}>{props.Title}</Text>
            <View >{content}</View>
            {errors  && <Text style={EditorStyle.validationMessage}>{errors}</Text>}
        </View>
    )
}

export default EditorCommon;

const EditorStyle = StyleSheet.create({
    title: {
        marginTop: 16,
        fontSize: 14,
        width: "100%",
        color: Colors.GREY_MEDIUM
    },
    editor:
    {
        borderWidth: 0.5,
        borderColor: Colors.LINE_LIGHT,
        borderRadius: 5,
        marginTop: 5,
        width: "100%",
        marginBottom: 5,
        fontSize: 15,
        // padding: 17
    },
    validationMessage:
    {
        fontSize: 12,
        color: "red",
        paddingLeft: 5
    }
})