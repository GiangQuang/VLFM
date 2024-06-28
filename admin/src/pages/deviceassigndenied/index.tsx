import { DeleteOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import Cookies from 'js-cookie';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import ModalForm from './components/ModalForm';
import ModalUpdateAssignDateForm from './components/ModalUpdateAssignDateForm';
import { column } from './constants/column';
import type { TableListItem, TableListPagination } from './data';
import { getAll, removeMany } from './service';

const handleMenuClick: MenuProps['onClick'] = (e) => {
  if (e.key == 'import') {
    history.push('/leads/import ');
  }
};

const items: MenuProps['items'] = [
  {
    label: 'Import',
    key: 'import',
    icon: <ImportOutlined />,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const TableList: React.FC = () => {
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const [recordData, setRecordData] = useState<any>({});
  const [recordDataAssign, setRecordDataAssign] = useState<any>({});

  const [toggleOpenModal, setToggleOpenModal] = useState(false);
  const [toggleOpenModalAssign, setToggleOpenModalAssign] = useState(false);
  const handleOnCancelModal = () => {
    setToggleOpenModal(false);
  };
  const handleOnCancelModalAssign = () => {
    setToggleOpenModalAssign(false);
  };
  const permission_url = Cookies.get('permission_url');
  // const [selectedRowsToConvert, setSelectedRowsToConvert] = useState<TableListItem[]>([]);
  // const [openModal, handleOpenModal] = useState(false);
  // const [openModalAssign, handleOpenModalAssign] = useState(false);
  // const [openModalReject, handleOpenModalReject] = useState(false);
  const actionRef = useRef<ActionType>();
  /**
   * Remove
   *
   * @param selectedRows
   */

  const handleRemove = async (selectedRows: TableListItem[]) => {
    const hide = message.loading('Deleting');
    if (!selectedRows) return true;

    try {
      await removeMany(selectedRows);
      hide();
      message.success('Deleted successfully, will be refreshed soon');
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
      return true;
    } catch (error) {
      hide();
      message.error('Deletion failed, please try again');
      return false;
    }
  };

  let tableColumn = [
    ...column,

    // {
    //   hidden: permission_url?.includes('/assignment/update_update'),
    //   title: 'Action',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     <Button
    //       key={2}
    //       disabled={selectedRowsState?.length > 0}
    //       type="primary"
    //       onClick={() => {
    //         setRecordData(record);
    //         setToggleOpenModal(true);
    //       }}
    //     >
    //       Duyệt
    //     </Button>,
    //     <>
    //       {permission_url?.includes('/assignment/update_update') && (
    //         <Button
    //           key={1}
    //           disabled={selectedRowsState?.length > 0}
    //           type="primary"
    //           onClick={() => {
    //             setRecordDataAssign(record);
    //             setToggleOpenModalAssign(true);
    //           }}
    //         >
    //           Gia hạn
    //         </Button>
    //       )}
    //     </>,
    //   ],
    // },
    // {
    //   hidden: !permission_url?.includes('/assignment/update_update'),
    //   title: 'Action',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     <Button
    //       key={2}
    //       disabled={selectedRowsState?.length > 0}
    //       type="primary"
    //       onClick={() => {
    //         setRecordDataAssign(record);
    //         setToggleOpenModalAssign(true);
    //       }}
    //     >
    //       Gia hạn
    //     </Button>,
    //   ],
    // },
  ];
  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="Danh sách phiếu bị từ chối cấp thiết bị"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          // <div key={1}>
          //   {permission_url?.includes('/assignment/add_add') && (
          //     <Button
          //       type="primary"
          //       menu={menuProps}
          //       onClick={() => {
          //         // handleCheckDupModalVisible(true)
          //         history.push('/device/devicedenied/add');
          //       }}
          //     >
          //       <PlusOutlined /> Cấp thiết bị
          //     </Button>
          //   )}
          // </div>,

          <div key={2}>
            {permission_url?.includes('/assignment/delete_delete') && (
              <Popconfirm
                title="Delete"
                description="Bạn có chắc muốn xóa?"
                onConfirm={() => handleRemove(selectedRowsState)}
                okText="Có"
                cancelText="Không"
              >
                <Button disabled={selectedRowsState?.length == 0} type="primary" danger>
                  <DeleteOutlined /> Xóa
                </Button>
              </Popconfirm>
            )}
          </div>,
        ]}
        columns={tableColumn}
        request={getAll}
        params={{proposeStatus: 2}}
        scroll={{ x: 'max-content' }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        actionRef={actionRef}
      />
      <ModalForm
        actionRef={actionRef}
        open={toggleOpenModal}
        onCancel={handleOnCancelModal}
        data={selectedRowsState}
        record={recordData}
      />
      <ModalUpdateAssignDateForm
        actionRef={actionRef}
        open={toggleOpenModalAssign}
        onCancel={handleOnCancelModalAssign}
        data={selectedRowsState}
        record={recordDataAssign}
      />
    </PageContainer>
  );
};

export default TableList;
