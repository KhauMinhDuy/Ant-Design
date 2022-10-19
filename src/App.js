import "antd/dist/antd.min.css";
import "./App.css";
import { Button, Input, Select, Form, Table } from "antd";
import { useState } from "react";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";

function App() {
  const [loading, setLoading] = useState(false);

  const fruits = ["Banana", "Mango", "Orange", "Cherry"];
  const data = [
    {
      name: "Name 1",
      age: 10,
      address: "Address 1",
      key: "1",
    },
    {
      name: "Name 2",
      age: 11,
      address: "Address 2",
      key: "2",
    },
    {
      name: "Name 3",
      age: 13,
      address: "Address 3",
      key: "3",
    },
		{
      name: "Name 4",
      age: 13,
      address: "Address 4",
      key: "4",
    }
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "key",
			sorter: (a, b) => b.name.localeCompare(a.name),
      render: (name) => {
        return <a href="https://www.google.com">{name}</a>;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "key",
      sorter: (a, b) => a.age - b.age
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "key",
    },
    {
      title: "Graduated?",
      key: "key",
      render: (payload) => {
        return <div>{payload.age > 20 ? "True" : "False"}</div>;
      },
    },
  ];

  const handleClick = (event) => {
    console.log("click");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleFinish = (e) => {
    console.log({ e });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button
          type="primary"
          // href="https://www.google.com"
          block
          onClick={handleClick}
          loading={loading}
          icon={<PoweroffOutlined />}
          style={{ backgroundColor: "orange", color: "red" }}
          className="my-button"
        >
          My Button
        </Button>
        <br />
        <Input
          placeholder="Enter Name"
          maxLength={20}
          prefix={<UserOutlined />}
          allowClear
          // disabled
          // type="password"
        ></Input>

        <br />
        <Input.Search
          placeholder="Enter Name"
          maxLength={20}
          prefix={<UserOutlined />}
          allowClear
          onSearch={(e) => {
            console.log({ e });
          }}
          // disabled
          // type="password"
        ></Input.Search>

        <br />
        <p>Which is your favorite fruit</p>
        <Select
          mode="multiple"
          placeholder="Select Fruit"
          style={{ width: "50%" }}
          onSelect={(e) => {
            console.log({ e });
          }}
          maxTagCount={2}
          allowClear
        >
          {fruits.map((fruit, index) => {
            return (
              <Select.Option key={index} value={fruit}>
                {fruit}
              </Select.Option>
            );
          })}
        </Select>

        <br />
        <Form onFinish={handleFinish}>
          <Form.Item label="UserName" name="username">
            <Input placeholder="UserName" required></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Password" required></Input.Password>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </Form>

        <br />
        <Table dataSource={data} columns={columns}></Table>
      </header>
    </div>
  );
}

export default App;
