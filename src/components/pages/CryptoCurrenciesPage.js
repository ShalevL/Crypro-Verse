import Cryptocurrencies from "../Cryptocurrencies";

function CryptoCurrenciesPage(props) {
  return (
    <Cryptocurrencies
      cryptoCoins={props.cryptoCoins}
      cryptoStats={props.cryptoState}
      simplified={props.simplified}
    ></Cryptocurrencies>
  );
}

export default CryptoCurrenciesPage;
