export const getAccessToken = () => {
    const authJson = localStorage.getItem('auth');
    // console.log(authJson);


    if (!authJson) {
        return '';
    }

    const authData = JSON.parse(authJson);
    // console.log(authData);


    return authData?.accessToken;
};