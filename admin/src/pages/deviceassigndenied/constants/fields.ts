import { getAlldepartment, getAllemployee, getAllpropertyimport, getAllstatus } from "../service";
import Cookies from "js-cookie";
import { getAllproperty } from "@/pages/detailedreceiptmanagement/service";
const permission_url = Cookies.get('permission_url');
const rolename = Cookies.get('rolename');
const employeeID = Cookies.get('employeeID');
console.log("🚀 ~ employeeID:", employeeID)
export const fields = (id, form,employeeID) => [
  {

    valueType: 'group',
    columns: [
      {
        hideInForm: true,
        title: 'Mã phiếu cấp',
        dataIndex: 'deviceAssignmentID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        hideInForm: !permission_url?.includes('/assignment/view_view'),
        title: 'Ngày cấp',
        dataIndex: 'assignAt',
        valueType: 'date',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        hideInForm: !permission_url?.includes('/assignment/view_view'),
        title: 'Nhân viên cấp',
        dataIndex: ['employeeAssignID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllemployee();
          return res.data.map((item) => {
            return {label:`${item?.employeeID} - ${item?.employeename}`, value: item?.employeeID}
          });
        },
      },
      {
        hideInForm: !permission_url?.includes('/assignment/view_view'),
        title: 'Tên thiết bị',
        dataIndex: ['propImportID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 10,
        },
        request: async () => {
          const res = await getAllpropertyimport();
    
          const PropertyData = await getAllproperty();
    
          const data = res.data.map((item) => {
            const property = PropertyData.data.find((property) => property.propertyID === item.propertyID);
            return {label: `${item?.propImportID} (${property?.propertyname})`, value: item?.propImportID};
          });
    
          return data;
        },
      },
      {
        fieldProps: {
          disabled: rolename?.includes('Admin' || 'Nhân viên quản trị'),
        },
        title: 'Nhân viên được cấp',
        dataIndex: ['employeeReceiveID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllemployee();
          return res.data.map((item) => {
            return {label:`${item?.employeeID} - ${item?.employeename}`, value: item?.employeeID}
          });
        },
      },
        
      {
        title: 'Tên bộ phận',
        dataIndex: ['deptID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAlldepartment();
          return res.data.map((item) => {
            return {label:`${item?.deptID} - ${item?.deptname}`, value: item?.deptID}
          });
        },
      },
      {
        hideInForm: !permission_url?.includes('/assignment/view_view'),
        title: 'Trạng thái lúc cấp',
        dataIndex: ['statusID'],
        valueType: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllstatus();
          return res.data.map((item) => {
            return {label:`${item?.statusID} - ${item?.statusname}`, value: item?.statusID}
          });
        },
      },
      {
        hideInForm: !permission_url?.includes('/assignment/view_view'),
        title: 'Ngày hết hạn cấp',
        dataIndex: 'AssignEnd',
        valueType: 'date',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        hideInForm: permission_url?.includes('/assignment/view_view'),
        title: 'Ngày tạo đề xuất',
        dataIndex: 'proposeAt',
        valueType: 'date',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        hideInForm: permission_url?.includes('/assignment/view_view'),
        title: 'Trạng thái đề xuất',
        dataIndex: 'proposeStatus',
        type: 'select',
        request: async () => {
          return [
            { label: 'Đang chờ duyệt', value: 0 },
            { label: 'Đồng ý', value: 1 },
            { label: 'Từ chối', value: 2 },
          ];
        },
        initialValue: 0,
        colProps: {
          xs: 24,
          md: 7,
        },
      },
      {
        hideInForm: permission_url?.includes('/assignment/view_view'),
        title: 'Nội dung đề xuất',
        dataIndex: 'proposeContent',
        valueType: 'textarea',
        colProps: {
          xs: 24,
          md: 10,
        },
      },
      {
        title: 'Ghi chú',
        dataIndex: 'note',
        colProps: {
          xs: 24,
          md: 8,
        },
      },
    ],
  },
];
