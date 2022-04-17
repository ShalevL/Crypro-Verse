import "./App.css";

import { Link, Route, Routes } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/HomePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCryptoData } from "./components/store";
import { useSelector } from "react-redux";

import NewsPage from "./components/pages/NewsPage";
import { Navigate } from "react-router-dom";
import CryptoCurrenciesPage from "./components/pages/CryptoCurrenciesPage";
import CryptoDetailsPage from "./components/pages/CryptoDetailsPage";
import { fetchNewsData } from "./components/store";

function App() {
  const dispatch = useDispatch();

  const cryptoCoins = useSelector(function (state) {
    return state.currentCryptoSlice.coins;
  });

  const cryptoStats = useSelector(function (state) {
    return state.currentCryptoSlice.stats;
  });

  const news = useSelector(function (state) {
    return state.currentNewsSlice.value;
  });

  useEffect(function () {
    dispatch(fetchCryptoData());
    dispatch(fetchNewsData("Crypto Currency"));
  }, []);

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Navigate replace to="/homePage" />} />
              <Route
                path="/homePage"
                element={
                  <HomePage
                    cryptoStats={cryptoStats}
                    cryptoCoins={cryptoCoins}
                    news={news}
                  />
                }
              />

              <Route
                path="/cryptocurrenciesPage"
                element={
                  <CryptoCurrenciesPage
                    cryptoCoins={cryptoCoins}
                    cryptoStats={cryptoStats}
                    simplified={false}
                  />
                }
              />
              <Route
                path="/cryptoDetailsPage/:coinId"
                element={<CryptoDetailsPage />}
              />
              <Route
                path="/newsPage"
                element={
                  <NewsPage
                    news={news}
                    simplified={false}
                    cryptoCoins={cryptoCoins}
                  />
                }
              />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse By Shalev Lazarof
            <br />
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/newsPage">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
