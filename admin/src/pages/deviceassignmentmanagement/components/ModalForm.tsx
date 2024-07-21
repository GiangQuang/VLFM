import { BetaSchemaForm, } from '@ant-design/pro-components';
import { Form, Modal, message } from 'antd';
import { TableListItem, } from '../data';
import { getAllemployee, getAllpropertyimport, getAllstatus, updateOne } from '../service';
import { getAllproperty } from '@/pages/detailedreceiptmanagement/service';
import { useModel } from '@umijs/max';

const ModalForm = (props) => {
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  form.setFieldsValue(props.record)
  const handleSubmit = async (values) => {
    const hide = message.loading("Đang xử lí");
    try {
      const res = await updateOne({ ...values});
      console.log("🚀 ~ handleSubmit ~ res:", res)
      if (res) {
        message.success("Duyệt thành công")
        props?.actionRef.current.reload()

        // props.onFinish();
        props.onCancel()
      } else {
        message.error("Duyệt không thành công")
      }
    } catch (ex) {
      message.error("Duyệt không thành công")
    } finally {
      hide();
    }
    return false;
  }

  return (
    <div>
      <Modal
        destroyOnClose = {true}
        title="Duyệt cấp thiết bị"
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
                md: 8,
              },
            },
            {
              title: 'Ngày cấp',
              dataIndex: 'assignAt',
              valueType: 'date',
              colProps: {
                xs: 24,
                md: 8,
              },
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng chọn ngày cấp!',
                  },
                ],
              },
            },
            {
              fieldProps: {disabled: true,},
              title: 'Nhân viên cấp',
              dataIndex: ['employeeAssignID'],
              valueType: 'select',
              request: async () => {
                const res = await getAllemployee();
                return res.data.map((item) => {
                  form.setFieldValue(['employeeAssignID'] ,currentUser?.employeeID);
                  return {label:`${item?.employeename}`, value: item?.employeeID}
                });
              },
              colProps: {
                xs: 24,
                md: 8,
              },
            },
            {
              title: 'Tài sản',
              dataIndex: ['propImportID'],
              valueType: 'select',
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng chọn tài sản!',
                  },
                ],
              },
              request: async () => {
                const res = await getAllpropertyimport();
          
                const PropertyData = await getAllproperty();
          
                const data = res.data.map((item) => {
                  const property = PropertyData.data.find((property) => property.propertyID === item.propertyID);
                  return {label: `(${property?.propertyname}) ${item?.propImportID} `, value: item?.propImportID};
                });
          
                return data; 
              },
            },
            {
              title: 'Trạng thái lúc cấp',
              dataIndex: ['statusID'],
              valueType: 'select',
              colProps: {
                xs: 24,
                md: 10,
              },
              request: async () => {
                const res = await getAllstatus();
                return res.data.map((item) => {
                  return {label:`${item?.statusname}`, value: item?.statusID}
                });
              },
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng chọn trạng thái lúc cấp!',
                  },
                ],
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
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng chọn Ngày hết hạn cấp!',
                  },
                ],
              },
            },
            {
              title: 'Trạng thái đề xuất',
              dataIndex: 'proposeStatus',
              request: async () => {
                return [
                    { label: 'Đang chờ duyệt', value: 0 },
                    { label: 'Đồng ý', value: 1 },
                    { label: 'Từ chối', value: 2 },
                ];
              },
              colProps: {
                xs: 24,
                md: 10,
              },
            },
            {
              title: 'Lý do từ chối',
              dataIndex: 'note',
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

export default ModalForm;


