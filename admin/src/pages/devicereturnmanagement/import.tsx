import {
  PageContainer,
  ProCard,
  ProTable
} from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Alert, Button, Col, Descriptions, Popover, Progress, Radio, Row, Space, message } from 'antd';
import { importData, importOne, uploadFile } from './service';
import { Upload } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import numeral from 'numeral';
import { ADDRESS_TYPE_COMPANY_OPTIONS, ADDRESS_TYPE_OPTIONS, CARD_TYPE_OPTIONS, CLIENT_TYPE_OPTIONS, MATERIAL_STATUS_OPTIONS, COMPANY_RELATIONSHIP_OPTIONS, SOCIAL_ACCOUNT_OPTIONS, PERSONAL_RELATIONSHIP_OPTIONS } from '@/helpers/constants';
import { TableListItem, TableListPagination } from './data';
import e from 'express';
import dayjs from 'dayjs';

const isDuplicate = (a, b) => {
  return a['Số điện thoại'] == b['Số điện thoại'];
}

const checkLocalDuplicate = (data) => {
  return data;
  // return data?.map((e, index) => {
  //   const findIndex = data?.findIndex(item => item._id != e._id && isDuplicate(item, e))
  //   if (findIndex >= 0) {
  //     return {
  //       ...e,
  //       status: 'LOCAL_DUP',
  //       error: `Trùng dòng ${findIndex + 1}`
  //     }
  //   }
  //   return {
  //     ...e,
  //     status: 'OK'
  //   };
  // });
}

const expandedRowRender = () => {
  const data = [];
  for (let i = 0; i < 1; i += 1) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }
  return (
    // <ProTable
    //   columns={[
    //     { title: 'Date', dataIndex: 'date', key: 'date' },
    //     { title: 'Name', dataIndex: 'name', key: 'name' },

    //     { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    //     {
    //       title: 'Action',
    //       dataIndex: 'operation',
    //       key: 'operation',
    //       valueType: 'option',
    //       render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
    //     },
    //   ]}
    //   headerTitle={false}
    //   search={false}
    //   options={false}
    //   dataSource={data}
    //   pagination={false}
    // />
    <></>
  );

}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ImportPage: React.FC = () => {
  const [one, setOne] = useState();
  const [data, setData] = useState([]);
  const [cntProcessed, setCntProcessed] = useState(0);
  // const [expandableRowKeys, setExpandableRowKeys] = useState([]);
  const dataWithStatus = checkLocalDuplicate(data);
  const cntDup = dataWithStatus?.filter(e => e.status == 'LOCAL_DUP')?.length
  const listImport = dataWithStatus?.filter(e => !e.imported)
  const progress = Math.round(cntProcessed / listImport.length * 100);

  // const expandableRowKeys = dataWithStatus?.filter(e => e.status == 'SERVER_DUP')?.map(e => e.key.toString())
  // console.log('expandableRowKeys', expandableRowKeys)
  const handleUpload = async (file) => {
    const hide = message.loading("Uploading...")
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await uploadFile(formData)
      if (res?.success) {
        setData(res?.data?.data)
        setOne(res?.data)
        message.success('Upload thành công')
      } else {
        setData(null)
        message.error(res?.message)
      }

    } catch (ex) {
      message.error('Đã có lỗi khi upload file')
    } finally {
      hide();
    }
  }

  const resetAll = () => {
    // setData([])
    // setOne(null)
  }

  const removeFromList = (index) => {
    const newData = data?.filter((e, idx) => idx != index)
    setData(newData)
    message.success('Đã xóa dòng dữ liệu')
  }

  const submitOne = async (item, index, ignoreCheckDup, saveAction) => {

    const res = await importOne({
      data: item,
      type: one?.type,
      ADDRESS_TYPE_OPTIONS,
      ADDRESS_TYPE_COMPANY_OPTIONS,
      COMPANY_RELATIONSHIP_OPTIONS,
      PERSONAL_RELATIONSHIP_OPTIONS,
      SOCIAL_ACCOUNT_OPTIONS,
      CARD_TYPE_OPTIONS,
      MATERIAL_STATUS_OPTIONS,
      ignoreCheckDup,
      saveAction,
    });
    setData(prev => {
      prev[index] = res?.data;
      return [...prev];
    })
    setCntProcessed(prev => prev + 1)
    // setExpandableRowKeys(prev => [...prev, item.key])
  }

  const handleSubmitImport = async () => {
    if (cntDup > 0) {
      message.error("Dữ liệu đang bị trùng. Vui lòng kiểm tra lại")
      return;
    }

    const hide = message.loading('Importing...')
    setCntProcessed(0)
    setData(prev => prev.map(e => {
      if (!e.imported) {
        e.status = 'PROCESSING'
      }
      return e;
    }));
    try {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (!item.imported) {
          setTimeout(() => {
            submitOne(item, i, false, '');
          }, i * 10);
        }

        // break;
      }

      // const res = await importData({
      //   data: data,
      //   type: one?.type,
      //   ADDRESS_TYPE_OPTIONS,
      //   ADDRESS_TYPE_COMPANY_OPTIONS,
      //   COMPANY_RELATIONSHIP_OPTIONS,
      //   PERSONAL_RELATIONSHIP_OPTIONS,
      //   SOCIAL_ACCOUNT_OPTIONS,
      //   CARD_TYPE_OPTIONS,
      //   MATERIAL_STATUS_OPTIONS
      // });
      // if (res?.success) {
      //   message.success('Import dữ liệu thành công')
      //   // resetAll();
      //   console.log('res?.data', res?.data)
      //   setData([...res?.data])
      // } else {
      //   message.error(res?.message)
      // }
    } catch (ex) {
      message.error(ex)
    } finally {
      hide()
    }

  }

  return (
    <PageContainer>
      <ProCard>
        <div style={{ marginBottom: 10 }}>
          <a href={`/templates/leads_personal_template.xlsx`}>Tải file mẫu lead cá nhân</a> | <a href={`/templates/leads_company_template.xlsx`}>Tải file mẫu lead tổ chức</a>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Upload
              name="file"
              beforeUpload={(file) => {
                handleUpload(file);
              }}
              multiple={false}
              maxCount={1}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Col>
          <Col span={24}>
            <Descriptions column={2} bordered={true} size={"small"}>
              <Descriptions.Item label="Tên file">{one?.fileName}</Descriptions.Item>
              <Descriptions.Item label="Kích thước">{numeral(one?.size).format('0,0')} KB</Descriptions.Item>
              <Descriptions.Item label="Tên sheet">{one?.sheetName}</Descriptions.Item>
              <Descriptions.Item label="Số lượng lead">{data?.length}</Descriptions.Item>
              <Descriptions.Item label="Loại lead">{CLIENT_TYPE_OPTIONS[one?.type]}</Descriptions.Item>
              <Descriptions.Item label="SL trùng">{cntDup}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={24}>
            {cntDup > 0 ? (
              <Alert message={`Phát hiện ${cntDup} dòng bị trùng thông tin, vui lòng upload lại file hoặc xóa bớt`} showIcon type="error" />
            ) : (
              <Alert message={`Vui lòng kiểm tra đầy đủ dữ liệu trước khi thực hiện`} showIcon type="info" />
            )}
          </Col>
          <Col span={24}>
            <Button type="primary"
              disabled={!(data?.length > 0)}
              onClick={() => handleSubmitImport()}
            >Thực hiện import</Button>
          </Col>
          <Col>
            <Progress type="line" percent={progress} status="active" steps={30} showInfo={true} />
          </Col>
          <Col span={24}>
            <ProTable<TableListItem, TableListPagination>
              className="nowrap"
              headerTitle="Danh sách dữ liệu đã import"
              pagination={false}
              rowKey="_id"
              search={false}
              toolBarRender={false}
              size={'small'}
              columns={
                [
                  {
                    title: "",
                    render: (dom, entity, index) => {
                      return (
                        <Popover content={<>
                          <div>Họ tên: </div>
                          <div>Số điện thoại: </div>
                          <div>Email: </div>
                          <div>Số định danh: </div>
                          <div>Ngày tạo: </div>
                          <div>Người tạo: </div>
                        </>} title="Dữ liệu trùng" trigger="hover">
                          <Button type="link" danger onClick={() => removeFromList(index)}>
                            <DeleteOutlined />
                          </Button>
                        </Popover>
                      )
                    }
                  },
                  {
                    title: 'STT',
                    dataIndex: 'index',
                    valueType: 'index',
                  },
                  {
                    dataIndex: 'status',
                    valueEnum: {
                      READY: {
                        text: 'Ready',
                        status: 'default',
                      },
                      LOCAL_DUP: {
                        text: 'Trùng trong file',
                        status: 'error',
                      },
                      SERVER_DUP: {
                        text: 'Trùng trên hệ thống',
                        status: 'warning',
                      },
                      PROCESSING: {
                        text: 'Đang xử lý...',
                        status: 'processing',
                      },
                      SUCCESS: {
                        text: 'Import thành công',
                        status: 'success',
                      },
                      IGNORE: {
                        text: 'Bỏ qua',
                        status: 'success',
                      },
                      DOUBLE: {
                        text: 'Nhân đôi',
                        status: 'success',
                      },
                      OVERWRITE: {
                        text: 'Ghi đè',
                        status: 'success',
                      },
                      MERGE: {
                        text: 'Ghộp',
                        status: 'success',
                      },
                    },
                    render: (dom, entity, index) => {
                      const { status, dup_record } = entity;
                      const dupInfo = status == 'SERVER_DUP' ? <>
                        <div>Họ tên: {dup_record?.name}</div>
                        <div>Số điện thoại: {dup_record?.phone}</div>
                        <div>Email: {dup_record?.email}</div>
                        <div>Số định danh: {dup_record?.legal_id}</div>
                        <div>Ngày tạo: {dayjs(dup_record?.createdAt).format('DD/MM/YYYY HH:mm:ss')}</div>
                        <div>Người tạo: {dup_record?.created_by?.name}</div>
                      </> : null;
                      return (
                        <>
                          {dom}
                          {entity.status == 'SERVER_DUP' && (
                            <div>
                              <Space>
                                <Radio.Group>
                                  <Popover content={dupInfo} title="Thông tin trùng">
                                    <Radio.Button onClick={() => submitOne(entity, index, true, 'IGNORE')} value="IGNORE">Bỏ qua</Radio.Button>
                                  </Popover>
                                  <Popover content={dupInfo} title="Thông tin trùng">
                                    <Radio.Button onClick={() => submitOne(entity, index, true, 'DOUBLE')} value="DOUBLE">Nhân đôi</Radio.Button>
                                  </Popover>
                                  <Popover content={dupInfo} title="Thông tin trùng">
                                    <Radio.Button onClick={() => submitOne(entity, index, true, 'OVERWRITE')} value="OVERWRITE">Ghi đè</Radio.Button>
                                  </Popover>
                                  <Popover content={dupInfo} title="Thông tin trùng">
                                    <Radio.Button onClick={() => submitOne(entity, index, true, 'MERGE')} value="MERGE">Ghộp</Radio.Button>
                                  </Popover>
                                </Radio.Group>
                              </Space>

                            </div>
                          )}

                        </>
                      )
                    }
                  },
                  ...(one?.columns || [])
                ]
              }
              dataSource={dataWithStatus}
              tableAlertRender={false}
            />
          </Col>
          <Col>
            <Progress type="line" percent={progress} status="active" steps={30} showInfo={true} />
          </Col>
          <Col span={24}>
            <Button type="primary"
              disabled={!(data?.length > 0)}
              onClick={() => handleSubmitImport()}
            >Thực hiện import</Button>
          </Col>
        </Row>
      </ProCard>

    </PageContainer>
  );
};

export default ImportPage;
