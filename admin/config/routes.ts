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

export default [
  {
    path: '/user',
    layout: false,
    
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      // {
      //   name: 'register-result',
      //   icon: 'smile',
      //   path: '/user/register-result',
      //   component: './user/register-result',
      // },
      // {
      //   name: 'register',
      //   icon: 'smile',
      //   path: '/user/register',
      //   component: './user/register',
      // },
      {
        component: '404',
        path: '/user/*',
      },
    ],
  },
  // {
  //   path: '/dashboard',
  //   name: 'dashboard1',
  //   icon: 'dashboard',
  //   routes: [
  //     {
  //       path: '/dashboard',
  //       redirect: '/dashboard/analysis',
  //     },
  //     {
  //       name: 'analysis',
  //       icon: 'smile',
  //       path: '/dashboard/analysis1',
  //       component: './dashboard/analysis',
  //     },
  //     {
  //       name: 'employee',
  //       icon: 'smile',
  //       path: '/dashboard/employee',
  //       component: './dashboard/monitor',
  //     },
  //     {
  //       name: 'workplace',
  //       icon: 'smile',
  //       path: '/dashboard/workplace',
  //       component: './dashboard/workplace',
  //     },
  //   ],
  // },
  // {
  //   path: '/form',
  //   icon: 'form',
  //   name: 'form',
  //   routes: [
  //     {
  //       path: '/form',
  //       redirect: '/form/basic-form',
  //     },
  //     {
  //       name: 'basic-form',
  //       icon: 'smile',
  //       path: '/form/basic-form',
  //       component: './form/basic-form',
  //     },
  //     {
  //       name: 'step-form',
  //       icon: 'smile',
  //       path: '/form/step-form',
  //       component: './form/step-form',
  //     },
  //     {
  //       name: 'advanced-form',
  //       icon: 'smile',
  //       path: '/form/advanced-form',
  //       component: './form/advanced-form',
  //     },
  //   ],
  // },
  {
    path: '/category',
    icon: 'table',
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

      //Quản lý nhân viên
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
      {
        name: 'Quản lý trạng thái',
        path: '/category/status',
        component: './statusmanagement/',
      },
      {
        name: 'Thêm tài sản',
        path: '/category/status/add',
        hideInMenu: true,
        component: './statusmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật tài sản',
        path: '/category/status/update/:id',
        hideInMenu: true,
        component: './statusmanagement/addEdit.tsx',
      },

      //Quản lý đề xuất
      {
        name: 'Quản lý đề xuất',
        path: '/category/propose',
        component: './proposesmanagement',
      },
      {
        name: 'Thêm đề xuất',
        path: '/category/propose/add',
        hideInMenu: true,
        component: './proposesmanagement/addEdit.tsx',
      },
      {
        name: 'Cập nhật đề xuất',
        path: '/category/propose/update/:id',
        hideInMenu: true,
        component: './proposesmanagement/addEdit.tsx',
      },
    ],
  },
  {
    path: '/storage',
    name: 'Quản lý nhập kho',
    icon: 'profile',
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
    ],
  },
  // {
  //   name: 'exception',
  //   icon: 'warning',
  //   path: '/exception',
  //   routes: [
  //     {
  //       path: '/exception',
  //       redirect: '/exception/403',
  //     },
  //     {
  //       name: '403',
  //       icon: 'smile',
  //       path: '/exception/403',
  //       component: './exception/403',
  //     },
  //     {
  //       name: '404',
  //       icon: 'smile',
  //       path: '/exception/404',
  //       component: './exception/404',
  //     },
  //     {
  //       name: '500',
  //       icon: 'smile',
  //       path: '/exception/500',
  //       component: './exception/500',
  //     },
  //   ],
  // },
  // // {
  // //   name: 'account',
  // //   icon: 'user',
  // //   path: '/account',
  // //   routes: [
  // //     {
  // //       path: '/account',
  // //       redirect: '/account/center',
  // //     },
  // //     {
  // //       name: 'center',
  // //       icon: 'smile',
  // //       path: '/account/center',
  // //       component: './account/center',
  // //     },
  // //     {
  // //       name: 'settings',
  // //       icon: 'smile',
  // //       path: '/account/settings',
  // //       component: './account/settings',
  // //     },
  // //   ],
  // // },
  // {
  //   path: '/',
  //   redirect: '/dashboard/analysis',
  // },
  // {
  //   component: '404',
  //   path: '/*',
  // },
];
