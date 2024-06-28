using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Interfaces;
using VLFM.Core.Models;
using VLFM.Services.Interfaces;

namespace VLFM.Services
{
    public class PermissionService : IPermissionService
    {
        public IUnitOfWork _unitOfWork;
        public PermissionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreatePermission(PermissionDetails permissionDetails)
        {
            if (permissionDetails != null)
            {
                await _unitOfWork.Permissions.Add(permissionDetails);
                var result = _unitOfWork.Save();

                return result > 0;
            }
            return false;
        }

        public async Task<bool> DeletePermission(List<PermissionDetails> pers)
        {
            if (pers != null && pers.Any())
            {
                foreach (var item in pers)
                {
                    var permissionDetails = await _unitOfWork.Permissions.GetById(item.PermissionId);
                    if (permissionDetails != null)
                    {
                        _unitOfWork.Permissions.Delete(permissionDetails);
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

        public async Task<IEnumerable<PermissionDetails>> GetAllPermission()
        {
            return await _unitOfWork.Permissions.GetAll();
        }

        public async Task<PermissionDetails> GetPermissionById(int permissionId)
        {
            if (permissionId > 0)
            {
                return await _unitOfWork.Permissions.GetById(permissionId);
            }
            return null;
        }

        public async Task<bool> UpdatePermission(PermissionDetails permissionDetails)
        {
            if (permissionDetails != null)
            {
                var permission = await _unitOfWork.Permissions.GetById(permissionDetails.PermissionId);
                if (permission != null)
                {
                    permission.Permissionname = permissionDetails.Permissionname;
                    permission.Permissionsymbol = permissionDetails.Permissionsymbol;

                    _unitOfWork.Permissions.Update(permission);
                    var result = _unitOfWork.Save();

                    return result > 0;
                }
            }
            return false;
        }
    }
}
