import { BetaSchemaForm, } from '@ant-design/pro-components';
import { Form, Modal, message } from 'antd';
import { TableListItem, } from '../data';
import { getAllemployee, getAllpropertyimport, updateAssignEnd,  } from '../service';
import { getAllproperty } from '@/pages/detailedreceiptmanagement/service';

const ModalUpdateAssignDateForm = (props) => {
  const [form] = Form.useForm();

  form.setFieldsValue(props.record)
  const handleSubmit = async (values) => {
    const hide = message.loading("Đang xử lí");
    try {
      const res = await updateAssignEnd({ ...values});
      console.log("🚀 ~ handleSubmit ~ values:", values)
      if (res) {
        message.success("Gia hạn thành công")
        props?.actionRef.current.reload()
        props.onCancel()
      } else {
        message.error("Gia hạn không thành công")
      }
    } catch (ex) {
      message.error("Gia hạn không thành công")
    } finally {
      hide();
    }
    return false;
  }

  return (
    <div>
      <Modal
        destroyOnClose = {true}
        title="Gia hạn ngày cấp thiết bị"
        open={props.open}
        onCancel={() => props.onCancel()}
        onOk={async () => {
          form.submit();
        }}
      >
        <BetaSchemaForm<TableListItem, 'text'> 
          preserve={false}
          columns={[
            {
              fieldProps: {
                disabled: true, 
              },
              title: 'Mã số',
              dataIndex: 'id',
              valueType: 'text',
              colProps: {
                xs: 24,
                md: 6,
              },
            },
            {
              fieldProps: {
                disabled: true, 
              },
              title: 'Ngày cấp',
              dataIndex: 'assignAt',
              valueType: 'date',
              colProps: {
                xs: 24,
                md: 8,
              },
            },
            {
              fieldProps: {
                disabled: true, 
              },
              title: 'Tên thiết bị',
              dataIndex: ['propImportID'],
              valueType: 'select',
              colProps: {
                xs: 24,
                md: 15,
              },
              request: async () => {
                const res = await getAllpropertyimport();
          
                const PropertyData = await getAllproperty();
          
                const data = res.data.map((item) => {
                  const property = PropertyData.data.find((property) => property.propertyID === item.propertyID);
                  return {label: `(${property?.propertyname})`, value: item?.propImportID};
                });
          
                return data; 
              },
            },
            {
              fieldProps: {
                disabled: true, 
              },
              title: 'Nhân viên được cấp',
              dataIndex: ['employeeReceiveID'],
              valueType: 'select',
              colProps: {
                xs: 24,
                md: 12,
              },
              request: async () => {
                const res = await getAllemployee();
                return res.data.map((item) => {
                  return {label:`${item?.employeename}`, value: item?.employeeID}
                });
              },
            },
            {
              title: 'Ngày hết hạn cấp',
              dataIndex: 'assignEnd',
              valueType: 'date',
              colProps: {
                xs: 24,
                md: 8,
              },
            },
            {
              title: 'Nội dung gia hạn',
              dataIndex: 'proposeContent',
              valueType: 'textarea',
              colProps: {
                xs: 24,
                md: 24,
              },
            },
          ]}
          grid
          form={form}
          submitter={false}
          onFinish={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default ModalUpdateAssignDateForm;
