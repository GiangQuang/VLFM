using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Interfaces;
using VLFM.Core.Models;
using VLFM.Core.Response;
using VLFM.Services.Interfaces;

namespace VLFM.Services
{
    public class UserService : IUserService
    {
        public IUnitOfWork _unitOfWork;
        private readonly IPasswordService _passwordService;
        private readonly IJwtService _jwtService;

        public UserService(IUnitOfWork unitOfWork, IPasswordService passwordService, IJwtService jwtService) 

        {
            _unitOfWork = unitOfWork;
            _passwordService = passwordService;
            _jwtService = jwtService;

        }

        public async Task<UserDetails> LoginUser(string Username, string Password)
        {
            var hashedPassword = _passwordService.EncryptPassword(Password);
            var user = await _unitOfWork.Users.GetUserByUsername(Username);
            if (user != null && user.Password == hashedPassword)
            {
                return user; 
            }
            return null;
        }

        public async Task<bool> CreateUser(UserDetails userDetails)
        {
            if (userDetails != null)
            {
                var existingUser = await _unitOfWork.Users.GetUserByUsername(userDetails.Username);
                if (existingUser != null)
                {
                    return false;
                }
                userDetails.Password = _passwordService.EncryptPassword(userDetails.Password);
                await _unitOfWork.Users.Add(userDetails);

                var result = _unitOfWork.Save();

                if (result > 0)
                    return true;
                else
                    return false;
            }
            return false;
        }
        public async Task<bool> DeleteUser(List<UserResponse> users)
        {
            if (users != null && users.Any())
            {
                foreach (var item in users)
                {

                    var userDetails = await _unitOfWork.Users.GetById(item.Id);
                    if (userDetails != null)
                    {
                        _unitOfWork.Users.Delete(userDetails);
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
        public async Task<IEnumerable<UserResponse>> GetAllUsers()
        {
            try
            {
                var users = await _unitOfWork.Users.GetAll();
                var employees = await _unitOfWork.Employees.GetAll();
                var roles = await _unitOfWork.Roles.GetAll();

                var query = from us in users
                            join emp in employees on us.EmployeeID equals emp.EmployeeID
                            join ro in roles on us.RoleId equals ro.RoleId
                            select new UserResponse
                            {
                                Id = us.Id,
                                EmployeeID = us.EmployeeID,
                                Username = us.Username,
                                Password = us.Password,
                                RoleId = us.RoleId,
                                Status = us.Status,
                            };
                return query.ToList();
            }
            catch (Exception ex)    
            {
                return null;
            }
        }   


        public async Task<UserResponse> GetUserById(int Id)
        {
            if (Id > 0)
            {
                var users = await _unitOfWork.Users.GetById(Id);
                var employees = await _unitOfWork.Employees.GetAll();
                var roles = await _unitOfWork.Roles.GetAll();

                if (users != null)
                {
                    try
                    {
                        var employee = employees.FirstOrDefault(emp => emp.EmployeeID == users.EmployeeID);
                        var role = roles.FirstOrDefault(ro => ro.RoleId == users.RoleId);
                        var response = new UserResponse
                        {
                            Id = users.Id,
                            EmployeeID = users.EmployeeID,  
                            Username = users.Username,
                            Password = users.Password,
                            RoleId = users.RoleId,
                            Status = users.Status,
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

        public async Task<bool> UpdateUser(UserDetails userDetails)
        {
            if (userDetails != null)
            {
                var hashedPassword = _passwordService.EncryptPassword(userDetails.Password);
                var user = await _unitOfWork.Users.GetById(userDetails.Id);
                if (user != null)
                {
                    user.EmployeeID = userDetails.EmployeeID;
                    user.Username = userDetails.Username;
                    user.Password = hashedPassword;
                    user.RoleId = userDetails.RoleId;
                    user.Status = userDetails.Status;

                    _unitOfWork.Users.Update(user);

                    var result = _unitOfWork.Save();

                    if (result > 0)
                        return true;
                    else
                        return false;
                }
            }
            return false;
        }

        public async Task<UserResponse> GetCurrentUser(string token)
        {
            var id = _jwtService.ValidateJwtToken(token);
            if (id == null)
            {
                return null;
            }

            var user = await _unitOfWork.Users.GetById(id.Value);
            if (user == null)
            {
                return null;
            }
            var employee = await _unitOfWork.Employees.GetAll();
            var roleEntity = await _unitOfWork.Roles.GetById(user.RoleId);
            if (roleEntity == null)
            {
                return null;
            }
            var accesses = await _unitOfWork.Accesses.GetAll();
            var permissionUrls = accesses
            .Where(a => a.RoleId == roleEntity.RoleId)
            .Select(a => a.PermissionURL)
            .ToArray();
            var employeename = employee
            .Where(e => e.EmployeeID == user.EmployeeID)
            .Select(e => e.Employeename)
            .FirstOrDefault();
            var role = await _unitOfWork.Roles.GetAll();
            var rolename = role
            .Where(r => r.RoleId == user.RoleId)
            .Select(r => r.Rolename)
            .FirstOrDefault();

            return new UserResponse
            {
                Id = user.Id,
                EmployeeID = user.EmployeeID,
                Username = user.Username,
                RoleId = user.RoleId,
                Rolename = rolename,
                name = employeename,
                PermissionURL = permissionUrls  
            };
        }
    }
}
