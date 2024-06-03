import { DeleteOutlined, EditOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
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
  // const [selectedRowsToConvert, setSelectedRowsToConvert] = useState<TableListItem[]>([]);
  // const [openModal, handleOpenModal] = useState(false);
  // const [openModalAssign, handleOpenModalAssign] = useState(false);
  // const [openModalReject, handleOpenModalReject] = useState(false);
  const actionRef = useRef<ActionType>();
  console.log('selectedRowsState', selectedRowsState);
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

    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key={2}
          disabled={selectedRowsState?.length > 0}
          type="primary"
          onClick={() => {
            history.push('/category/status/update/' + record.id);
          }}
        >
          <EditOutlined title="Chỉnh sửa" />
        </Button>,
        // <Button
        //   key={1}
        //   disabled={selectedRowsState?.length > 0}
        //   onClick={() => {
        //     handleOpenModalAssign(true);
        //     setSelectedRowsToConvert([record]);
        //   }}
        // >
        //   <UsergroupAddOutlined title="Xoá" />
        // </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="Danh sách trạng thái"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key={1}
            type="primary"
            menu={menuProps}
            onClick={() => {
              // handleCheckDupModalVisible(true)
              history.push('/category/status/add');
            }}
          >
            <PlusOutlined /> Thêm mới
          </Button>,
          <Popconfirm
            key={2}
            title="Delete"
            description="Bạn có chắc muốn xóa?"
            onConfirm={() => handleRemove(selectedRowsState)}
            okText="Có"
            cancelText="Không"
          >
            <Button disabled={selectedRowsState?.length == 0} type="primary" danger>
              <DeleteOutlined /> Xóa
            </Button>
          </Popconfirm>,
        ]}
        // search={{
        //   // labelWidth: 120,

        //   collapsed: false,
        // }}
        // toolBarRender={() => [
        // <Dropdown.Button
        //   type="primary"
        //   menu={menuProps}
        //   onClick={() => {
        //     // history.push('/leads/add/personal')
        //     handleOpenModal(true);
        //   }}
        // >
        //   <PlusOutlined /> Thêm mới
        // </Dropdown.Button>,
        // <Button
        //   // type={'link'}
        //   onClick={() => {
        //     console.log('selectedRowsState', selectedRowsState);
        //     if (selectedRowsState.some((e) => e.status == 'ASSIGNED')) {
        //       message.error('Vui lòng chỉ chọn các lead chưa được phân công');
        //     } else {
        //       handleOpenModalAssign(true);
        //       setSelectedRowsToConvert(selectedRowsState);
        //     }
        //   }}
        //   disabled={selectedRowsState?.length == 0}
        // >
        //   <UsergroupAddOutlined /> Phân công
        // </Button>,
        // <Button
        //   // type={'link'}
        //   onClick={() => {
        //     handleOpenModalReject(true);
        //     setSelectedRowsToConvert(selectedRowsState);
        //   }}
        //   disabled={selectedRowsState?.length == 0}
        // >
        //   <SyncOutlined /> Chuyển đổi lead
        // </Button>,
        // <Button
        //   // type={'link'}
        //   onClick={() => {
        //     handleOpenModalConvert(true);
        //     setSelectedRowsToConvert(selectedRowsState);
        //   }}
        //   disabled={selectedRowsState?.length == 0}
        // >
        //   <SyncOutlined /> Tiềm năng
        // </Button>,

        //]}
        columns={tableColumn}
        request={getAll}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {/* <SelectTypePoup
        open={openModal}
        onCancel={() => handleOpenModal(false)}
        onFinish={async (values) => {
          handleOpenModal(false);
        }}
      /> */}
      {/* <ConvertOpportunityPopup
        data={selectedRowsToConvert}
        open={openModalConvert}
        onCancel={() => handleOpenModalConvert(false)}
        onFinish={async (values) => {
          handleOpenModalConvert(false);
        }}
      /> */}
      {/* <ApproveRejectPopup
        data={selectedRowsToConvert}
        open={openModalReject}
        onCancel={() => {
          handleOpenModalReject(false);
        }}
        onFinish={async (status) => {
          handleOpenModalReject(false);
          actionRef.current.reloadAndRest();
          // if (status == 'OPPORTUNITY') {
          //   history.push('/opportunities')
          // } else {
          //   actionRef.current.reloadAndRest();
          // }
        }}
      />
      <AssignPopup
        data={selectedRowsToConvert}
        open={openModalAssign}
        onCancel={() => {
          handleOpenModalAssign(false);
        }}
        onFinish={async (values) => {
          handleOpenModalAssign(false);
          actionRef.current.reloadAndRest();
        }}
      /> */}
      {/* <NutritionalPopup
        data={selectedRowsToConvert}
        open={openModalAssign}
        onCancel={() => {
          handleOpenModalAssign(false);
        }}
        onFinish={async (values) => {
          handleOpenModalAssign(false);
        }}
        actionRef={actionRef}
      /> */}
    </PageContainer>
  );
};

export default TableList;
