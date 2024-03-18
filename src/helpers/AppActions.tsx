import { useCallback } from "react";
import { useUser, useAuth } from "@realm/react";
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

export function DoLogOut() {
  const user = useUser();
  const signOut = useCallback(() => {
    user?.logOut();
  }, [user]);
  // Add UI for logging out...
}

export async function DoLogin(email: string, password: string): Promise<vm.IAccountInfoResultViewModel> {
  try {

    let loginResult: m.IAccountInfoResult = await api.LoginAsync(email, password);
    let result: vm.IAccountInfoResultViewModel = tovm.ToAccountInfoResultViewModel(loginResult);
    //TODO: resolvet this error, save user in storage if success
    if (result.success) {
      CurrentUser.save(result.item)
    }

    return result;
  }

  catch (error) {
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

      if (session != undefined && session != null) {
        let userInfo: vm.IUserAccountViewModel = JSON.parse(session)
        return userInfo;
      }
      return false;
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


export async function GetCustomerNotes(shop_id: string, customer_id: string, api_key:string = "", api_secret:string = "", skip: number = 0, take: number = 10)
  : Promise<vm.IApiQueryResultViewModel<vm.ICustomerNoteViewModel[]>> {
  try {
    
    let notes: m.IApiQueryResult<m.ICustomerNote[]> = await api.GetCustomerNotesApi(shop_id, customer_id, api_key, api_secret);
    let notesResult: vm.ICustomerNoteViewModel[] = [];
    if (notes.item != null && notes.item !== undefined) {
      notes.item.forEach(x => { notesResult.push(tovm.ToCustomerNoteViewModel(x)) })
    }
    let result: vm.IApiQueryResultViewModel<vm.ICustomerNoteViewModel[]> = {
      success: notes.success,
      message: notes.message,
      item: notesResult
    }
    //TODO: resolvet this error, save user in storage if success
    console.log(`GetCustomerNotes result is ${JSON.stringify(result)}`)

    return result;
  }

  catch (error) {
    console.log(`GetCustomerNotes error is ${error}`)
    let result: vm.IApiQueryResultViewModel<vm.ICustomerNoteViewModel[]> = {
      success: false,
      message: error as string,
      item: [] as vm.ICustomerNoteViewModel[]
    }
    return result;
  }
}

 
export async function GetTests(shop_id: string, customer_id: string, api_key:string = "", api_secret:string = "", skip: number = 0, take: number = 10)
  : Promise<vm.IApiQueryResultViewModel<vm.ITest[]>> {
  try {
    
    let tests: m.IApiQueryResult<m.ITest[]> = await api.GetTests(shop_id, customer_id, api_key, api_secret);
    let testsResult: vm.ITest[] = [];
    if (tests.item != null && tests.item !== undefined) {
      tests.item.forEach(x => { testsResult.push(tovm.ToTest(x)) })
    }
    let result: vm.IApiQueryResultViewModel<vm.ITest[]> = {
      success: tests.success,
      message: tests.message,
      item: testsResult
    }
    //TODO: resolvet this error, save user in storage if success
    console.log(`GetTests result is ${JSON.stringify(result)}`)

    return result;
  }

  catch (error) {
    console.log(`GetTests error is ${error}`)
    let result: vm.IApiQueryResultViewModel<vm.ITest[]> = {
      success: false,
      message: error as string,
      item: [] as vm.ITest[]
    }
    return result;
  }
}
