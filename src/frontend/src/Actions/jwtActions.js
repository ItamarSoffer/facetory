import jwtDecode from 'jwt-decode';

export const checkJwt = (jwtToken) => {
    if (jwtToken === ''){
        return false
    }
    //console.log("got jwt token!! ", jwtToken)
    const tokenExpiration = jwtDecode(jwtToken).exp;
    const dateNow = new Date();
    
    // console.log("LEFT", tokenExpiration - dateNow.getTime()/1000);
    //return (tokenExpiration > dateNow.getTime()/1000)
    return true;
};

export const refreshByJwt = (jwtToken) => {
    if (!checkJwt(jwtToken)){
        window.location.reload();

    }
    else{
    }

};
