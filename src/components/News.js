import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Option } from "antd/lib/mentions";
import { Dispatch } from "react";
import { fetchNewsData } from "./store";

function News(props) {
  const dispatch = useDispatch();
  const topicsCount = props.simplified ? 6 : 12;
  function onSelectHandler(value) {
    dispatch(fetchNewsData(value));
  }

  return (
    <Fragment>
      <Row gutter={[24, 24]}>
        {!props.simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={onSelectHandler}
            >
              {props.cryptoCoins.map(function (coin) {
                return <Option value={coin.name}>{coin.name}</Option>;
              })}
            </Select>
          </Col>
        )}

        {props.news.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <Row gutter={[24, 24]}>
            {props.news.slice(0, topicsCount).map(function (topic, index) {
              return (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Card hoverable className="news-card">
                    <a href={topic.url} target="_blank" rel="moreferrer">
                      <div className="news-image-container">
                        <Typography.Title className="news-title" level={4}>
                          {topic.name}
                        </Typography.Title>
                        <img
                          style={{ maxWidth: "200px", maxHeight: "100px" }}
                          src={topic.image?.thumbnail.contentUrl}
                        ></img>
                      </div>
                      <p>
                        {topic.description.length > 200
                          ? `${topic.description.substring(0, 200)}...`
                          : topic.description}
                      </p>
                      <div className="provider-container">
                        <div>
                          <Avatar
                            src={
                              topic.provider[0]?.image?.thumbnail?.contentUrl
                            }
                          />
                          <Typography.Text className="provider-name">
                            {topic.provider[0].name}
                          </Typography.Text>
                        </div>
                        <Typography.Text>
                          {moment(topic.datePublished).startOf("ss").fromNow()}
                        </Typography.Text>
                      </div>
                    </a>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Row>
    </Fragment>
  );
}

export default News;
