import React, { useState, useEffect } from 'react'
import { Space, Table, Tag, Button, Modal, Input, Alert } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import './styles.css'

export const MainComponent = () => {
  const [data, setData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputData, setInputData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      setData(json)
      console.log(json)
      console.log(data)
    })
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(inputData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      setAlertMessage('Title has been Added!')
      setVisible(true)
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInput = (val) => {
    console.log(val);
    let obj = {
      title: val,
      body: 'bar',
      userId: 1,
    }
    setInputData(obj)
  } 

  const closeAlert = (text) => {
    setVisible(false)
  }

  const handleDelete = (record) => { 
    fetch(`https://jsonplaceholder.typicode.com/posts/${record.id}`, {
      method: 'DELETE',
    });
    setAlertMessage('Title has been Deleted!')
    setVisible(true);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><DeleteFilled style={{ color: 'red' }} onClick={() => handleDelete(record)} /></a>
        </Space>
      ),
    },
  ];
  
  return (
    <div className="table-wrapper">
      {visible ? (
        <Alert message={alertMessage} type="success" closable afterClose={closeAlert} style={{ width: '25%', position:'absolute' }} />
      ) : null}
      <Button
        type='primary'
        style={{ marginBottom: '1%', position: 'relative', float: 'right' }}
        onClick={() => showModal()}
      >
        ADD
      </Button>
      <Table className="ant-table-content" columns={columns} dataSource={data} />
      <Modal title="ADD TITLE" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Title" onChange={(e) => handleInput(e.target.value)} />
      </Modal>
    </div>
  );
}

export default MainComponent
