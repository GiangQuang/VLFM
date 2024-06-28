using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Models;
using VLFM.Core.Response;

namespace VLFM.Services.Interfaces
{
    public interface IAccessService
    {
        Task<bool> CreateAccess(AccessDetails accessDetails);
        Task<IEnumerable<AccessResponse>> GetAllAccess();
        Task<AccessResponse> GetAccessById(int accessId);
        Task<bool> UpdateAccess(AccessDetails accessDetails);
        Task<bool> DeleteAccess(List<AccessResponse> accs);
    }
}
