import { browserHistory } from 'react-router';
import 'whatwg-fetch';

const serverConfig = {
  url: '',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export const doListRacksLocation = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.LIST_RACK_LOCATION_REQUEST,
    listRacksLocationData: [],
  });
  fetch(`${serverConfig.url}/listRacksLocation`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.LIST_RACK_LOCATION_SUCCESS,
        listRacksLocationData: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.LIST_RACK_LOCATION_FAILURE,
        listRacksLocationData: [],
      });
    });
};
