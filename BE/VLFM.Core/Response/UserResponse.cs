﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VLFM.Core.Response
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string EmployeeID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        public string Rolename { get; set; }
        public string name { get; set; }
        public string[] PermissionURL { get; set; }
        public int Status { get; set; }
    }
}
