import { useCallback } from "react";
// import { useUser, useAuth } from "@realm/react";
import EncryptedStorage from 'react-native-encrypted-storage';
import * as vm from "../types/ViewModels/Index";
import * as m from "../types/Models/Index";
import * as tovm from "../types/ToViewModelConvert";
// import { IUserAccount } from "../types/Models/Index";
import CONSTANTS from "../constants";
import * as api from "./ApiActions";

const postOptions = (data) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }
};

async function DoLogOut() {

  await CurrentUser.delete();
  // Add UI for logging out...
}

async function DoLogin(email: string, password: string): Promise<vm.IAccountInfoResultViewModel> {
  try {
    // console.log('inside dologin now')
    let loginResult: m.IAccountInfoResult = await api.LoginAsync(email, password);
    let result: vm.IAccountInfoResultViewModel = tovm.ToAccountInfoResultViewModel(loginResult);
    //TODO: resolvet this error, save user in storage if success
    // console.log(`Dologin result is ${JSON.stringify(result)}`)
    if (result.success) 
    {
      CurrentUser.save(result.item)
    }

    return result;
  }

  catch (error) {
    console.log(`DoLogin error is ${error}`)
    let result: vm.IAccountInfoResultViewModel = {
      success: false,
      message: error as string,
      item: {} as vm.IUserAccountViewModel
    }
    return result;
  }
}

// const GetPersistedUser = () => {
//   CurrentUser
//   .load()
//   .then(user => )
// }


const CurrentUser = {
  save: async function (userInfo: vm.IUserAccountViewModel) {
    try {
      await EncryptedStorage.setItem(
        "user_session",
        JSON.stringify(userInfo)
      );
    }
    catch (error) {
      return null
    }
  },
  load: async function () {
    try {
      const session = await EncryptedStorage.getItem("user_session");
      // console.log(`loaded user is ${session}`)
      if (session != undefined && session != null) {
        let userInfo: vm.IUserAccountViewModel = JSON.parse(session)
        // console.log(`loaded user is ${JSON.stringify(userInfo)}`)
        return userInfo;
      }
      return null;
    }
    catch (error) {
      return null;
    }
  },
  delete: async function () {
    try {
      await EncryptedStorage.removeItem("user_session");
      return true;
    }
    catch (error) {
      return null;
    }
  },
}
const GetUser = (async () => {
  const user = await CurrentUser.load();
  return user;
})

const AuthManager =
{
  DoLogin,
  DoLogOut,
  CurrentUser,
  GetUser
}

export default AuthManager;


