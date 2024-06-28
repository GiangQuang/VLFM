using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Models;
using VLFM.Core.Response;

namespace VLFM.Services.Interfaces
{
    public interface IRoleService
    {
        Task<bool> CreateRole(RoleDetails roleDetails);
        Task<IEnumerable<RoleDetails>> GetAllRole();
        Task<RoleDetails> GetRoleById(int roleId);
        Task<bool> UpdateRole(RoleDetails roleDetails);
        Task<bool> DeleteRole(List<RoleDetails> roles);
    }
}
