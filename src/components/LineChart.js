import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import Chart from "chart.js/auto";

function LineChart(props) {
  const [coinPrice, setCoinPrice] = useState([]);
  const [coinTimestamp, setCoinTimestamp] = useState([]);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: false,
        backgroundColor: "",
        borderColor: "",
      },
    ],
  });

  useEffect(
    function () {
      setCoinPrice([]);
      setCoinTimestamp([]);

      for (let i = 0; i < props.coinHistory?.history?.length; i += 1) {
        coinPrice.push(props.coinHistory.history[i].price);
        setCoinPrice(function (prevState) {
          const prevStateToAddTo = [...prevState];
          prevStateToAddTo.push(props.coinHistory.history[i].price);
          return prevStateToAddTo;
        });
        setCoinTimestamp(function (prevState) {
          const prevStateToAddTo = [...prevState];
          prevStateToAddTo.push(
            new Date(
              props.coinHistory.history[i].timestamp
            ).toLocaleTimeString()
          );
          return prevStateToAddTo;
        });
      }

      setData({
        labels: coinTimestamp,
        datasets: [
          {
            label: "Price In USD",
            data: coinPrice,
            fill: false,
            backgroundColor: "#0071bd",
            borderColor: "#0071bd",
          },
        ],
      });
    },
    [props]
  );

  return (
    <Fragment>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">
          {props.coinName} Price Chart
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
            {props.coinHistory?.change}%
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {props.coinName} Price
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} />
    </Fragment>
  );
}

export default LineChart;
