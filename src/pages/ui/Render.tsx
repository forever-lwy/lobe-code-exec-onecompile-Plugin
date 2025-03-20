import { useWatchPluginMessage } from '@lobehub/chat-plugin-sdk/client';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import { Card, Divider, Typography, Alert, Tag, Spin } from "antd";

const { Title, Paragraph, Text } = Typography;

const Render = memo(() => {
  const { data, loading } = useWatchPluginMessage();
  
  if (loading) {
    return (
      <Flexbox align="center" justify="center" padding={20}>
        <Spin size="large" tip="执行代码中..." />
      </Flexbox>
    );
  }
  
  if (!data) {
    return <Alert message="没有执行结果" type="info" />;
  }

  return (
    <Card bordered>
      <Flexbox gap={16}>
        <Flexbox>
          <Title level={4}>执行状态</Title>
          <Flexbox horizontal>
            <Text>状态: </Text>
            <Tag color={data.status === 'success' ? 'green' : 'red'}>
              {data.status === 'success' ? '成功' : '失败'}
            </Tag>
            {data.executionTime !== undefined && (
              <Text type="secondary">执行时间: {data.executionTime}ms</Text>
            )}
          </Flexbox>
        </Flexbox>

        {data.stdin && (
          <Flexbox>
            <Title level={4}>标准输入</Title>
            <Card size="small">
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{data.stdin}</pre>
            </Card>
          </Flexbox>
        )}

        {data.stdout && (
          <Flexbox>
            <Title level={4}>标准输出</Title>
            <Card 
              size="small"
              style={{ 
                maxHeight: '200px',
                overflow: 'auto',
                backgroundColor: '#f5f5f5'
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{data.stdout}</pre>
            </Card>
          </Flexbox>
        )}

        {data.stderr && (
          <Flexbox>
            <Title level={4}>标准错误</Title>
            <Card 
              size="small" 
              style={{ 
                backgroundColor: '#fff2f0',
                maxHeight: '200px',
                overflow: 'auto'
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#cf1322' }}>{data.stderr}</pre>
            </Card>
          </Flexbox>
        )}

        {data.exception && (
          <Flexbox>
            <Title level={4}>异常信息</Title>
            <Alert 
              message="执行出错" 
              description={<pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{data.exception}</pre>} 
              type="error" 
              showIcon
            />
          </Flexbox>
        )}
      </Flexbox>
    </Card>
  );
});

export default Render;



