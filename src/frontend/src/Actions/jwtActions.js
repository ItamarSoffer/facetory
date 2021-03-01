import jwtDecode from 'jwt-decode';

export const checkJwt = (jwtToken) => {
    if (jwtToken === ''){
        return false
    }
    const tokenExpiration = jwtDecode(jwtToken).exp;
    const dateNow = new Date();
    // console.log("LEFT", tokenExpiration - dateNow.getTime()/1000);
    return (tokenExpiration > dateNow.getTime()/1000)
};

export const refreshByJwt = (jwtToken) => {
    if (!checkJwt(jwtToken)){
        window.location.reload();

    }
    else{
    }

};
