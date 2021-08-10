import {
  FETCH_ALL,
  CREATE,
  DELETE,
  UPDATE,
  LIKE,
} from "../constants/actionType";

export default (posts = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL:
      return payload;
    case CREATE:
      return [...posts, payload];
    case DELETE:
      return posts.filter((post) => post._id !== payload);
    case UPDATE:
    case LIKE:
      return posts.map((post) => (post._id === payload._id ? payload : post));
    default:
      return posts;
  }
};
