/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */

const routes = [
  {
    path: '/',
    layout: false,

    routes: [
      {
        path: '/',
        layout: false,
        name: 'login',
        component: './user/login',
      },
      {
        path: '/',
        redirect: '/',
      },
      {
        component: '404',
        path: '/user/*',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './dashboard/analysis',
  },
  {
    path: '/category',
    name: 'Quản lý danh mục',
    routes: [
      //Quản lý nhân viên
      {
        path: '/category/employee/',
        name: 'Quản lý nhân viên',
        component: './employeemanagement/',
      },
      {
        name: 'Thêm nhân viên',
        path: '/category/employee/add',
        hideInMenu: true,
        component: './employeemanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật nhân viên',
        path: '/category/employee/update/:id',
        hideInMenu: true,
        component: './employeemanagement/addEdit.tsx',
      },

      //Quản lý tài khoản
      {
        name: 'Quản lý tài khoản',
        path: '/category/user',
        component: './usermanagement/',
      },
      {
        name: 'Thêm tài khoản',
        path: '/category/user/add',
        hideInMenu: true,
        component: './usermanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật tài khoản',
        path: '/category/user/update/:id',
        hideInMenu: true,
        component: './usermanagement/addEdit.tsx',
      },

      //Quản lý cơ sở
      {
        name: 'Quản lý cơ sở',
        path: '/category/branch',
        component: './branchmanagement/',
      },
      {
        name: 'Thêm cơ sở',
        path: '/category/branch/add',
        hideInMenu: true,
        component: './branchmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật cơ sở',
        path: '/category/branch/update/:id',
        hideInMenu: true,
        component: './branchmanagement/addEdit.tsx',
      },
      //Quản lý bộ phận
      {
        name: 'Quản lý bộ phận',
        path: '/category/department',
        component: './departmentmanagement/',
      },
      {
        name: 'Thêm bộ phận',
        path: '/category/department/add',
        hideInMenu: true,
        component: './departmentmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật bộ phận',
        path: '/category/department/update/:id',
        hideInMenu: true,
        component: './departmentmanagement/addEdit.tsx',
      },

      //Quản lý loại tài sản
      {
        name: 'Quản lý loại tài sản',
        path: '/category/propertytype',
        component: './propertytypemanagement/',
      },
      {
        name: 'Thêm loại tài sản',
        path: '/category/propertytype/add',
        hideInMenu: true,
        component: './propertytypemanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật loại tài sản',
        path: '/category/propertytype/update/:id',
        hideInMenu: true,
        component: './propertytypemanagement/addEdit.tsx',
      },

      //Quản lý tài sản
      {
        name: 'Quản lý tài sản',
        path: '/category/property',
        component: './propertymanagement/',
      },
      {
        name: 'Thêm tài sản',
        path: '/category/property/add',
        hideInMenu: true,
        component: './propertymanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật tài sản',
        path: '/category/property/update/:id',
        hideInMenu: true,
        component: './propertymanagement/addEdit.tsx',
      },

      //Quản lý trạng thái
      // {
      //   name: 'Quản lý trạng thái',
      //   path: '/category/status',
      //   component: './statusmanagement/',
      // },
      // {
      //   name: 'Thêm tài sản',
      //   path: '/category/status/add',
      //   hideInMenu: true,
      //   component: './statusmanagement/addEdit.tsx',
      // },
      // {
      //   name: 'Cập nhật tài sản',
      //   path: '/category/status/update/:id',
      //   hideInMenu: true,
      //   component: './statusmanagement/addEdit.tsx',
      // },

      //Quản lý đề xuất
      // {
      //   name: 'Quản lý đề xuất',
      //   path: '/category/propose',
      //   component: './proposesmanagement',
      // },
      // {
      //   name: 'Thêm đề xuất',
      //   path: '/category/propose/add',
      //   hideInMenu: true,
      //   component: './proposesmanagement/addEdit.tsx',
      // },
      // {
      //   name: 'Cập nhật đề xuất',
      //   path: '/category/propose/update/:id',
      //   hideInMenu: true,
      //   component: './proposesmanagement/addEdit.tsx',
      // },
    ],
  },
  {
    path: '/storage',
    name: 'Quản lý nhập kho',
    // icon: 'table',
    routes: [
      //Quản lý nhà cung cấp
      {
        name: 'Quản lý nhà cung cấp',
        path: '/storage/provider',
        component: './providermanagement/',
      },
      {
        name: 'Thêm nhà cung cấp',
        path: '/storage/provider/add',
        hideInMenu: true,
        component: './providermanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật nhà cung cấp',
        path: '/storage/provider/update/:id',
        hideInMenu: true,
        component: './providermanagement/addEdit.tsx',
      },

      //Quản lý hoá đơn nhập
      {
        name: 'Quản lý hoá đơn nhập',
        path: '/storage/receipt',
        component: './receiptmanagement/',
      },
      {
        name: 'Thêm nhà hoá đơn',
        path: '/storage/receipt/add',
        hideInMenu: true,
        component: './receiptmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật hoá đơn',
        path: '/storage/receipt/update/:id',
        hideInMenu: true,
        component: './receiptmanagement/addEdit.tsx',
      },

      //Quản lý hoá đơn nhập chi tiết
      {
        name: 'Quản lý hoá đơn nhập chi tiết',
        path: '/storage/detailedreceipt',
        component: './detailedreceiptmanagement/',
      },
      {
        name: 'Thêm nhà hoá đơn chi tiết',
        path: '/storage/detailedreceipt/add',
        hideInMenu: true,
        component: './detailedreceiptmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật hoá đơn chi tiết',
        path: '/storage/detailedreceipt/update/:id',
        hideInMenu: true,
        component: './detailedreceiptmanagement/addEdit.tsx',
      },

      //Quản lý tài sản nhập
      {
        name: 'Quản lý tài sản nhập',
        path: '/storage/propertyimport',
        component: './propertyimportmanagement/',
      },
      {
        name: 'Thêm nhà tài sản nhập',
        path: '/storage/propertyimport/add',
        hideInMenu: true,
        component: './propertyimportmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật tài sản nhập',
        path: '/storage/propertyimport/update/:id',
        hideInMenu: true,
        component: './propertyimportmanagement/addEdit.tsx',
      },
    ],
  },
  {
    path: '/device',
    name: 'Quản lý cấp trả tài sản',
    // icon: 'DesktopOutlined',
    routes: [
      //Quản lý cấp phát thiết bị
      {
        name: 'Quản lý cấp phát thiết bị',
        path: '/device/assignment',
        component: './deviceassignmentmanagement/',
      },
      {
        name: 'Thêm phiếu cấp thiết bị',
        path: '/device/assignment/add',
        hideInMenu: true,
        component: './deviceassignmentmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật phiếu cấp thiết bị',
        path: '/device/assignment/update/:id',
        hideInMenu: true,
        component: './deviceassignmentmanagement/addEdit.tsx',
      },

      //Danh sách đã được cấp thiết bị
      {
        name: 'Danh sách đã được cấp thiết bị',
        path: '/device/deviceusing',
        component: './deviceassignaccepted/',
      },
      {
        name: 'Thêm phiếu cấp thiết bị',
        path: '/device/deviceusing/add',
        hideInMenu: true,
        component: './deviceassignaccepted/addEdit.tsx',
      },
      {
        name: 'Cập nhật phiếu cấp thiết bị',
        path: '/device/deviceusing/update/:id',
        hideInMenu: true,
        component: './deviceassignaccepted/addEdit.tsx',
      },

      //Danh sách bị từ chối
      {
        name: 'Danh sách phiếu bị từ chối cấp thiết bị',
        path: '/device/devicedenied',
        component: './deviceassigndenied/',
      },
      {
        name: 'Thêm phiếu cấp thiết bị',
        path: '/device/devicedenied/add',
        hideInMenu: true,
        component: './deviceassigndenied/addEdit.tsx',
      },
      {
        name: 'Cập nhật phiếu cấp thiết bị',
        path: '/device/devicedenied/update/:id',
        hideInMenu: true,
        component: './deviceassigndenied/addEdit.tsx',
      },

      //Quản lý trả thiết bị
      {
        name: 'Danh sách trả thiết bị',
        path: '/device/return',
        component: './devicereturnmanagement/',
      },
      {
        name: 'Thêm phiếu trả thiết bị',
        path: '/device/return/add',
        hideInMenu: true,
        component: './devicereturnmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật phiếu trả thiết bị',
        path: '/device/return/update/:id',
        hideInMenu: true,
        component: './devicereturnmanagement/addEdit.tsx',
      },
    ],
  },

  {
    path: '/authorization',
    name: 'Quản lý phân quyền',
    // icon: 'TeamOutlined',
    routes: [
      //Quản lý role
      {
        name: 'Quản lý quyền',
        path: '/authorization/role',
        component: './authorizationmanagement/rolemanagement/',
      },
      {
        name: 'Thêm quyền',
        path: '/authorization/role/add',
        hideInMenu: true,
        component: './authorizationmanagement/rolemanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật quyền',
        path: '/authorization/role/update/:id',
        hideInMenu: true,
        component: './authorizationmanagement/rolemanagement/addEdit.tsx',
      },

      //Quản lý truy cập
      {
        name: 'Quản lý truy cập',
        path: '/authorization/permission',
        component: './authorizationmanagement/permissionmanagement/',
      },
      {
        name: 'Thêm truy cập',
        path: '/authorization/permission/add',
        hideInMenu: true,
        component: './authorizationmanagement/permissionmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật truy cập',
        path: '/authorization/permission/update/:id',
        hideInMenu: true,
        component: './authorizationmanagement/permissionmanagement/addEdit.tsx',
      },

      //Quản lý đường dẫn
      {
        name: 'Quản lý đường dẫn',
        path: '/authorization/access',
        component: './authorizationmanagement/accessmanagement/',
      },
      {
        name: 'Thêm đường dẫn',
        path: '/authorization/access/add',
        hideInMenu: true,
        component: './authorizationmanagement/accessmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật đường dẫn',
        path: '/authorization/access/update/:id',
        hideInMenu: true,
        component: './authorizationmanagement/accessmanagement/addEdit.tsx',
      },
    ],
  },
];
export default routes;
