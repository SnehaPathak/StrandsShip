import * as m from "../types/Models/Index";
import { Md5 } from "ts-md5";
import CONSTANTS from "../constants";
import { Platform } from "react-native";

const postOptions = (data) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }
};

export async function LoginAsync(email: string, password: string): Promise<m.IAccountInfoResult> {

  const controller = new AbortController();
  const signal = controller.signal;

  // const timeoutId = setTimeout(() => {
  //   controller.abort(); // Abort the fetch request
  //   console.log('Fetch request timed out');
  // }, 5000);

  let apiResult: m.IAccountInfoResult = {
    success: false,
    message: "",
    item: {} as m.IUserAccount
  }
  console.log('inside LoginAsync nw')
  var fetchRequest: m.IAccountInfoResult;
  try {
    const params = {
      "user": email,
      "password": password
    }
    console.log(`params now is ${JSON.stringify(params)}`)
    // fetchRequest = fetch(`https://api.affordableallergytest.com/api/auth/login`,
    await fetch(`https://api.affordableallergytest.com/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(params)
      })
      .then((response) => {
        // console.log(`response.json now is ${JSON.stringify(response.json())}`)
        if (!response.ok) {
          console.log("if condition")
          apiResult.success = false;
          apiResult.message = 'Something went wrong on server side.';
        }
        else {
          console.log("else condition nw")
          // apiResult = JSON.parse(JSON.stringify(response.json())) as Models.IAccountInfoResult;
        }

        return response.json()
      })
      .then(data => {
        apiResult = JSON.parse(JSON.stringify(data)) as m.IAccountInfoResult;
        console.log(`data now is ${JSON.stringify(data)}`)
        console.log(`apiResult is this: ${JSON.stringify(apiResult)}`)
      })
      .catch(error => {
        apiResult.success = false;
        apiResult.message = error as string;
      }
      )
      .finally(() => {
        // return apiResult;
      })

    console.log(`apiResult before end is this: ${JSON.stringify(apiResult)}`)
    return apiResult;
  }
  catch (error) {
    console.log(`LoginAsync error: ${error}`);
    apiResult.success = false;
    apiResult.message = 'Something went wrong on server side.';
    return apiResult
  }
}

export async function GetCustomerNotesApi(shop_id: string, customer_id: string, api_key: string = "", api_secret: string = "", skip: number = 0, take: number = 10)
  : Promise<m.IApiQueryResult<m.ICustomerNote[]>> {

  const controller = new AbortController();
  const signal = controller.signal;

  // const timeoutId = setTimeout(() => {
  //   controller.abort(); // Abort the fetch request
  //   console.log('Fetch request timed out');
  // }, 5000);

  let apiResult: m.IApiQueryResult<m.ICustomerNote[]> = {
    success: false,
    message: "",
    item: []
  };

  console.log(`md5 for hello is ${Md5.hashStr("hello")}`)
  console.log(`${Date.now() / 1000}`)
  let customerSignature = Md5.hashStr(`${api_key}${api_secret}${(Date.now() / 1000 | 0)}`);
  console.log(`customer signature is ${customerSignature}`)

  console.log('inside GetCustomerNotesApi')
  var fetchRequest: m.IAccountInfoResult;
  try {
    const params = {
      "shop_id": shop_id,
      "customer_id": customer_id
    }
    console.log(`params now is ${JSON.stringify(params)}`)
    console.log(JSON.stringify({
      'customer_identifier': api_key,
      'customer_signature': customerSignature,
      // 'grant_type': 'client_credentials'
    }))

    let headers = {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
      "x-api-key": api_key,
      "x-api-signature": customerSignature,
      "x-device-platform": Platform.OS,
      "x-device-version": `${Platform.Version}`,
      "x-label": CONSTANTS.APP_LABEL_NAME,
      "x-language": "en-US"
    }
    console.log(`current date is ${new Date()}`)
    console.log(`current date unix is ${Date.now() / 1000 | 0}`)
    console.log(`headers is ${JSON.stringify(headers)}`)
    // fetchRequest = fetch(`https://api.affordableallergytest.com/api/auth/login`,
    console.log(`url is ${CONSTANTS.BASE_URL}/customernotes/${shop_id}/for_customer/${customer_id}`)

    // await fetch(`${CONSTANTS.BASE_URL}/customernotes/${shop_id}/for_customer/${customer_id}`,
    await fetch(`https://admin.affordableallergytest.com/api/accounts/self`,
      {
        method: "GET",
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json',
          "x-api-key": api_key,
          "x-api-signature": customerSignature,
          "x-device-platform": Platform.OS,
          "x-device-version": `${Platform.Version}`,
          "x-label": CONSTANTS.APP_LABEL_NAME,
          "x-language": "en-US"
        },
        // mode: "cors",
        // credentials:"include",
        // keepalive: true
        // body: JSON.stringify({
        //   'customer_identifier': api_key,
        //   'customer_signature': customerSignature,
        //   // 'grant_type': 'client_credentials'
        // })
      })
      .then((response) => {

        console.log(JSON.stringify(response))
        if (!response.ok) {
          console.log("if condition")

          apiResult.success = false;
          apiResult.message = 'Something went wrong on server side.';
        }

        return response.json()
      })
      .then(data => {
        console.log('getting data')
        console.log(`GetCustomerNotesApi data is ${JSON.stringify(data)}`)
        const customerNotes: m.ICustomerNote[] = JSON.parse(JSON.stringify(data)) as m.ICustomerNote[];
        apiResult.item = customerNotes;

        console.log(`apiResult is this: ${JSON.stringify(apiResult)}`)
      })
      .catch(error => {
        console.log(`error is ${JSON.stringify(error)}`)
        apiResult.success = false;
        apiResult.message = error as string;
      })
      .finally(() => {
      })

    console.log(`GetCustomerNotesApi apiResult before end is this: ${JSON.stringify(apiResult)}`)
    return apiResult;
  }
  catch (error) {
    console.log(`GetCustomerNotesApi error: ${error}`);
    apiResult.success = false;
    apiResult.message = 'Something went wrong on server side.';
    return apiResult
  }
}

export async function GetTests(shop_id: string, customer_id: string, api_key: string = "", api_secret: string = "", skip: number = 0, take: number = 10)
  : Promise<m.IApiQueryResult<m.ITest[]>> {

  const controller = new AbortController();
  const signal = controller.signal;

  // const timeoutId = setTimeout(() => {
  //   controller.abort(); // Abort the fetch request
  //   console.log('Fetch request timed out');
  // }, 5000);
  // let customerSignature = Md5.hashStr(`${api_key}${api_secret}${(Date.now() / 1000 | 0)}`);
  let customerSignature = Md5.hashStr(`${api_key}${api_secret}${(new Date().getTime()/ 1000 | 0)}`);
  console.log(`customer signature is ${customerSignature}`)

  let apiResult: m.IApiQueryResult<m.ITest[]> = {
    success: false,
    message: "",
    item: []
  };

  console.log('inside GetTestsApi')
  var fetchRequest: m.IAccountInfoResult;
  try {
    const params = {
      "shop_id": shop_id,
      "customer_id": customer_id
    }
    console.log(`params now is ${JSON.stringify(params)}`)
    console.log(`current date is ${new Date()} and unix stamp is ${new Date().getTime()/ 1000 | 0}`)
    // fetchRequest = fetch(`https://api.affordableallergytest.com/api/auth/login`,
    // await fetch(`${CONSTANTS.BASE_URL}/tests/${shop_id}/for_customer/${customer_id}?x-api-key=${api_key}&x-api-signature=${customerSignature}`,
    const requestBody = {
      "credentials": {
        "customer_identifier": customer_id,
        "customer_signature": customerSignature
      },
      "customer_id": customer_id,
      "skip": skip,
      "take": take,
      "keyword": ""
    }
    console.log(`request body is ${JSON.stringify(requestBody)}`)

    const header = {
      "Accept": 'application/json, text/plain, */*',
      "Content-Type": 'application/json',
      "x-api-key": api_key,
      "x-api-signature": customerSignature,
      "x-device-platform": Platform.OS,
      "x-device-version": `${Platform.Version}`,
      "x-label": CONSTANTS.APP_LABEL_NAME,
      "accept-language": "en-US"
    }

    console.log(`headers is ${JSON.stringify(header)}`)
  
    await fetch(`https://api.affordableallergytest.com/api/shopify/${shop_id}/tests`,
    {
      method: "POST",
      headers: header,
      body: JSON.stringify(requestBody),
      // mode: "cors",
      // credentials: "include",
      keepalive: true
    })
    .then((response) => {
      // console.log(`response.json now is ${JSON.stringify(response.json())}`)
      console.log(`response is  ${JSON.stringify(response)} and response headers is ${JSON.stringify(response.headers)}`)
      if (!response.ok) {
        console.log("if condition")
        apiResult.success = false;
        apiResult.message = 'Something went wrong on server side.';
      }

      return response.json()
    })
    .then(data => {
      console.log(`data is ${JSON.stringify(data)}`)
      const tests: m.ITest[] = JSON.parse(JSON.stringify(data)) as m.ITest[];
      apiResult.item = tests;
      console.log(`GetTestsApi data is ${JSON.stringify(data)}`)
      console.log(`apiResult is this: ${JSON.stringify(apiResult)}`)
    })
    .catch(error => {
      apiResult.success = false;
      apiResult.message = error as string;
      console.log(`error is ${JSON.stringify(error)}`)
    })
    .finally(() => {
    })

  console.log(`GetTestsApi apiResult before end is this: ${JSON.stringify(apiResult)}`)
  return apiResult;
}
  catch (error) {
  console.log(`GetTestsApi error: ${error}`);
  apiResult.success = false;
  apiResult.message = 'Something went wrong on server side.';
  return apiResult
}
}
