import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Home from "./components/Home";

import {
  useMoralis,
  useMoralisWeb3ApiCall,
  useMoralisWeb3Api,
} from "react-moralis";

const Container = styled.div`
  margin: 0;
  padding: 0 200px;
  top: 0;
  background-color: #141a1e;
  width: 100vw;
  position: fixed;
  background-color: #141a1e;
  height: 100vh;
  display: flex;
  color: white;
  background-color: inherit;
  justify-content: space-between;
  flex: 1;
  @media (max-width: 768px) {
    padding: 0 50px;
  }
`;

const Button = styled.button`
  width: 20rem;
  font-size: 1em;
  margin: 1em;
  padding: 0.95em 1em;
  border: 2px solid royalblue;
  border-radius: 30px;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

function App() {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [address, setAddress] = useState();
  const [value, setValue] = useState("polygon");

  const Web3Api = useMoralisWeb3Api();

  // TOKEN API CALL
  const { fetch: tokenFetch, data: tokenData } = useMoralisWeb3ApiCall(
    Web3Api.account.getTokenBalances,
    {
      chain: value,
    }
  );

  // Native Balance API CALL
  const { fetch: nativeBalanceFetch, data: nativeBalance } =
    useMoralisWeb3ApiCall(Web3Api.account.getNativeBalance, {
      chain: value,
    });

  // Transaction History API CALL
  const { fetch: transactionHistoryFetch, data: transactionData } =
    useMoralisWeb3ApiCall(Web3Api.account.getTransactions, {
      chain: value,
    });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        fetch({ chain: value });
        tokenFetch();
        nativeBalanceFetch();
        transactionHistoryFetch();
        setAddress(user.attributes.ethAddress);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [user, value, tokenFetch, nativeBalanceFetch, transactionHistoryFetch]);

  if (!isAuthenticated) {
    return <Button onClick={() => authenticate()}> Connect Wallet </Button>;
  }

  return (
    <Container>
      <Home
        address={address}
        nativeBalance={nativeBalance}
        tokenData={tokenData}
        transactionData={transactionData}
      />
    </Container>
  );
}

export default App;
