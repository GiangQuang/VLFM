using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VLFM.Core.Response
{
    public class AccessResponse
    {
        public int AccessId { get; set; }
        public string AccessURL { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }
        public string Permissionsymbol { get; set; }
        public string PermissionURL { get; set; }
    }
}
