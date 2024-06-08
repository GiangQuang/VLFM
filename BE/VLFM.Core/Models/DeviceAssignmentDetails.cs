using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;

namespace VLFM.Core.Models
{
    public class DeviceAssignmentDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(14)]
        public string DeviceAssignmentID { get; set; } = DateTime.Now.ToString("yyyyMMddHHmmss");
        [Required]
        [Column(TypeName = "date")]
        public DateTime AssignAt{ get; set; }
        [Required]
        [StringLength(14)]
        public string EmployeeAssignID { get; set; }
        [StringLength(44)]
        public string? PropImportID { get; set; }
        [Required]
        [StringLength(14)]
        public string EmployeeReceiveID { get; set; }
        [Required]
        [StringLength(14)]
        public string DeptID { get; set; }
        [Required]
        [StringLength(14)]
        public string StatusID { get; set; }
        public DateTime? AssignEnd { get; set; } 
        public DateTime? ProposeAt { get; set; } 
        [StringLength(300)]
        public string? ProposeContent { get; set; }
        public int? ProposeStatus{ get; set; }
        [StringLength(300)]
        public string? Note { get; set; }
    }
}
