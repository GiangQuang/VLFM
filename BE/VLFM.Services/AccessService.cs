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
    public class AccessService : IAccessService
    {
        public IUnitOfWork _unitOfWork;
        public AccessService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreateAccess(AccessDetails accessDetails)
        {
            if (accessDetails != null)
            {
                await _unitOfWork.Accesses.Add(accessDetails);
                var result = _unitOfWork.Save();
                if (result > 0)
                    return true;
                else
                    return false;
            }
            return false;
        }

        public async Task<bool> DeleteAccess(List<AccessResponse> accs)
        {
            if (accs != null && accs.Any())
            {
                foreach (var item in accs)
                {

                    var accessDetails = await _unitOfWork.Accesses.GetById(item.AccessId);
                    if (accessDetails != null)
                    {
                        _unitOfWork.Accesses.Delete(accessDetails);
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

        public async Task<AccessResponse> GetAccessById(int accessId)
        {
            if (accessId > 0)
            {
                var access = await _unitOfWork.Accesses.GetById(accessId);
                var roles = await _unitOfWork.Roles.GetAll();
                var permissions = await _unitOfWork.Permissions.GetAll();

                if (access != null)
                {
                    try
                    {
                        var role = roles.FirstOrDefault(ro => ro.RoleId == access.RoleId);
                        var permission = permissions.FirstOrDefault(per => per.PermissionId == access.PermissionId);
                        var response = new AccessResponse
                        {
                            AccessId = access.AccessId,
                            AccessURL = access.AccessURL,
                            RoleId = access.RoleId,
                            PermissionId = access.PermissionId,
                            Permissionsymbol = access.Permissionsymbol,
                            PermissionURL = access.PermissionURL,
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

        public async Task<IEnumerable<AccessResponse>> GetAllAccess()
        {
            try
            {
                var access = await _unitOfWork.Accesses.GetAll();
                var role = await _unitOfWork.Roles.GetAll();
                var permission = await _unitOfWork.Permissions.GetAll();

                var query = from acc in access
                            join ro in role on acc.RoleId equals ro.RoleId
                            join per in permission on acc.PermissionId equals per.PermissionId
                            select new AccessResponse
                            {
                                AccessId = acc.AccessId,
                                AccessURL = acc.AccessURL,
                                RoleId = acc.RoleId,
                                PermissionId = acc.PermissionId,
                                Permissionsymbol = acc.Permissionsymbol,
                                PermissionURL = acc.PermissionURL,
                            };
                return query.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> UpdateAccess(AccessDetails accessDetails)
        {
            if (accessDetails != null)
            {
                var access = await _unitOfWork.Accesses.GetById(accessDetails.AccessId);
                if (access != null)
                {
                    access.AccessId = accessDetails.AccessId;
                    access.AccessURL = accessDetails.AccessURL;
                    access.RoleId = accessDetails.RoleId;
                    access.PermissionId = accessDetails.PermissionId;
                    access.Permissionsymbol = accessDetails.Permissionsymbol;
                    access.PermissionURL = accessDetails.PermissionURL;
                    _unitOfWork.Accesses.Update(access);
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
