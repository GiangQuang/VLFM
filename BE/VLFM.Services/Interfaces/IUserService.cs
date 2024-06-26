﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Models;
using VLFM.Core.Response;

namespace VLFM.Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> CreateUser(UserDetails userDetails);
        Task<IEnumerable<UserResponse>> GetAllUsers();
        Task<UserResponse> GetUserById(int id);
        Task<UserDetails> LoginUser(string Username, string Password);
        Task<bool> UpdateUser(UserDetails userDetails);
        Task<bool> DeleteUser(List<UserResponse> users);
        Task<UserResponse> GetCurrentUser(string token);
        /*Task<bool> CheckAccess(IEnumerable<string> roleId, string accessURL);*/
    }
}
