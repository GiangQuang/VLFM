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
    public class PermissionDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PermissionId { get; set; }
        [StringLength(50)]
        public string Permissionname { get; set; }
        [StringLength(50)]
        public string Permissionsymbol { get; set; }
    }
}
