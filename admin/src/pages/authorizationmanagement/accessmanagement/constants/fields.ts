import { getAllpermission, getAllrole, getPermissionById } from '../service';

export const fields = (form) => [
  {
    valueType: 'group',
    columns: [
      {
        title: 'Tên quyền',
        dataIndex: ['roleId'],
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn tên quyền!',
            },
          ],
        },
        valueType: 'select',
        request: async () => {
          const res = await getAllrole();
          return res.data.map((item) => {
            return { label: `${item?.rolename}`, value: item?.roleId };
          });
        },
      },
      {
        title: 'Tên chức năng',
        dataIndex: ['permissionId'],
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn tên chức năng!',
            },
          ],
        },
        valueType: 'select',
        request: async () => {
          const res = await getAllpermission();
          return res.data.map((item) => {
            return { label: `${item?.permissionname}`, value: item?.permissionId };
          });
        },
      },
      {
        title: 'Đường dẫn',
        dataIndex: 'accessURL',
        colProps: {
          xs: 24,
          md: 9,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đường dẫn!',
            },
          ],
        },
      },
      {
        valueType: 'dependency',
        name: ['permissionId'],
        columns: ({ permissionId }) => {

          return [
            {
              title: 'Ký hiệu',
              dataIndex: 'permissionsymbol',
              colProps: {
                xs: 24,
                md: 9,
              },
              params: { permissionId },
              request: async () => {
                const {data} = await getPermissionById(permissionId);
                form.setFieldValue(['permissionsymbol'], data?.permissionsymbol);
              return [{label:`${data?.permissionsymbol}`, value: `${data?.permissionsymbol}`}];
              },
            },
          ];
        },
      },
      {
        title: 'Mã đường dẫn',
        hideInForm: true,
        dataIndex: 'permissionURL',
        colProps: {
          xs: 24,
          md: 9,
        },
      },
    ],
  },
];
