import {
  PageContainer,
  ProCard
} from '@ant-design/pro-components';
import React, {  } from 'react';
import { message } from 'antd';
import { addOne, updateOne } from './service';
import AddEditForm from './components/AddEditForm';
import { useMatch } from '@umijs/max';
import { history } from 'umi';
import qs from 'qs';

const AddEditPage: React.FC = () => {
  const matchId = useMatch('/device/assignment/update/:id')
  const matchType = useMatch('/cases/add/:type')
  const id = matchId?.params?.id;
  let type = matchType?.params?.type || 'claim';
  if (type == 'new') {
    type = null
  }
  const params = qs.parse(history.location.search, { ignoreQueryPrefix: true })
  // console.log('defaultParams', defaultParams)
  const handleSubmit = async (values: { [x: string]: any; }) => {
    console.log('values', values)
    const hide = message.loading('Processing...');
    try {
      if (id) {
        await updateOne({ ...values, id: id });
      } else {
        await addOne({ ...values });
      }

      hide();
      message.success('Cập nhật thành công');
      history.push('/device/assignment')
      return true;
    } catch (error) {
      hide();
      message.error('Có lỗi, vui lòng thử lại');
      return false;
    }
  };

  return (
    <PageContainer>
      <ProCard>
        <AddEditForm
          selectedId={id}
          onFinish={handleSubmit}
          type={type}
          params={params}
        />
      </ProCard>
    </PageContainer>
  );
};

export default AddEditPage;
