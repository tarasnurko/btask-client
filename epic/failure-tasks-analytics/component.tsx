import { TaskTextArr } from "@/data/task";
import { GetFailureTasksAnalyticsRes } from "@/fetch/index";
import { Col, Progress, Row, Space, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

interface Props {
  analytics: GetFailureTasksAnalyticsRes;
}

const Component: React.FC<Props> = ({ analytics }) => {
  console.log(analytics);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {analytics.failures.map((failure, index) => (
        <Row key={index}>
          <Col span={24}>
            <Title level={5}>{TaskTextArr[failure.order - 1]}</Title>
          </Col>
          <Col span={19}>
            <Progress
              percent={failure.percentage * 100}
              strokeColor="#ff4d4f"
              strokeLinecap="butt"
              showInfo={false}
            />
          </Col>
          <Col span={4} offset={1}>
            <Text type={failure.percentage ? "danger" : "secondary"}>
              {failure.percentage * 100} %
            </Text>
          </Col>
        </Row>
      ))}
      <Text type={analytics.overall ? "warning" : "secondary"}>
        Overall: {analytics.overall} failure task(s)
      </Text>
    </Space>
  );
};

export default Component;
