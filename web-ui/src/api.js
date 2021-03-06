import store from './store';

async function api_get(path) {
  let text = await fetch(
    "http://kitchenisland.jehaneali.site/api/v1" + path, {});
  let resp = await text.json();
  return resp.data;
}

async function api_post(path, data) {
  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },  
    body: JSON.stringify(data),
  };  
  let text = await fetch(
    "http://kitchenisland.jehaneali.site/api/v1" + path, opts);
  return await text.json();
}  
  
export function fetch_users() {
  api_get("/users").then((data) => {
    let action = {
      type: 'users/set',
      data: data,
    }
    store.dispatch(action);
  });
}

export function fetch_searches() {
  api_get("/searches").then((data) => {
    let action = {
      type: 'searches/set',
      data: data,
    }
    store.dispatch(action);
  });
}

export function fetch_posts() {
  api_get("/posts").then((data) => {
    let action = {
      type: 'posts/set',
      data: data,
    }
    store.dispatch(action);
  });
}

export function fetch_saves() {
  api_get("/recipes").then((data) => {
    let action = {
      type: 'recipes/set',
      data: data,
    }
    store.dispatch(action);
  });
}

// export function fetch_current_search() {
//   api_get("/searches/2").then((data) => {
//     let action = {
//       type: 'search/set',
//       data: data,
//     }
//     store.dispatch(action);
//   });
// }

export function api_login(name, password) {
  api_post("/session", { name, password }).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: 'session/set',
        data: data.session,
      }
      store.dispatch(action);
    }
    else if (data.error) {
      let action = {
        type: 'error/set',
        data: data.error,
      }
      store.dispatch(action);
    }
  });
}

export function create_user(user) {
  return api_post("/users", { user });
}

export function create_search(search) {
  return api_post("/searches", { search });
}

export async function create_post(post) {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();
  data.append("post[photo]", post.photo);
  data.append("post[body]", post.body);
  let opts = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    },
  };
  let text = await fetch(
    "http://kitchenisland.jehaneali.site/api/v1", opts);
  return await text.json();
}


export function load_defaults() {
  fetch_posts();
  fetch_users();
  fetch_saves();
  fetch_searches();
}