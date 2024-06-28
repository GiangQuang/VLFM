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
    public class RoleService : IRoleService
    {
        public IUnitOfWork _unitOfWork;
        public RoleService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreateRole(RoleDetails roleDetails)
        {
            if (roleDetails != null)
            {
                var existingRole = await _unitOfWork.Roles.GetRoleByRolename(roleDetails.Rolename);
                if (existingRole != null )
                {
                    return false;
                }
                await _unitOfWork.Roles.Add(roleDetails);
                var result = _unitOfWork.Save();

                return result > 0;
            }
            return false;
        }

        public async Task<bool> DeleteRole(List<RoleDetails> roles)
        {
            if (roles != null && roles.Any())
            {
                foreach (var item in roles)
                {
                    var roleDetails = await _unitOfWork.Roles.GetById(item.RoleId);
                    if (roleDetails != null)
                    {
                        _unitOfWork.Roles.Delete(roleDetails);
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

        public async Task<IEnumerable<RoleDetails>> GetAllRole()
        {
            return await _unitOfWork.Roles.GetAll();
        }

        public async Task<RoleDetails> GetRoleById(int roleId)
        {
            if (roleId > 0)
            {
                return await _unitOfWork.Roles.GetById(roleId);
            }
            return null;
        }

        public async Task<bool> UpdateRole(RoleDetails roleDetails)
        {
            if (roleDetails != null)
            {
                var role = await _unitOfWork.Roles.GetById(roleDetails.RoleId);
                if (role != null)
                {
                    var existingRole = await _unitOfWork.Roles.GetRoleByRolename(roleDetails.Rolename);
                    if (existingRole != null)
                    {
                        return false;
                    }
                    role.Rolename = roleDetails.Rolename;

                    _unitOfWork.Roles.Update(role);
                    var result = _unitOfWork.Save();

                    return result > 0;
                }
            }
            return false;
        }
    }
}
