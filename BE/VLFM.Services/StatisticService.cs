using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Interfaces;
using VLFM.Core.Response;
using VLFM.Services.Interfaces;

namespace VLFM.Services
{
    public class StatisticService : IStatisticService
    {
        public IUnitOfWork _unitOfWork;
        public StatisticService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<int> GetAllDamagedAndConut()
        {
            var devices = await _unitOfWork.PropertyImports.GetAll();
            return devices.Count(d => d.StatusID == 1);
        }

        public async Task<int> GetAllDeniedAndConut()
        {
            var devices = await _unitOfWork.DeviceAssignments.GetAll();
            return devices.Count(d => d.ProposeStatus == 2);
        }

        public async Task<int> GetAllDeviceAndConut()
        {
            var devices = await _unitOfWork.PropertyImports.GetAll();
            return devices.Count();
        }

        public async Task<int> GetAllDeviceAssignedAndConut()
        {
            var devices = await _unitOfWork.DeviceAssignments.GetAll();
            return devices.Count(d => d.ProposeStatus == 1);
        }

        public async Task<int> GetAllDeviceReturnAndConut()
        {
            var devices = await _unitOfWork.DeviceReturns.GetAll();
            return devices.Count();
        }

        public async Task<int> GetAllExpiryDateAndConut()
        {
            var devices = await _unitOfWork.PropertyImports.GetAll();
            return devices.Count(d => d.StatusID == 4);
        }

        public async Task<int> GetAllLostAndConut()
        {
            var devices = await _unitOfWork.PropertyImports.GetAll();
            return devices.Count(d => d.StatusID == 3);
        }

        public async Task<IEnumerable<StatisticResponse>> GetAllStatistics()
        {
            var AllDevice = await GetAllDeviceAndConut();
            var Unused = await GetAllUnusedAndConut();
            var Using = await GetAllUsingAndConut();
            var Damaged = await GetAllDamagedAndConut();
            var ExpiryDate = await GetAllExpiryDateAndConut();
            var Lost = await GetAllLostAndConut();
            var Asssign = await GetAllWaitingAssignAndConut();
            var Assigned = await GetAllDeviceAssignedAndConut();
            var Denied = await GetAllDeniedAndConut();
            var Returns = await GetAllDeviceReturnAndConut();
            var statistic = new List<StatisticResponse>
            {
                new StatisticResponse { Title = "Phiếu chờ duyệt cấp thiết bị", Total = Asssign.ToString(), Url = "/device/assignment" },
                new StatisticResponse { Title = "Thiết bị đã được cấp", Total = Assigned.ToString(), Url = "/device/deviceusing" },
                new StatisticResponse { Title = "Từ chối cấp thiết bị", Total = Denied.ToString(), Url = "/device/devicedenied" },
                new StatisticResponse { Title = "Thiết bị đã được trả", Total = Denied.ToString(), Url = "/device/return" },
                new StatisticResponse { Title = "Toàn bộ thiết bị đang quản lý ", Total = AllDevice.ToString(), Url = "/storage/propertyimport" },
                new StatisticResponse { Title = "Thiết bị chưa được sử dụng", Total = Unused.ToString(), Url = "/storage/propertyimport" },
                new StatisticResponse { Title = "Thiết bị đang được sử dụng", Total = Using.ToString(), Url = "/storage/propertyimport" },
                new StatisticResponse { Title = "Thiết bị hư hỏng", Total = Damaged.ToString(), Url = "/storage/propertyimport" },
                new StatisticResponse { Title = "Thiết bị đã hết hạn sử dụng", Total = ExpiryDate.ToString(), Url = "/storage/propertyimport" },
                new StatisticResponse { Title = "Thiết bị đã mất", Total = Lost.ToString(), Url = "/storage/propertyimport" },
            };
            return statistic;
        }

        public async Task<int> GetAllUnusedAndConut()
        {
            var devices = await _unitOfWork.PropertyImports.GetAll();
            return devices.Count(d => d.StatusID == 2);
        }

        public async Task<int> GetAllUsingAndConut()
        {
            var devices = await _unitOfWork.PropertyImports.GetAll();
            return devices.Count(d => d.StatusID == 0);
        }

        public async Task<int> GetAllWaitingAssignAndConut()
        {
            var devices = await _unitOfWork.DeviceAssignments.GetAll();
            return devices.Count(d => d.ProposeStatus == 0);
        }
    }
}
