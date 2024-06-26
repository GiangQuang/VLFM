﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.DTO;
using VLFM.Core.Models;
using VLFM.Core.Response;

namespace VLFM.Services.Interfaces
{
    public interface IDeviceAssignmentService
    {
        Task<bool> CreateDeviceAssignment(DeviceAssignmentDetails deviceAssignmentDetails);
        Task<IEnumerable<DeviceAssignmentResponse>> GetAllDeviceAssignment();
        Task<DeviceAssignmentResponse> GetDeviceAssignmentById(int Id);
        Task<bool> UpdateDeviceAssignment(DeviceAssignmentUpdateDTO updateDTO);
        Task<bool> UpdateAssignEnd(AssignEndUpdateDTO assignEndDTO);
        Task<bool> DeleteDeviceAssignment(List<DeviceAssignmentResponse> assign);
    }
}
