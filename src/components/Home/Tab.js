import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";

import TokenTable from "../Tables/TokenTable";
import HistoryTable from "../Tables/HistoryTable";

const TabWrapper = styled.div`
  padding: 5px 20px;
  // height: 900px;
  border: 1px solid gray;
`;

const TapHead = styled.div`
  font-weight: 700;
  padding: 10px 2px;
`;

export default function App({ tokenData, transactionData }) {
  return (
    <TabWrapper>
      <Tabs>
        <TabList>
          <TapHead>
            <Tab>Token</Tab>
            <Tab>History</Tab>
          </TapHead>
        </TabList>

        <TabPanel>
          <TokenTable tokenData={tokenData} />
        </TabPanel>
        <TabPanel>
          <HistoryTable transactionData={transactionData} />
        </TabPanel>
      </Tabs>
    </TabWrapper>
  );
}
