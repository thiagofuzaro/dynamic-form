import produce from "immer";
import {
  GET_EXAMPLE_LIST,
  GET_EXAMPLE_LIST_FAIL,
  GET_EXAMPLE_LIST_SUCCESS
} from "./constants";

const INITIAL_STATE = {
  examples: {
    exampleList: [],
    empty: false,
    fail: false,
    loading: false
  }
};

const list = (state = INITIAL_STATE, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case GET_EXAMPLE_LIST:
        draft.examples.loading = true;
        return;

      case GET_EXAMPLE_LIST_SUCCESS:
        draft.examples.loading = false;
        draft.examples = { ...INITIAL_STATE.examples };
        if (payload.data) {
          draft.examples.exampleList = payload.data;
        } else {
          draft.examples.empty = true;
        }
        return;

      case GET_EXAMPLE_LIST_FAIL:
        draft.examples.loading = false;
        draft.examples = { ...INITIAL_STATE.examples };
        draft.examples.fail = true;
        return;
    }
  });

export default list;
