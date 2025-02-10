import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalStyles } from "../theme";
import { Redirect, ColorModeProvider } from "../utils";
import LeftPanel from "./LeftPanel";
import Header from "./Header";
import { Box, VStack, HStack, Loader, Text } from "../components";
import GenericAlert from "./GenericAlert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Touchpoints from "./Touchpoints";
import Comments from "../comments/Comments";
import api from "../../net/api-service";
import { parseQuery } from "../../utils/net";
import { getDefaultTimeRange } from "../../utils";
import auth from "../../auth";
import { GlobalProvider } from "../utils/GlobalContexts";

const getAPIServer = () => {
  if (window.location.host.includes("localhost")) {
    // return "http://localhost:8080";
    // OLD DEV
    // return "https://39s91vkd37.execute-api.ap-southeast-2.amazonaws.com/prod";
    // NEW DEV
    return "https://rd5a1xju35.execute-api.ap-southeast-2.amazonaws.com/prod";
    // PROD
    // return "https://z3srp8fzv0.execute-api.ap-southeast-2.amazonaws.com/prod";
  } else {
    if (window.location.host === "d1ocgin903losc.cloudfront.net") {
      return "https://rd5a1xju35.execute-api.ap-southeast-2.amazonaws.com/prod";
    }
  }
  // Default to Production
  return "https://z3srp8fzv0.execute-api.ap-southeast-2.amazonaws.com/prod";
};

const getAuthorisedUser = async () => {
  const query = parseQuery(window.location.search);

  try {
    let user = null;
    if (query && query["code"]) {
      const code = query["code"];
      user = await api.exchangeToken({ code });
    } else {
      user = await api.validateToken();
    }
    if (true) {
      const accounts = await api.account();
      var transformedAccounts = accounts.Accounts.map((x) => {
        return {
          id: x.AccountId,
          name: x.Name,
          venues: x.Venues.map((v) => {
            return { name: v.Name, surveyId: v.SurveyId };
          }),
        };
      });
      const { email, name } = user.data;
      return { email, name, accounts: transformedAccounts };
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

const App = ({}) => {
  globalStyles();
  return (
    <ColorModeProvider>
      <Router>
        <InitApi>
          <HStack
            css={{
              size: "$full",
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<InitializeApp />} />
            </Routes>
          </HStack>

          <GenericAlert />
        </InitApi>
      </Router>
    </ColorModeProvider>
  );
};

const InitApi = ({ children = null }) => {
  api.configure({ server: getAPIServer(), redirect: useNavigate() });
  return <>{children}</>;
};

const Login = () => {
  window.location.href = auth.getLoginUrl();
  return null;
};

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      await api.logout();
      window.location.href = auth.getLogoutUrl();
    };
    logout();
  }, []);
  return null;
};

const InitializeApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const makeCall = async () => {
      const user = await getAuthorisedUser();
      setCurrentUser(user);
    };
    makeCall();
  }, []);

  return (
    <Loader
      css={{ width: "100%", height: "100%" }}
      data={currentUser}
      content={() => {
        return <MainApp user={currentUser} />;
      }}
    />
  );
};

const MainApp = ({ user }) => {
  if (user.accounts.length === 0 || user.accounts[0].venues.length === 0) {
    return <NoVenues />;
  }
  return (
    <GlobalProvider
      defaultVenueId={user.accounts[0].venues[0].surveyId}
      defaultTimeRange={getDefaultTimeRange()}
      defaultCompareTo={null}
      defaultAccountId={user.accounts[0].id}
    >
      <HStack
        css={{
          backgroundColor: "$pageBackground",
          width: "100%",
          height: "100%",
        }}
      >
        <LeftPanel
          user={user}
          css={{
            width: "$navWidth",
            position: "absolute",
          }}
        />
        <VStack>
          <Header user={user} />
          <Box
            css={{
              position: "absolute",
              top: "$fullHeaderHeight",
              marginLeft: "$navCollapsedWidth",
              width: "calc($full - $navCollapsedWidth)",
              height: "calc($full - $fullHeaderHeight)",
              overflow: "scroll",
            }}
          >
            <RightPanel />
          </Box>
        </VStack>
      </HStack>
    </GlobalProvider>
  );
};

const RightPanel = () => {
  return (
    <Routes>
      <Route path="/" element={<Redirect to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/audience" element={<Audience />} /> */}
      {/* <Route path="/nps-plus" element={<NPSPlus />} /> */}
      <Route path="/touchpoints" element={<Touchpoints />} />
      {/* <Route path="/themes" element={<Themes />} /> */}
      <Route path="/comments" element={<Comments />} />
    </Routes>
  );
};

// const Audience = () => {
//   return (
//     <VStack css={{ padding: "50px" }}>
//       <h1>Audience</h1>
//     </VStack>
//   );
// };

// const NPSPlus = () => {
//   return (
//     <VStack css={{ padding: "50px" }}>
//       <h1>NPS +</h1>
//     </VStack>
//   );
// };

// const Themes = () => {
//   return (
//     <VStack css={{ padding: "50px" }}>
//       <h1>Themes</h1>
//     </VStack>
//   );
// };

// const Commentary = () => {
//   return (
//     <VStack css={{ padding: "50px" }}>
//       <h1>Commentary</h1>
//     </VStack>
//   );
// };

const NoVenues = () => {
  return (
    <VStack css={{ padding: "50px" }}>
      <Text.H1>No Venues</Text.H1>
      <Text.H2>
        There are no venues associated with your account. Please contact your
        administrator.
      </Text.H2>
    </VStack>
  );
};

export default App;
