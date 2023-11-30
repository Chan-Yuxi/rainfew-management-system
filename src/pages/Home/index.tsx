import { useTranslation } from "react-i18next";

import { Row, Col, Card } from "antd";
import ReactECharts from "echarts-for-react";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Row gutter={24}>
        <Col span={24}>
          <h1 className="title-deco">{t("home.welcome")}</h1>
        </Col>
        <Col span={12}>
          <Card title="Report-1">
            <ReactECharts
              className="w-full"
              option={{
                xAxis: {
                  type: "category",
                  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
                yAxis: {
                  type: "value",
                },
                series: [
                  {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: "bar",
                    showBackground: true,
                    backgroundStyle: {
                      color: "rgba(180, 180, 180, 0.2)",
                    },
                  },
                ],
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Report-2">
            <ReactECharts
              className="w-full"
              option={{
                xAxis: {},
                yAxis: {},
                series: [
                  {
                    symbolSize: 20,
                    data: [
                      [10.0, 8.04],
                      [8.07, 6.95],
                      [13.0, 7.58],
                      [9.05, 8.81],
                      [11.0, 8.33],
                      [14.0, 7.66],
                      [13.4, 6.81],
                      [10.0, 6.33],
                      [14.0, 8.96],
                      [12.5, 6.82],
                      [9.15, 7.2],
                      [11.5, 7.2],
                      [3.03, 4.23],
                      [12.2, 7.83],
                      [2.02, 4.47],
                      [1.05, 3.33],
                      [4.05, 4.96],
                      [6.03, 7.24],
                      [12.0, 6.26],
                      [12.0, 8.84],
                      [7.08, 5.82],
                      [5.02, 5.68],
                    ],
                    type: "scatter",
                  },
                ],
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
