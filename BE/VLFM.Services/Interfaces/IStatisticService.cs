using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Models;
using VLFM.Core.Response;

namespace VLFM.Services.Interfaces
{
    public interface IStatisticService
    {
        Task<int> GetAllDeviceAndConut();
        Task<int> GetAllUnusedAndConut();
        Task<int> GetAllUsingAndConut();
        Task<int> GetAllLostAndConut();
        Task<int> GetAllDamagedAndConut();
        Task<int> GetAllExpiryDateAndConut();
        Task<int> GetAllWaitingAssignAndConut();
        Task<int> GetAllDeviceAssignedAndConut();
        Task<int> GetAllDeniedAndConut();
        Task<int> GetAllDeviceReturnAndConut();
        Task<IEnumerable<StatisticResponse>> GetAllStatistics();
    }
}
