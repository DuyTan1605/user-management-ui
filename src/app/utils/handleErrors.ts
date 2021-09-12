const statusCodes: { [key: number]: any } = {
  500: {
    message: 'Server error',
  },
  503: {
    message: 'Server not avaiable',
  },
};

const getErrorMsg = (response: any) => {
  let errorMsg = 'Error';

  if (response.body && response.body.data) {
    errorMsg = response.body.data;
  } else if (statusCodes[response.status]) {
    errorMsg = statusCodes[response.status].message;
  } else if (response.error && response.statusText) {
    errorMsg = response.statusText;
  }

  return errorMsg;
};

export { getErrorMsg };
