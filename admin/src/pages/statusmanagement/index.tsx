import { DeleteOutlined, EditOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import Cookies from 'js-cookie';
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
  const permission_url = Cookies.get('permission_url');
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
      hidden: !permission_url?.includes('/status/update_update'),
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
          <div key={1}>
            {permission_url?.includes('/status/add_add') && (
              <Button
                type="primary"
                menu={menuProps}
                onClick={() => {
                  // handleCheckDupModalVisible(true)
                  history.push('/category/status/add');
                }}
              >
                <PlusOutlined /> Thêm mới
              </Button>
            )}
          </div>,

          <div key={2}>
            {permission_url?.includes('/status/delete_delete') && (
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
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
    </PageContainer>
  );
};

export default TableList;
