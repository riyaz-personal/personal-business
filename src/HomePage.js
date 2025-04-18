import React from "react";
import { Button, Typography, Row, Col, Card } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <div style={{ minHeight: "100vh", padding: "50px 20px", background: "#f0f2f5" }}>
      <Row justify="center">
        <Col xs={24} md={18} lg={12}>
          <Card
            style={{
              borderRadius: 16,
              padding: 32,
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CalculatorOutlined style={{ fontSize: 48, color: "#1890ff", marginBottom: 16 }} />
            <Title level={2}>Welcome to the Profit Calculator</Title>
            <Paragraph style={{ fontSize: 16, color: "#555" }}>
              Calculate your expected monthly and daily profit based on investment, profit percentage,
              and number of days. Perfect for business owners and traders!
            </Paragraph>

            <Link to="/calculator">
              <Button type="primary" size="large" style={{ marginTop: 24 }}>
                Start Calculating
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
