import { AxiosError } from 'axios';

export const handleLogError = (error: AxiosError): void => {
  if (error.response) {
    console.log(error.response.data);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log(error.message);
  }
};
