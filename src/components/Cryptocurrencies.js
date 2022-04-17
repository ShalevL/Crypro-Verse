import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { Fragment, useState, useEffect } from "react";
import millify from "millify";

function Cryptocurrencies(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [localCryptoCoins, setLocalCryptoCoins] = useState([]);
  const cryptoCoinsCount = props.simplified ? 10 : 50;

  function onInputChangeHandler(e) {
    setSearchTerm(e.target.value);
  }

  useEffect(
    function () {
      setLocalCryptoCoins(props.cryptoCoins);
    },
    [props.cryptoCoins]
  );

  useEffect(
    function () {
      const filteredCryptoCoins = props.cryptoCoins.filter(function (coin) {
        return coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
      });
      setLocalCryptoCoins(filteredCryptoCoins);
    },
    [searchTerm]
  );

  return (
    <Fragment>
      {!props.simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={onInputChangeHandler}
          />
        </div>
      )}
      {localCryptoCoins.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <Row gutter={[32, 32]} className="crypto-card-container">
          {localCryptoCoins.slice(0, cryptoCoinsCount).map(function (coin) {
            return (
              <Col
                xs={24}
                sm={12}
                lg={6}
                className="crypto-card"
                key={coin.uuid}
              >
                <Link to={`/cryptoDetailsPage/${coin.uuid}`}>
                  <Card
                    key={coin.uuid}
                    title={`${coin.rank}. ${coin.name}`}
                    extra={<img className="crypto-image" src={coin.iconUrl} />}
                    hoverable
                  >
                    <p>Price: {millify(coin.price)}</p>
                    <p>Market Cap: {millify(coin.marketCap)}</p>
                    <p>Daily Change: {millify(coin.change)}</p>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
    </Fragment>
  );
}
export default Cryptocurrencies;
