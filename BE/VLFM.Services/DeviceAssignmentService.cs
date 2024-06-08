using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Interfaces;
using VLFM.Core.Models;
using VLFM.Core.Response;
using VLFM.Services.Interfaces;

namespace VLFM.Services
{
    public class DeviceAssignmentService : IDeviceAssignmentService
    {
        public IUnitOfWork _unitOfWork;
        public DeviceAssignmentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreateDeviceAssignment(DeviceAssignmentDetails deviceAssignmentDetails)
        {
            if (deviceAssignmentDetails != null)
            {
                await _unitOfWork.DeviceAssignments.Add(deviceAssignmentDetails);
                var result = _unitOfWork.Save();
                if (result > 0)
                    return true;
                else
                    return false;
            }
            return false;
        }

        public async Task<bool> DeleteDeviceAssignment(List<DeviceAssignmentResponse> assign)
        {
            if (assign != null && assign.Any())
            {
                foreach (var item in assign)
                {

                    var deviceAssignmentDetails = await _unitOfWork.DeviceAssignments.GetById(item.Id);
                    if (deviceAssignmentDetails != null)
                    {
                        _unitOfWork.DeviceAssignments.Delete(deviceAssignmentDetails);
                    }
                }
                var result = _unitOfWork.Save();
                if (result > 0)
                    return true;
                else
                    return false;
            }
            return false;
        }

        public async Task<IEnumerable<DeviceAssignmentResponse>> GetAllDeviceAssignment()
        {
            try
            {
                var deviceAssignment = await _unitOfWork.DeviceAssignments.GetAll();
                var employee = await _unitOfWork.Employees.GetAll();
                var propertyImport = await _unitOfWork.PropertyImports.GetAll();
                var department = await _unitOfWork.Departments.GetAll();
                var status = await _unitOfWork.Statuses.GetAll();
                

                var query = from dev in deviceAssignment
                            join emp in employee on dev.EmployeeAssignID equals emp.EmployeeID
                            join emps in employee on dev.EmployeeReceiveID equals emps.EmployeeID
                            join propim in propertyImport on dev.PropImportID equals propim.PropImportID
                            join dep in department on dev.DeptID equals dep.DeptID
                            join sta in status on dev.StatusID equals sta.StatusID
                            select new DeviceAssignmentResponse
                            {
                                Id = dev.Id,
                                DeviceAssignmentID = dev.DeviceAssignmentID,
                                AssignAt = dev.AssignAt,
                                EmployeeAssignID = dev.EmployeeAssignID,
                                PropImportID = dev.PropImportID,
                                EmployeeReceiveID = dev.EmployeeReceiveID,
                                DeptID = dev.DeptID,
                                StatusID = dev.StatusID,
                                AssignEnd = dev.AssignEnd,
                                ProposeAt = dev.ProposeAt,
                                ProposeContent = dev.ProposeContent,
                                ProposeStatus = dev.ProposeStatus,
                                Note = dev.Note,
                            };
                return query.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<DeviceAssignmentResponse> GetDeviceAssignmentById(int Id)
        {
            if (Id > 0)
            {
                var deviceAssignments = await _unitOfWork.DeviceAssignments.GetById(Id);
                var employees = await _unitOfWork.Employees.GetAll();
                var propertyImports = await _unitOfWork.PropertyImports.GetAll();
                var departments = await _unitOfWork.Departments.GetAll();
                var statuses = await _unitOfWork.Statuses.GetAll();

                if (deviceAssignments != null)
                {
                    try
                    {
                        var employeeassign = employees.FirstOrDefault(emp => emp.EmployeeID == deviceAssignments.EmployeeAssignID);
                        var employeereceive = employees.FirstOrDefault(emp => emp.EmployeeID == deviceAssignments.EmployeeReceiveID);
                        var propertyimport = propertyImports.FirstOrDefault(propim => propim.PropImportID == deviceAssignments.PropImportID);
                        var department = departments.FirstOrDefault(dep => dep.DeptID == deviceAssignments.DeptID);
                        var status = statuses.FirstOrDefault(sta => sta.StatusID == deviceAssignments.StatusID);
                        var response = new DeviceAssignmentResponse
                        {
                            Id = deviceAssignments.Id,
                            DeviceAssignmentID = deviceAssignments.DeviceAssignmentID,
                            AssignAt = deviceAssignments.AssignAt,
                            EmployeeAssignID = deviceAssignments.EmployeeAssignID,
                            PropImportID = deviceAssignments.PropImportID,
                            EmployeeReceiveID = deviceAssignments.EmployeeReceiveID,
                            DeptID = deviceAssignments.DeptID,
                            StatusID = deviceAssignments.StatusID,
                            AssignEnd = deviceAssignments.AssignEnd,
                            ProposeAt = deviceAssignments.ProposeAt,
                            ProposeContent = deviceAssignments.ProposeContent,
                            ProposeStatus = deviceAssignments.ProposeStatus,
                            Note = deviceAssignments.Note,
                        };

                        return response;
                    }
                    catch (Exception ex)
                    {
                        return null;
                    }
                }
            }
            return null;
        }

        public async Task<bool> UpdateDeviceAssignment(DeviceAssignmentDetails deviceAssignmentDetails)
        {
            if (deviceAssignmentDetails != null)
            {
                var deviceAssignment = await _unitOfWork.DeviceAssignments.GetById(deviceAssignmentDetails.Id);
                if (deviceAssignment != null)
                {
                    deviceAssignment.AssignAt = deviceAssignmentDetails.AssignAt;
                    deviceAssignment.EmployeeAssignID = deviceAssignmentDetails.EmployeeAssignID;
                    deviceAssignment.PropImportID = deviceAssignmentDetails.PropImportID;
                    deviceAssignment.EmployeeReceiveID = deviceAssignmentDetails.EmployeeReceiveID;
                    deviceAssignment.StatusID = deviceAssignmentDetails.StatusID;
                    deviceAssignment.DeptID = deviceAssignmentDetails.DeptID;
                    deviceAssignment.AssignEnd = deviceAssignmentDetails.AssignEnd;
                    deviceAssignment.ProposeAt = deviceAssignmentDetails.ProposeAt;
                    deviceAssignment.ProposeContent = deviceAssignmentDetails.ProposeContent;
                    deviceAssignment.ProposeStatus = deviceAssignmentDetails.ProposeStatus;
                    deviceAssignment.Note = deviceAssignmentDetails.Note;
                    _unitOfWork.DeviceAssignments.Update(deviceAssignment);
                    var result = _unitOfWork.Save();

                    if (result > 0)
                        return true;
                    else
                        return false;
                }
            }
            return false;
        }
    }
}
