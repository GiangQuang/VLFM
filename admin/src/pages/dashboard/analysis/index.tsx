import { GridContent } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import type { FC } from 'react';
import { Suspense } from 'react';
import IntroduceRow from './components/IntroduceRow';
import PageLoading from './components/PageLoading';
import type { AnalysisData } from './data.d';
import { ChartData } from './service';
// type RangePickerValue = RangePickerProps<dayjs.Dayjs>['value'];
type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};
// type SalesType = 'all' | 'online' | 'stores';
const Analysis: FC<AnalysisProps> = () => {
  // const { styles } = useStyles();
  // const [salesType, setSalesType] = useState<SalesType>('all');
  // const [currentTabKey, setCurrentTabKey] = useState<string>('');
  // const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
  //   getTimeDistance('year'),
  // );
  const { loading, data } = useRequest(ChartData);
  console.log("🚀 ~ data:", data)
  // const selectDate = (type: TimeType) => {
  //   setRangePickerValue(getTimeDistance(type));
  // };
  // const handleRangePickerChange = (value: RangePickerValue) => {
  //   setRangePickerValue(value);
  // };
  // const isActive = (type: TimeType) => {
  //   if (!rangePickerValue) {
  //     return '';
  //   }
  //   const value = getTimeDistance(type);
  //   if (!value) {
  //     return '';
  //   }
  //   if (!rangePickerValue[0] || !rangePickerValue[1]) {
  //     return '';
  //   }
  //   if (
  //     rangePickerValue[0].isSame(value[0] as dayjs.Dayjs, 'day') &&
  //     rangePickerValue[1].isSame(value[1] as dayjs.Dayjs, 'day')
  //   ) {
  //     return styles.currentDate;
  //   }
  //   return '';
  // };

  // let salesPieData;

  // if (salesType === 'all') {
  //   salesPieData = data?.salesTypeData;
  // } else {
  //   salesPieData = salesType === 'online' ? data?.salesTypeDataOnline : data?.salesTypeDataOffline;
  // }

  // const dropdownGroup = (
  //   <span className={styles.iconGroup}>
  //     <Dropdown
  //       menu={{
  //         items: [
  //           {
  //             key: '1',
  //             label: '操作一',
  //           },
  //           {
  //             key: '2',
  //             label: '操作二',
  //           },
  //         ],
  //       }}
  //       placement="bottomRight"
  //     >
  //       <EllipsisOutlined />
  //     </Dropdown>
  //   </span>
  // );
  // const handleChangeSalesType = (e: RadioChangeEvent) => {
  //   setSalesType(e.target.value);
  // };
  // const handleTabChange = (key: string) => {
  //   setCurrentTabKey(key);
  // };
  // const activeKey = currentTabKey || (data?.offlineData[0] && data?.offlineData[0].name) || '';
  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={data?.visitData || []} />
        </Suspense>

        {/* <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={data?.salesData || []}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </Suspense>

        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={data?.visitData2 || []}
                searchData={data?.searchData || []}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row>

        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            offlineChartData={data?.offlineChartData || []}
            handleTabChange={handleTabChange}
          />
        </Suspense> */}
      </>
    </GridContent>
  );
};
export default Analysis;
