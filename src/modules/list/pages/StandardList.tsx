import { PlusOutlined } from '@ant-design/icons';
import { Card, List, Button, Input, Radio, Typography, Progress, Avatar } from 'antd';
import React from 'react';

const { Title, Text } = Typography;
const { Search } = Input;

export const StandardList: React.FC = () => {
  const data = [
    {
      title: 'Alipay',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGczMctcIoaBdrYgkkb.png',
      description: 'That is an inner thing, they can not reach it.',
      owner: 'Qu Lili',
      time: '2023-11-20 12:00',
      progress: 60,
      status: 'active' as const,
    },
    {
      title: 'Angular',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKjpjqhzQk0Rmsportal.png',
      description: 'Hope is a good thing, maybe the best of things.',
      owner: 'Lin Dongdong',
      time: '2023-11-20 14:00',
      progress: 100,
      status: 'success' as const,
    },
    {
      title: 'Ant Design',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrOQgsfFqVzZms.png',
      description: 'Life is like a box of chocolates, results are often unexpected.',
      owner: 'Zhou Xingxing',
      time: '2023-11-20 16:00',
      progress: 30,
      status: 'exception' as const,
    },
    {
      title: 'React',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEIdcvTLKxOSeuzQfQ.png',
      description: 'A UI library for building beautiful interfaces.',
      owner: 'Wang Zhaojun',
      time: '2023-11-20 18:00',
      progress: 80,
      status: 'active' as const,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <Title level={3}>Standard List</Title>
        <Text type="secondary">Standard list view of tasks, progress, and assignments.</Text>
      </div>

      <Card bordered={false} style={{ boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
            gap: 48,
            textAlign: 'center',
          }}
        >
          <div>
            <Text type="secondary">My Tasks</Text>
            <Title level={3} style={{ margin: 0 }}>
              8 Tasks
            </Title>
          </div>
          <div style={{ borderLeft: '1px solid #f0f0f0' }} />
          <div>
            <Text type="secondary">This Week</Text>
            <Title level={3} style={{ margin: 0 }}>
              32 Tasks
            </Title>
          </div>
          <div style={{ borderLeft: '1px solid #f0f0f0' }} />
          <div>
            <Text type="secondary">Completed</Text>
            <Title level={3} style={{ margin: 0 }}>
              24 Tasks
            </Title>
          </div>
        </div>
      </Card>

      <Card
        bordered={false}
        title="Basic List"
        style={{ boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16)' }}
        extra={
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Radio.Group defaultValue="all">
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="progress">In Progress</Radio.Button>
              <Radio.Button value="waiting">Waiting</Radio.Button>
            </Radio.Group>
            <Search placeholder="Search..." style={{ width: 200 }} />
          </div>
        }
      >
        <Button type="dashed" style={{ width: '100%', marginBottom: 16 }} icon={<PlusOutlined />}>
          Add New Task
        </Button>

        <List
          size="large"
          rowKey="title"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={[<a key="edit">Edit</a>, <a key="more">More</a>]}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 48,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text type="secondary">Owner</Text>
                  <Text>{item.owner}</Text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text type="secondary">Start Time</Text>
                  <Text>{item.time}</Text>
                </div>
                <div style={{ width: 160 }}>
                  <Progress percent={item.progress} status={item.status} size="small" />
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default StandardList;
