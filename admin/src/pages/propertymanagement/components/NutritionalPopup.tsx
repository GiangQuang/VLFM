import { BetaSchemaForm, ProTable } from '@ant-design/pro-components';
import { Form, message, Modal, Space } from 'antd';
import React from 'react';
import type { TableListItem, TableListPagination } from '../data';
import {  assignManyNutritional } from '../service';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type AssignPopupProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onFinish: (values: FormValueType) => Promise<void>;
  open: boolean;
  data: [];
};

const NutritionalPopup: React.FC<AssignPopupProps> = (props) => {
  const [form] = Form.useForm();
  if(props?.data?.length == 1) {
    form.setFieldsValue(props?.data?.[0])
  }

  const handleSubmit = async (values) => {
    const hide = message.loading('Please wait...');
    try {
      const res = await assignManyNutritional({ data: props.data, nutritional: values });
      if (res.success) {
        message.success('Cập nhật giá trị dinh dưỡng thành công');
        // history.push(`/manage/menu`)
        props.onCancel();
        props.actionRef.current.reloadAndRest();
      } else {
        message.error(res.message);
      }
    } catch (ex) {
      message.error(ex);
    } finally {
      hide();
    }
    return false;
  };

  return (
    <Modal
      destroyOnClose={true}
      title="Phân công nhân viên hỗ trợ"
      open={props.open}
      onCancel={() => props.onCancel()}
       okButtonProps={{
          // disabled: props?.data?.[0]?.nutritional ? true: false,
        }}
      onOk={() => {
        form.submit();
      }}
    >
      <Space direction="vertical">
        {/* <Alert type="info" showIcon message={'Bạn có thể chọn nhóm hoặc nhân viên để phân công'} /> */}
        <BetaSchemaForm<TableListItem, 'text'> // Field Campaign name
          preserve={false}
          columns={[
            {
              valueType: 'group',
              columns: [
                {
                  title: 'Calories (kcal)',
                  dataIndex: ['nutritional', 'calories'],
                  valueType:'digit',

                },
                {
                  title: 'Dietary Fiber (g)',
                  dataIndex: ['nutritional', 'dietary_fiber'],
                  valueType:'digit'

                },

                {
                  title: 'Carbs (g)',
                  dataIndex: ['nutritional', 'carbs'],
                  valueType:'digit'
                },

                {
                  title: 'Protein (g)',
                  dataIndex: ['nutritional', 'protein'],
                  valueType:'digit'
                },
                {
                  title: 'Fat (g)',
                  dataIndex: ['nutritional', 'fat'],
                  valueType:'digit'
                },
                {
                  title: 'Cholesterol (mg)',
                  dataIndex: ['nutritional', 'cholesterol'],
                  valueType:'digit'
                },
              ],
            },
          ]}
          // JSON Schema tên là columns. Giúp định dạng các thuộc tính của Form
          grid
          form={form}
          submitter={false}
          onFinish={handleSubmit}
        />

        <ProTable<TableListItem, TableListPagination>
          headerTitle="Phân công lead"
          pagination={false}
          rowKey="_id"
          search={false}
          toolBarRender={false}
          size={'small'}
          columns={[
            {
              title: 'STT',
              dataIndex: 'index',
              // valueType: 'indexBorder',
              valueType: 'index',
            },
            {
              title: 'Mã món',
              dataIndex: 'id',
            },
            {
              title: 'Tên món',
              dataIndex: 'name',
            },
            {
              title: 'Giá',
              dataIndex: 'ots_price',
              valueType: 'money',
            },
            {
              title: 'Nhóm món',
              dataIndex: ['type_id'],
              render: (_, record) => (
                <Space>
                  <span>{record?.type_id?.[0]?.name}</span>
                </Space>
              ),
            },
          ]}
          // rowSelection={{
          //   selections: false,
          //   type: 'radio',
          //   onChange: (_, selectedRows) => {
          //     console.log('selectedRows, ', selectedRows)
          //     setSelectedId(selectedRows[0]?._id)
          //   },
          // }}
          dataSource={props.data}
          tableAlertRender={false}
        />
      </Space>
    </Modal>
  );
};

export default NutritionalPopup;
