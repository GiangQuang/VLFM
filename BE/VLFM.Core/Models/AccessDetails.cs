using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace VLFM.Core.Models
{
    public class AccessDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccessId { get; set; }
        [StringLength(300)]
        public string AccessURL { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }
        [StringLength(50)]
        public string Permissionsymbol { get; set; }
        [StringLength(100)]
        public string? PermissionURL { get; set; }
        public AccessDetails(string accessURL, string permissionsymbol)
        {
            AccessURL = accessURL;
            Permissionsymbol = permissionsymbol;
            PermissionURL = GeneratePermissionURL(accessURL, permissionsymbol);
        }
        private string GeneratePermissionURL(string AccessURL, string Permissionsymbol)
        {
            return $"{AccessURL}_{Permissionsymbol}";
        }
    }
}
