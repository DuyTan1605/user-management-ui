import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

class ErrorHandler {
  private statusCodes: { [key: number]: any } = {
    401: {
      message: 'Do not have permission',
    },
    500: {
      message: 'Server error',
    },
    503: {
      message: 'Server not avaiable',
    },
  };
  getErrorMsg(response: any) {
    let errorMsg = 'Error';

    if (response.body && response.body.data) {
      errorMsg = response.body.data;
    } else if (this.statusCodes[response.status]) {
      errorMsg = this.statusCodes[response.status].message;
    } else if (response.error && response.statusText) {
      errorMsg = response.statusText;
    }

    return errorMsg;
  }
}

export { ErrorHandler };
