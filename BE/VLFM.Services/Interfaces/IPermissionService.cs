using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Models;

namespace VLFM.Services.Interfaces
{
    public interface IPermissionService
    {
        Task<bool> CreatePermission(PermissionDetails permissionDetails);
        Task<IEnumerable<PermissionDetails>> GetAllPermission();
        Task<PermissionDetails> GetPermissionById(int permissionId);
        Task<bool> UpdatePermission(PermissionDetails permissionDetails);
        Task<bool> DeletePermission(List<PermissionDetails> pers);
    }
}
