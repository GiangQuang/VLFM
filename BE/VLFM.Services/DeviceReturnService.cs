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
    public class DeviceReturnService : IDeviceReturnService
    {
        public IUnitOfWork _unitOfWork;
        public DeviceReturnService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreateDeviceReturn(DeviceReturnDetails deviceReturnDetails)
        {
            if (deviceReturnDetails != null)
            {
                await _unitOfWork.DeviceReturns.Add(deviceReturnDetails);
                var deviceAssignments = await _unitOfWork.DeviceAssignments.GetAll();
                var assignID = deviceAssignments
                              .Where(p => p.DeviceAssignmentID == deviceReturnDetails.DeviceAssignmentID)
                              .Select(p => p.PropImportID)
                              .FirstOrDefault();

                if (assignID != null)
                {
                    var propertyImports = await _unitOfWork.PropertyImports.GetAll();
                    var updateStatus = propertyImports
                              .FirstOrDefault(p => p.PropImportID == assignID);

                    if (updateStatus != null)
                    {
                        switch (deviceReturnDetails.StatusID)
                        {
                            case 0:
                                updateStatus.StatusID = 2;
                                break;
                            case 1:
                                updateStatus.StatusID = 1;
                                break;
                            case 2:
                                updateStatus.StatusID = 3;
                                break;
                            case 3:
                                updateStatus.StatusID = 4;
                                break;
                            default:
                                break;
                        }
                        _unitOfWork.PropertyImports.Update(updateStatus);
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

        public async Task<bool> DeleteDeviceReturn(List<DeviceReturnResponse> returns)
        {
            if (returns != null && returns.Any())
            {
                foreach (var item in returns)
                {

                    var deviceReturnDetails = await _unitOfWork.DeviceReturns.GetById(item.Id);
                    if (deviceReturnDetails != null)
                    {
                        _unitOfWork.DeviceReturns.Delete(deviceReturnDetails);
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

        public async Task<IEnumerable<DeviceReturnResponse>> GetAllDeviceReturn()
        {
            try
            {
                var deviceReturn = await _unitOfWork.DeviceReturns.GetAll();
                var deviceAssignment = await _unitOfWork.DeviceAssignments.GetAll();
                var employee = await _unitOfWork.Employees.GetAll();

                var query = from devr in deviceReturn
                            join emp in employee on devr.EmployeeReturnID equals emp.EmployeeID
                            join dev in deviceAssignment on devr.DeviceAssignmentID equals dev.DeviceAssignmentID
                            select new DeviceReturnResponse
                            {
                                Id = devr.Id,
                                DeviceReturnID = devr.DeviceReturnID,
                                ReturnAt = devr.ReturnAt,
                                EmployeeReturnID = devr.EmployeeReturnID,
                                DeviceAssignmentID = devr.DeviceAssignmentID,
                                StatusID = devr.StatusID,
                                Note = devr.Note,
                            };
                return query.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<DeviceReturnResponse> GetDeviceReturnById(int Id)
        {
            if (Id > 0)
            {
                var deviceReturn = await _unitOfWork.DeviceReturns.GetById(Id);
                var deviceAssignments = await _unitOfWork.DeviceAssignments.GetAll();
                var employees = await _unitOfWork.Employees.GetAll();

                if (deviceReturn != null)
                {
                    try
                    {
                        var employeereturn = employees.FirstOrDefault(emp => emp.EmployeeID == deviceReturn.EmployeeReturnID);
                        var deviceAssign = deviceAssignments.FirstOrDefault(dev => dev.DeviceAssignmentID == deviceReturn.DeviceAssignmentID);
                        var response = new DeviceReturnResponse
                        {
                            Id = deviceReturn.Id,
                            DeviceReturnID = deviceReturn.DeviceReturnID,
                            ReturnAt = deviceReturn.ReturnAt,
                            EmployeeReturnID = deviceReturn.EmployeeReturnID,
                            DeviceAssignmentID = deviceReturn.DeviceAssignmentID,
                            StatusID = deviceReturn.StatusID,
                            Note = deviceReturn.Note,
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

        public async Task<bool> UpdateDeviceReturn(DeviceReturnDetails deviceReturnDetails)
        {
            if (deviceReturnDetails != null)
            {
                var deviceReturn = await _unitOfWork.DeviceReturns.GetById(deviceReturnDetails.Id);
                if (deviceReturn != null)
                {
                    deviceReturn.ReturnAt = deviceReturnDetails.ReturnAt;
                    deviceReturn.EmployeeReturnID = deviceReturnDetails.EmployeeReturnID;
                    deviceReturn.DeviceAssignmentID = deviceReturnDetails.DeviceAssignmentID;
                    deviceReturn.StatusID = deviceReturnDetails.StatusID;
                    deviceReturn.Note = deviceReturnDetails.Note;
                    _unitOfWork.DeviceReturns.Update(deviceReturn);
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
