const getAuthConfig = () => {
  if (window.location.host.includes("localhost") || window.location.host === "d1ocgin903losc.cloudfront.net") {
    return {//Dev
      BaseUrl: "https://pp-login.auth.ap-southeast-2.amazoncognito.com/",
      ClientId: "7j0uh5pj3rp0mfj6d1qhv5ro8u"
    }
  }

  return {//Prod
    BaseUrl: "https://pp-login-prod.auth.ap-southeast-2.amazoncognito.com/",
    ClientId: "3quifjha3hvc3557eor4msmjv9"
  }
}


const createUrl = (path: string, suffix) => {
  const config = getAuthConfig();
  return `${config.BaseUrl}${path}?client_id=${config.ClientId}${suffix}`;
};

const auth = {
  getLoginUrl: () => {
    return createUrl(
      "login",
      "&response_type=code&redirect_uri=" + window.location.origin
    );
    // return `https://pp-login.auth.ap-southeast-2.amazoncognito.com/login?client_id=7j0uh5pj3rp0mfj6d1qhv5ro8u&response_type=code&redirect_uri=${window.location.origin}`;
  },
  getLogoutUrl: () => {
    return createUrl(
      "logout",
      "&logout_uri=" + window.location.origin + "/login"
    );
    // return `https://pp-login.auth.ap-southeast-2.amazoncognito.com/logout?client_id=7j0uh5pj3rp0mfj6d1qhv5ro8u&logout_uri=${window.location.origin}/login`;
  },
};

export default auth;
