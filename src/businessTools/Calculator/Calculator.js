import React, { useState } from "react";
import { InputNumber, Button, Table, Checkbox, Typography, Divider, Row, Col, Card, message } from "antd";
import { DollarCircleOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Calculator = () => {
  const [amount, setAmount] = useState(100000);
  const [profitPercent, setProfitPercent] = useState(8);
  const [days, setDays] = useState(30);
  const [results, setResults] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [savedResults, setSavedResults] = useState([]);

  const calculateProfit = () => {
    if (!amount || !profitPercent || !days) {
      message.warning("Please fill in all fields");
      return;
    }

    const profit = ((amount * profitPercent) / 100 / 30) * days;

    const newResult = {
      key: Date.now().toString(),
      amount,
      profitPercent,
      days,
      profit: parseFloat(profit.toFixed(2)),
    };

    setResults([...results, newResult]);
  };

  const saveSelected = () => {
    const selectedRows = results.filter((r) => selectedKeys.includes(r.key));
    const newSaved = [...savedResults, ...selectedRows.filter((r) => !savedResults.some((s) => s.key === r.key))];
    setSavedResults(newSaved);
    message.success("Saved selected rows");
  };

  const removeSelected = () => {
    const filtered = savedResults.filter((r) => !selectedKeys.includes(r.key));
    setSavedResults(filtered);
    message.success("Removed selected rows");
  };

  const deleteEntry = (key) => {
    const filtered = results.filter((r) => r.key !== key);
    setResults(filtered);
    setSelectedKeys((prev) => prev.filter((k) => k !== key));
  };

  const resetSavedSelections = () => {
    setSavedResults([]);
    message.success("Reset saved selections");
  };

  const totalProfit = savedResults.reduce((acc, curr) => acc + curr.profit, 0).toFixed(2);

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Profit %",
      dataIndex: "profitPercent",
    },
    {
      title: "Days",
      dataIndex: "days",
    },
    {
      title: "Profit",
      dataIndex: "profit",
    },
    {
      title: "Select",
      render: (_, record) => (
        <Checkbox
          checked={selectedKeys.includes(record.key)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedKeys([...selectedKeys, record.key]);
            } else {
              setSelectedKeys(selectedKeys.filter((key) => key !== record.key));
            }
          }}
        />
      ),
    },
    {
      title: "Delete",
      render: (_, record) => (
        <Button
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => deleteEntry(record.key)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "30px", backgroundColor: "#f4f7fb", minHeight: "100vh" }}>
      <Row justify="center">
        <Col span={24} lg={14} xl={12}>
          <Card
            title={
              <Row align="middle">
                <Col>
                  <DollarCircleOutlined style={{ fontSize: 24, color: "#1890ff" }} />
                </Col>
                <Col>
                  <Title level={2} style={{ marginLeft: 10 }}>
                    Monthly Profit Calculator
                  </Title>
                </Col>
              </Row>
            }
            style={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", borderRadius: 8 }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <label>Amount (₹):</label>
                <InputNumber
                  style={{ width: "100%" }}
                  value={amount}
                  onChange={setAmount}
                  min={0}
                  step={1000}
                  placeholder="Enter amount"
                />
              </Col>
              <Col span={8}>
                <label>Profit %:</label>
                <InputNumber
                  style={{ width: "100%" }}
                  value={profitPercent}
                  onChange={setProfitPercent}
                  min={0}
                  max={100}
                  step={1}
                  placeholder="Enter profit %"
                />
              </Col>
              <Col span={8}>
                <label>Days in Month:</label>
                <InputNumber
                  style={{ width: "100%" }}
                  value={days}
                  onChange={setDays}
                  min={1}
                  max={31}
                  placeholder="Enter days"
                />
              </Col>
            </Row>

            <Button
              type="primary"
              block
              style={{ marginTop: 20 }}
              onClick={calculateProfit}
            >
              Add Calculation
            </Button>
          </Card>

          <Divider />

          <Card
            title="Calculated Entries"
            bordered={false}
            extra={
              <Row gutter={16}>
                <Col>
                  <Button type="primary" onClick={saveSelected}>
                    Sum Selected
                  </Button>
                </Col>
                <Col>
                  <Button danger onClick={removeSelected}>
                    Remove Selected
                  </Button>
                </Col>
                <Col>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={resetSavedSelections}
                    style={{ backgroundColor: "#f5222d", color: "#fff" }}
                  >
                    Reset Selections
                  </Button>
                </Col>
              </Row>
            }
            style={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", marginTop: 20 }}
          >
            <Table
              dataSource={results}
              columns={columns}
              pagination={false}
              rowKey="key"
            />
          </Card>

          {savedResults.length > 0 && (
            <>
              <Divider />
              <Card title="Saved Selections" bordered={false} style={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}>
                <Table
                  dataSource={savedResults}
                  columns={columns.filter((col) => col.title !== "Select" && col.title !== "Delete")}
                  pagination={false}
                  rowKey="key"
                />
                <Text strong style={{ marginTop: 20 }}>
                  Total Profit: ₹{totalProfit}
                </Text>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Calculator;
