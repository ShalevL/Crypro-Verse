import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Option } from "antd/lib/mentions";
import LineChart from "./LineChart";

function CryptoDetails() {
  const { coinId } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState({});
  const [cryptoHistoryDetails, setCryptoHistoryDetails] = useState({});
  const [timePeriod, setTimePeriod] = useState("7d");

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${millify(cryptoDetails["24hVolume"] || 0)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${millify(cryptoDetails?.marketCap || 0)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh?.price || 0)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.supply?.total || 0)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.supply?.circulating || 0)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  useEffect(
    function () {
      const options1 = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          "X-RapidAPI-Key": "",
        },
      };

      const options2 = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          "X-RapidAPI-Key": "",
        },
      };

      fetch(
        `https://coinranking1.p.rapidapi.com/coin/${coinId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`,
        options1
      )
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then(function (data) {
          setCryptoDetails(data.data.coin);

          return fetch(
            `https://coinranking1.p.rapidapi.com/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}  `,
            options2
          );
        })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then(function (data) {
          setCryptoHistoryDetails(data.data);
        })
        .catch((err) => console.error(err));
    },
    [coinId, timePeriod]
  );

  function onSelectChangeHandler(value) {
    setTimePeriod(value);
  }

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Typography.Title level={2} className="coin-name">
          {cryptoDetails.name ? `${cryptoDetails.name} Price` : "Loading..."}
        </Typography.Title>
        <p>
          {cryptoDetails.name} live price in US dollars. view value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={onSelectChangeHandler}
      >
        {time.map(function (timeBy) {
          return <Option value={timeBy}>{timeBy}</Option>;
        })}
      </Select>
      <LineChart
        coinHistory={cryptoHistoryDetails}
        currentPrice={cryptoDetails.price && millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Typography.Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Typography.Title level={3} className="coin-details-heading">
                Other Statistics
              </Typography.Title>
              <p>
                An overview showing the statistics of all crypto currencies.
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats" key={title}>
                <Col className="coin-stats-name">
                  <Typography.Text>{icon}</Typography.Text>
                  <Typography.Text>{title}</Typography.Text>
                </Col>
                <Typography.Text className="stats">{value}</Typography.Text>
              </Col>
            ))}
          </Col>
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Typography.Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
            {HTMLReactParser(cryptoDetails?.description || "")}
          </Typography.Title>
        </Row>
      </Col>
      <Col className="coin-links">
        <Typography.Title level={3} className="coin-details-heading">
          {cryptoDetails.name} Links
        </Typography.Title>
        {cryptoDetails.links?.map(function (link) {
          return (
            <Row className="coin-link" key={link.name}>
              <Typography.Title level={5} className="link-name">
                {link.type}
              </Typography.Title>
              <a href={link.url} target="_blank" rel="noreffer">
                {link.name}
              </a>
            </Row>
          );
        })}
      </Col>
    </Col>
  );
}

export default CryptoDetails;
