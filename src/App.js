import "antd/dist/antd.min.css";
import "./App.css";
import {
  Button,
  Input,
  Select,
  Form,
  Table,
  message,
  Alert,
  DatePicker,
  TimePicker,
  Spin,
  Progress,
} from "antd";
import { useEffect, useState } from "react";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";

function App() {
  const [loading, setLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
	const [loadingpagination, setLoadingpagination] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loadingSpinning, setLoadingSpinning] = useState(false);
  const [dataPagination, setDataPagination] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setDataPagination(data))
      .catch((err) => {
        throw err;
      })
			.finally(() => {

			})
  }, []);

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
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "key",
      // sorter: (a, b) => b.name.localeCompare(a.name),
      render: (name) => {
        return <a href="https://www.google.com">{name}</a>;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "key",
      sorter: (a, b) => a.age - b.age,
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

  const columnsPagination = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "UserID",
      dataIndex: "userId",
    },
    {
      key: "3",
      title: "Status",
      dataIndex: "completed",
      render: (completed) => <p>{completed ? "Completed" : "Progressing"}</p>,
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
    setLoadingLogin(true);
    setTimeout(() => {
      // message.success("Login Success");
      setShowAlert(true);
      setLoadingLogin(false);
    }, 2000);
  };

  const handlerToggleSpining = (e) => {
    setLoadingSpinning((pre) => !pre);
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
        {showAlert && <Alert type="success" message="Login Success" closable />}
        <Form onFinish={handleFinish}>
          <Form.Item label="UserName" name="username">
            <Input placeholder="UserName" required></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Password" required></Input.Password>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loadingLogin}>
              Log In
            </Button>
          </Form.Item>
        </Form>

        <br />
        <Table dataSource={data} columns={columns}></Table>

        <br />
        <DatePicker picker="date" />
        <DatePicker.RangePicker disabled />
        <TimePicker />

        <br />
        <Spin spinning={loadingSpinning} size="default"></Spin>
        <Button onClick={handlerToggleSpining}>Toggle Spinning</Button>
        <Spin spinning={loadingSpinning} size="large">
          <p>P1</p>
          <p>P2</p>
          <p>P3</p>
        </Spin>

        <br />
        <Progress percent={33} />
        <Progress percent={33} type="circle" />
        <Progress percent={33} type="dashboard" status="active" />
        <Progress percent={33} type="line" strokeColor={"red"} strokeWidth={50} status="active" />

        <br />
        <Table dataSource={dataPagination} columns={columnsPagination}></Table>
      </header>
    </div>
  );
}

export default App;
