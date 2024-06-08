import { request } from "@umijs/max";
import { getAlldepartment, getAllemployee, getAllpropertyimport, getAllstatus } from "../service";

export const fields = (id, form) => [
  {

    valueType: 'group',
    columns: [
      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'deviceAssignmentID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Ngày cấp',
        dataIndex: 'assignAt',
        valueType: 'date',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
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
        title: 'Mã tài sản nhập',
        dataIndex: ['propImportID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 8,
        },
        request: async () => {
          const res = await getAllpropertyimport();
          return res.data.map((item) => {
            return {label:`${item?.propImportID}`, value: item?.propImportID}
          });
        },
      },
      {
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
        title: 'Trạng thái lúc cấp',
        dataIndex: ['statusID'],
        type: 'select',
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
        title: 'Ngày hết hạn cấp',
        dataIndex: 'AssignEnd',
        valueType: 'date',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Ngày tạo đề xuất',
        dataIndex: 'proposeAt',
        valueType: 'date',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Nội dung đề xuất',
        dataIndex: 'proposeContent',
        type: 'select',
        request: async () => {
          return [
            { label: 'Đang chờ duyệt', value: 0 },
            { label: 'Đồng ý', value: 1 },
            { label: 'Từ chối', value: 2 },
          ];
        },
        colProps: {
          xs: 24,
          md: 6,
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
