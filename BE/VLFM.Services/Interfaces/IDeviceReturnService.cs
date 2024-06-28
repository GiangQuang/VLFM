using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Models;
using VLFM.Core.Response;

namespace VLFM.Services.Interfaces
{
    public interface IDeviceReturnService
    {
        Task<bool> CreateDeviceReturn(DeviceReturnDetails deviceReturnDetails);
        Task<IEnumerable<DeviceReturnResponse>> GetAllDeviceReturn();
        Task<DeviceReturnResponse> GetDeviceReturnById(int Id);
        Task<bool> UpdateDeviceReturn(DeviceReturnDetails deviceReturnDetails);
        Task<bool> DeleteDeviceReturn(List<DeviceReturnResponse> returns);
    }
}
