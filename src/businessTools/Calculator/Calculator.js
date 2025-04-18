import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  InputNumber,
  Button,
  Table,
  Checkbox,
  Typography,
  Divider,
  Row,
  Col,
  Card,
  message,
} from "antd";
import {
  DollarCircleOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

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
    const newSaved = [
      ...savedResults,
      ...selectedRows.filter((r) => !savedResults.some((s) => s.key === r.key)),
    ];
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

  const totalProfit = savedResults
    .reduce((acc, curr) => acc + curr.profit, 0)
    .toFixed(2);

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
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={14} xxl={12}>
          <Row justify="center" style={{ marginBottom: 16 }}>
            <Col>
              <Link to="/" style={{ fontSize: 16 }}>
                ← Back to Homepage
              </Link>
            </Col>
          </Row>
          <Card
            title={
              <Row align="middle" gutter={10} wrap>
                <Col>
                  <DollarCircleOutlined
                    style={{ fontSize: 24, color: "#1890ff" }}
                  />
                </Col>
                <Col>
                  <Title level={3} style={{ margin: 0 }}>
                    Monthly Profit Calculator
                  </Title>
                </Col>
              </Row>
            }
            style={{
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: 8,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
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
              <Col xs={24} sm={8}>
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
              <Col xs={24} sm={8}>
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
              <Row gutter={[8, 8]} wrap>
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
            style={{
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              marginTop: 20,
            }}
          >
            <Table
              dataSource={results}
              columns={columns}
              pagination={false}
              rowKey="key"
              scroll={{ x: "max-content" }}
            />
          </Card>

          {savedResults.length > 0 && (
            <>
              <Divider />
              <Card
                title="Saved Selections"
                bordered={false}
                style={{
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Table
                  dataSource={savedResults}
                  columns={columns.filter(
                    (col) => col.title !== "Select" && col.title !== "Delete"
                  )}
                  pagination={false}
                  rowKey="key"
                  scroll={{ x: "max-content" }}
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
