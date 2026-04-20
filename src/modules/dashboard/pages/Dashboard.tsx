import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Card, Row, Col, Statistic, Typography, Progress, List, Avatar, Tag } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export const Dashboard: React.FC = () => {
  const activities = [
    {
      name: 'Lin Lanying',
      action: 'created project',
      project: 'High Impact Project',
      time: 'a few seconds ago',
    },
    {
      name: 'Wang Zhaojun',
      action: 'updated task',
      project: 'Data Migration',
      time: '5 minutes ago',
    },
    { name: 'Dong Dongdong', action: 'commented on', project: 'Design System', time: '1 hour ago' },
    { name: 'Li Bai', action: 'deployed app', project: 'Production Env', time: '2 hours ago' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Title level={4} style={{ margin: 0 }}>
          Analysis Dashboard
        </Title>
        <Text type="secondary">
          Welcome back, here is what's happening with your projects today.
        </Text>
      </div>

      {/* Top Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16)' }}>
            <Statistic
              title="Total Sales"
              value={126560}
              precision={0}
              prefix="$"
              valueStyle={{ color: '#3f8600' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="success">
                <ArrowUpOutlined /> 12%
              </Text>{' '}
              <Text type="secondary">YoY</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16)' }}>
            <Statistic title="Site Visits" value={8846} valueStyle={{ color: '#cf1322' }} />
            <div style={{ marginTop: 8 }}>
              <Text type="danger">
                <ArrowDownOutlined /> 11%
              </Text>{' '}
              <Text type="secondary">WoW</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16)' }}>
            <Statistic title="Payments" value={6560} />
            <Progress percent={60} showInfo={false} size="small" strokeColor="#1677ff" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16)' }}>
            <Statistic title="Operational Effect" value={78} suffix="%" />
            <Progress percent={78} showInfo={false} size="small" status="active" />
          </Card>
        </Col>
      </Row>

      {/* Activities and Details */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title="Dynamic Activities"
            bordered={false}
            style={{ boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16)' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={activities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.name}`} />
                    }
                    title={
                      <span>
                        <Text strong>{item.name}</Text> {item.action} <a href="#">{item.project}</a>
                      </span>
                    }
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Quick Links"
            bordered={false}
            style={{ boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16)' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Tag color="processing" style={{ cursor: 'pointer', padding: '4px 12px' }}>
                Operation I
              </Tag>
              <Tag color="processing" style={{ cursor: 'pointer', padding: '4px 12px' }}>
                Operation II
              </Tag>
              <Tag color="processing" style={{ cursor: 'pointer', padding: '4px 12px' }}>
                Operation III
              </Tag>
              <Tag color="processing" style={{ cursor: 'pointer', padding: '4px 12px' }}>
                Operation IV
              </Tag>
              <Tag color="processing" style={{ cursor: 'pointer', padding: '4px 12px' }}>
                Operation V
              </Tag>
            </div>
            <div style={{ marginTop: 24 }}>
              <Title level={5}>Team Sentiment</Title>
              <Progress type="dashboard" percent={85} success={{ percent: 30 }} size={160} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
