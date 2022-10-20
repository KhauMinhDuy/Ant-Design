import "antd/dist/antd.min.css";
import "./App.css";
import {
  Button,
  Input,
  Select,
  Form,
  Table,
  // message,
  Alert,
  DatePicker,
  TimePicker,
  Spin,
  Progress,
  Tag,
  Divider,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import {
  PoweroffOutlined,
  UserOutlined,
  PieChartFilled,
  AppleFilled,
  LoadingOutlined,
  BankTwoTone,
  LogoutOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { v4 } from "uuid";

function App() {
  const [loading, setLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loadingSpinning, setLoadingSpinning] = useState(false);
  const [dataPagination, setDataPagination] = useState([]);

  //////////////////////////// //////////////////////////
  // Pagination
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // SelectorRow
  const [alreadySelectorRow, setAlreadySelectorRow] = useState(["1", "3"]);

  // CRUD
  const [dataCRUD, setDataCRUD] = useState([
    {
      id: v4(),
      name: "Name 1",
      email: "Email 1",
      address: "Address 1",
    },
    {
      id: v4(),
      name: "Name 2",
      email: "Email 2",
      address: "Address 2",
    },
    {
      id: v4(),
      name: "Name 3",
      email: "Email 3",
      address: "Address 3",
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudent, setEditStudent] = useState({});

  // Table Search
  const [dataTableSearch, setDataTableSearch] = useState([
    {
      name: "Name 1",
      age: 13,
      address: "Address 1",
    },
    {
      name: "Name 2",
      age: 14,
      address: "Address 2",
    },
    {
      name: "Name 3",
      age: 15,
      address: "Address 3",
    },
    {
      name: "Name 4",
      age: 15,
      address: "Address 4",
    },
    {
      name: "Name 5",
      age: 13,
      address: "Address 5",
    },
  ]);

  useEffect(() => {
    setLoadingPagination(true);
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((data) => setDataPagination(data))
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          setLoadingPagination(false);
        });
    }, 2000);
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
      filters: [
        { text: "Completed", value: true },
        { text: "Progressing", value: false },
      ],
      onFilter: (value, record) => {
        return record.completed === value;
      },
    },
  ];

  const columnsSelectRow = [
    {
      title: "Student ID",
      dataIndex: "id",
    },
    {
      title: "Student Name",
      dataIndex: "name",
    },
    {
      title: "Student Grade",
      dataIndex: "grade",
      key: v4(),
      render: (tag, record) => {
        const color = tag.includes("A") ? "Green" : tag.includes("B") ? "blue" : "red";
        return (
          <Tag color={color} key={record.key}>
            {tag}
          </Tag>
        );
      },
    },
  ];

  const dataStudent = [
    {
      key: "1",
      id: 1,
      name: "Name 1",
      grade: "A++",
    },
    {
      key: "2",
      id: 2,
      name: "Name 2",
      grade: "A",
    },
    {
      key: "3",
      id: 3,
      name: "Name 3",
      grade: "A",
    },
    {
      key: "4",
      id: 4,
      name: "Name 4",
      grade: "B",
    },
    {
      key: "5",
      id: 5,
      name: "Name 5",
      grade: "C",
    },
  ];

  const columnsCRUD = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => handleEditStudent(record.id)} />
            <DeleteOutlined
              onClick={() => handlerDeleteStudent(record.id)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const columnsTableSearch = [
    {
      title: "Name",
      dataIndex: "name",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onPressEnter={(e) => {
							console.log(e.target.value);
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
			onFilter: (value, record) => {
				console.log('value', value.toLowerCase());
				return record.name.toLowerCase().includes(value.toLowerCase());
			}
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  //#region Function

  const handleClick = () => {
    console.log("click");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleFinish = (e) => {
    setLoadingLogin(true);
    setTimeout(() => {
      // message.success("Login Success");
      setShowAlert(true);
      setLoadingLogin(false);
    }, 0);
  };

  const handlerToggleSpining = () => {
    setLoadingSpinning((pre) => !pre);
  };

  const handleAddNewStudent = () => {
    const newStudent = {
      id: v4(),
      name: "NewName",
      email: "NewEmail",
      address: "NewAddress",
    };
    setDataCRUD((pre) => {
      return [...pre, newStudent];
    });
  };

  const handlerDeleteStudent = (studentId) => {
    Modal.confirm({
      title: "Bạn muốn xóa ?",
      okText: "Có",
      cancelText: "Không",
      okType: "danger",
      onOk: () => {
        setDataCRUD((pre) => {
          return pre.filter((student) => student.id !== studentId);
        });
      },
    });
  };

  const handleEditStudent = (studentId) => {
    setIsEditing(true);
    const currentStudent = dataCRUD.find((student) => student.id === studentId);
    setEditStudent(currentStudent);
  };

  const handleEditNameStudent = (e) => {
    setEditStudent((pre) => {
      return {
        ...pre,
        name: e.target.value,
      };
    });
  };

  const handleEditEmailStudent = (e) => {
    setEditStudent((pre) => {
      return {
        ...pre,
        email: e.target.value,
      };
    });
  };

  const handleEditAddressStudent = (e) => {
    setEditStudent((pre) => {
      return {
        ...pre,
        address: e.target.value,
      };
    });
  };

  const resetEditStudent = () => {
    setIsEditing(false);
    setEditStudent({});
  };

  //#endregion

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
        <>
          <Progress percent={33} />
          <Progress percent={33} type="circle" />
          <Progress percent={33} type="dashboard" status="active" />
          <Progress percent={33} type="line" strokeColor={"red"} strokeWidth={50} status="active" />
        </>

        <br />
        <Table
          dataSource={dataPagination}
          columns={columnsPagination}
          loading={loadingPagination}
          pagination={{
            current: page,
            pageSize: pageSize,
            // total: 500,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        ></Table>

        <br />
        <Table
          dataSource={dataStudent}
          columns={columnsSelectRow}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: alreadySelectorRow,
            onChange: (keys) => {
              setAlreadySelectorRow(keys);
            },
            onSelect: (record) => {
              console.log({ record });
            },
            getCheckboxProps: (record) => {
              return {
                disabled: record.grade === "C",
              };
            },
            // hideSelectAll:true,
            selections: [
              Table.SELECTION_NONE,
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT,
              {
                key: "even",
                text: "Select Even Rows",
                onSelect: (keys) => {
                  const selectedKey = keys.filter((key) => {
                    return key % 2 === 0;
                  });
                  setAlreadySelectorRow(selectedKey);
                },
              },
              {
                key: "excellent",
                text: "Select Student Excellent Grads Rows",
                onSelect: (keys) => {
                  const selectedKey = keys.filter((key) => {
                    const isExcellent = dataStudent.find((student) => {
                      return student.key === key && student.grade.includes("A");
                    });
                    return isExcellent;
                  });
                  setAlreadySelectorRow(selectedKey);
                },
              },
            ],
          }}
        ></Table>

        <br />
        <>
          <PieChartFilled style={{ color: "purple", fontSize: 100 }} />
          <PieChartFilled rotate={45} style={{ color: "purple", fontSize: 100 }} />
          <PieChartFilled rotate={90} style={{ color: "purple", fontSize: 100 }} />
          <PieChartFilled rotate={135} style={{ color: "purple", fontSize: 100 }} />
          <PieChartFilled rotate={180} style={{ color: "purple", fontSize: 100 }} />
          <PieChartFilled rotate={225} style={{ color: "purple", fontSize: 100 }} />
          <PieChartFilled rotate={270} style={{ color: "purple", fontSize: 100 }} />
          <PieChartFilled rotate={315} style={{ color: "purple", fontSize: 100 }} />
          <AppleFilled style={{ color: "green", fontSize: 100 }} />
          <LoadingOutlined style={{ color: "orange", fontSize: 100 }} />
          <BankTwoTone twoToneColor={"green"} style={{ fontSize: 100 }} />
          <Divider />
          <Button icon={<LogoutOutlined style={{ color: "red", fontSize: 20 }} />}>Logout</Button>
        </>

        <br />
        <>
          <Button onClick={handleAddNewStudent}>Add New Student</Button>
          <Table columns={columnsCRUD} dataSource={dataCRUD}></Table>
          <Modal
            title="Edit Student"
            open={isEditing}
            okText="Có"
            cancelText="Không"
            onCancel={() => {
              resetEditStudent();
            }}
            onOk={() => {
              const students = dataCRUD.map((student) => {
                return student.id === editStudent.id ? editStudent : student;
              });
              setDataCRUD(students);
              resetEditStudent();
            }}
          >
            <Input value={editStudent?.name} onChange={handleEditNameStudent} />
            <Input value={editStudent?.email} onChange={handleEditEmailStudent} />
            <Input value={editStudent?.address} onChange={handleEditAddressStudent} />
          </Modal>
        </>

        <br />
        <Table dataSource={dataTableSearch} columns={columnsTableSearch}></Table>
      </header>
    </div>
  );
}

export default App;
