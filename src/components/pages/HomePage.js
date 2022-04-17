import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Cryptocurrencies from "../Cryptocurrencies";
import News from "../News";
import millify from "millify";

function HomePage(props) {
  return (
    <Fragment>
      <Typography.Title level={2} className="heading">
        Global Crypto State
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(props.cryptoStats.totalCoins || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(props.cryptoStats.totalExchanges || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(props.cryptoStats.totalMarketCap || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(props.cryptoStats.total24hVolume || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(props.cryptoStats.totalMarkets || 0)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/cryptocurrenciesPage">Show More</Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies
        cryptoStats={props.cryptoStats}
        cryptoCoins={props.cryptoCoins}
        simplified={true}
      />
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Latest Crypto News
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/newsPage">Show More</Link>
        </Typography.Title>
      </div>
      <News news={props.news} simplified={true} />
    </Fragment>
  );
}

export default HomePage;
