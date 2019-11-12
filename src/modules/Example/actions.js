import {
  GET_EXAMPLE_LIST,
  GET_EXAMPLE_LIST_SUCCESS,
  GET_EXAMPLE_LIST_FAIL
} from "./constants";
import _mock_ from "./_mock_/index.json";

let i = 0;

export const _mock_getExampleList = () => dispatch => {
  dispatch({
    type: GET_EXAMPLE_LIST
  });

  const examples = _mock_.exampleList;

  if (i === 0) {
    setTimeout(() => {
      dispatch({
        type: GET_EXAMPLE_LIST_SUCCESS,
        payload: {
          data: examples
        }
      });
    }, 3000);

    i += 1;
  } else if (i === 1) {
    setTimeout(() => {
      dispatch({
        type: GET_EXAMPLE_LIST_SUCCESS,
        payload: {
          data: []
        }
      });
    }, 3000);

    i += 1;
  } else {
    setTimeout(() => {
      dispatch({
        type: GET_EXAMPLE_LIST_FAIL
      });
    }, 3000);

    i = 0;
  }
};
