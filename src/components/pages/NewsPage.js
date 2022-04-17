import News from "../News";

function NewsPage(props) {
  return (
    <News
      news={props.news}
      cryptoCoins={props.cryptoCoins}
      simplified={props.simplified}
    />
  );
}

export default NewsPage;
