import React from "react";
import { Layout, VStack, HStack, Text } from "../components";

import {
  NPSTrend,
  CollectionStatistics,
  TouchpointsOverview,
  ThemesOverview,
  Suggestions,
} from "../widgets";

const Dashboard = () => {
  return (
    <VStack>
      <HStack css={{ padding: "20px", justifyContent: "space-between" }}>
        <Text.H2>NPS+ Summary</Text.H2>
      </HStack>

      <Layout.Container>
        <Layout.Panel width={2} height={2}>
          <NPSTrend />
        </Layout.Panel>
        <Layout.Panel width={1} height={2}>
          <CollectionStatistics />
        </Layout.Panel>
        <Layout.Panel width={3} height={3}>
          <TouchpointsOverview />
        </Layout.Panel>
        <Layout.Panel width={2} height={2}>
          <ThemesOverview />
        </Layout.Panel>
        <Layout.Panel width={1} height={2}>
          <Suggestions />
        </Layout.Panel>

        {/* <DashboardPanel width={1} height={1}>
        <SomeContent>1 x 1</SomeContent>
      </DashboardPanel>
      <DashboardPanel width={2} height={1}>
        <SomeContent>2 x 1</SomeContent>
      </DashboardPanel>
      <DashboardPanel width={2} height={2}>
        <SomeContent>2 x 2</SomeContent>
      </DashboardPanel>
      <DashboardPanel width={2} height={1}>
        <SomeContent>2 x 1</SomeContent>
      </DashboardPanel>
      <DashboardPanel width={3} height={1}>
        <SomeContent>3 x 1</SomeContent>
      </DashboardPanel>
      <DashboardPanel width={1} height={2}>
        <SomeContent>1 x 2</SomeContent>
      </DashboardPanel>
      <DashboardPanel width={2} height={2}>
        <SomeContent>2 x 2</SomeContent>
      </DashboardPanel>
      <DashboardPanel width={3} height={2}>
        <SomeContent>3 x 2</SomeContent>
      </DashboardPanel>
      <DashboardPanel width={1} height={3}>
        <SomeContent>1 x 3</SomeContent>
      </DashboardPanel>
      <DashboardPanel width={2} height={3}>
        <SomeContent>2 x 3</SomeContent>
      </DashboardPanel>
      <DashboardPanel width={3} height={3}>
        <SomeContent>3 x 3</SomeContent>
      </DashboardPanel> */}
      </Layout.Container>
    </VStack>
  );
};

// const SomeContent = ({ children = null }) => {
//   return <Panel css={{ color: "#DDD", height: "100%" }}>{children}</Panel>;
// };

export default Dashboard;
