import {
  BetaSchemaForm,
} from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import type { TableListItem } from '../data';
import { Form, Skeleton } from 'antd';
import { getById } from '../service';
import { fields } from '../constants/fields';


export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;


export type AddEditFormProps = {
  type: string;
  params: {};
  onFinish: (((formData: TableListItem) => Promise<boolean | void>) & ((formData: TableListItem) => Promise<any>)) | undefined;
  selectedId: any;
  onSubmit: (values: FormValueType) => Promise<void>;
  client_type: 'personal' | 'company';
};

const AddEditForm: React.FC<AddEditFormProps> = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const loadData = async (id) => {
    const res = await getById(id);
    console.log("🚀 ~ loadData ~ res:", res)
    form.setFieldsValue(res?.data)
    setLoading(false)
  }

  useEffect(() => {
    if (props.selectedId) {
      loadData(props.selectedId);
    }
  }, [props.selectedId])

  // const {loading, data} = useRequest(() => {
  //   return getById(props.selectedId)
  // })

  // console.log('data', loading, data)

  return loading? <Skeleton/>: (
    <BetaSchemaForm<TableListItem, "text"> // Field Campaign name
    initialValues={{
      nationality: 'VN',
      type: props.type,
      ...props.params
    }}
    title={props.selectedId ? `Cập nhật` : 'Thêm mới'}
    columns={fields(form)
    } // JSON Schema tên là columns. Giúp định dạng các thuộc tính của Form
    grid
    onFinish={props.onFinish}
    form={form}
  />

  );
};

export default AddEditForm;
