import {message} from "antd";
const TMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
export const apiLogin = (username, password) => {
    /*const userLoginApi = backendAPI.concat(`/login`);
    return axios.post(userLoginApi,
        {
            "username": username,
            "password": password
        })
    */
   // until api is done do a mock 
   return new Promise(function(resolve, reject) {
    // the function is executed automatically when the promise is constructed
  
    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve({status : 200, data : TMP_TOKEN}), 500);
  });
};

export const loginAction = (username, password) => {

    return async (dispatch) =>{
        apiLogin(username, password)
            .then((response) => {
                // console.log("resp", response);
                if (response.status === 201){
                    message.warning(response.data)
                }
                else if (response.status === 200){
                    message.success(`${username} logged in successfully`, 1.5);
                    return dispatch({
                        type: "LOGIN",
                        payload: true,
                        loggedUser: username,
                        jwtToken: response.data
                    })
                }
            })

    }
};


export const logoutAction = () => {
    return {
        type: "LOGIN",
        payload: false,
        loggedUser: '',
        jwtToken: ''
    }
};
