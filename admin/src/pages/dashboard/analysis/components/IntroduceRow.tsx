import {InfoCircleOutlined, ProductFilled } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import type { DataItem } from '../data.d';
import { ChartData } from '../service';
import useStyles from '../style.style';
import { ChartCard } from './Charts';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};
const { statistics } = await ChartData();
const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: DataItem[] }) => {
  const { styles } = useStyles();

  return (
    <Row gutter={24}>
      {statistics?.map((item, index) => (
        <Col key={index + 1} {...topColResponsiveProps}>
          
          <Link to={item?.url}>
            <ChartCard
              bordered={false}
              title={item?.title}
              loading={loading}
              total={() => (
                <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                  {item?.total} <ProductFilled></ProductFilled>
                </div>
              )}
              contentHeight={46}
            ></ChartCard>
          </Link>
        </Col>
      ))}
    </Row>
    // <Row gutter={24}>
    //   <Col {...topColResponsiveProps}>
    //     <ChartCard
    //       bordered={false}
    //       title="bac"
    //       action={
    //         <Tooltip title="123">
    //           <InfoCircleOutlined />
    //         </Tooltip>
    //       }
    //       loading={loading}
    //       total={() => <Yuan>126560</Yuan>}
    //       footer={<Field label="ABC" value={`￥${numeral(12423).format('0,0')}`} />}
    //       contentHeight={46}
    //     >
    //     </ChartCard>
    //   </Col>
    //   <Col {...topColResponsiveProps}>
    //     <ChartCard
    //       bordered={false}
    //       title="bac"
    //       action={
    //         <Tooltip title="123">
    //           <InfoCircleOutlined />
    //         </Tooltip>
    //       }
    //       loading={loading}
    //       total={() => <Yuan>126560</Yuan>}
    //       footer={<Field label="ABC" value={`￥${numeral(12423).format('0,0')}`} />}
    //       contentHeight={46}
    //     >
    //       <Trend
    //         flag="up"
    //         style={{
    //           marginRight: 16,
    //         }}
    //       >
    //         abc
    //         <span className={styles.trendText}>12%</span>
    //       </Trend>
    //       <Trend flag="down">
    //         日同比
    //         <span className={styles.trendText}>11%</span>
    //       </Trend>
    //     </ChartCard>
    //   </Col>

    //   <Col {...topColResponsiveProps}>
    //     <ChartCard
    //       bordered={false}
    //       loading={loading}
    //       title="访问量"
    //       action={
    //         <Tooltip title="指标说明">
    //           <InfoCircleOutlined />
    //         </Tooltip>
    //       }
    //       total={numeral(8846).format('0,0')}
    //       footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
    //       contentHeight={46}
    //     >
    //       <Area
    //         xField="x"
    //         yField="y"
    //         shapeField="smooth"
    //         height={46}
    //         axis={false}
    //         style={{
    //           fill: 'linear-gradient(-90deg, white 0%, #975FE4 100%)',
    //           fillOpacity: 0.6,
    //           width: '100%',
    //         }}
    //         padding={-20}
    //         data={visitData}
    //       />
    //     </ChartCard>
    //   </Col>
    //   <Col {...topColResponsiveProps}>
    //     <ChartCard
    //       bordered={false}
    //       loading={loading}
    //       title="支付笔数"
    //       action={
    //         <Tooltip title="指标说明">
    //           <InfoCircleOutlined />
    //         </Tooltip>
    //       }
    //       total={numeral(6560).format('0,0')}
    //       footer={<Field label="转化率" value="60%" />}
    //       contentHeight={46}
    //     >
    //       <Column
    //         xField="x"
    //         yField="y"
    //         padding={-20}
    //         axis={false}
    //         height={46}
    //         data={visitData}
    //         scale={{ x: { paddingInner: 0.4 } }}
    //       />
    //     </ChartCard>
    //   </Col>
    // </Row>
  );
};
export default IntroduceRow;
