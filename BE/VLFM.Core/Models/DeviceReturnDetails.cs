using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VLFM.Core.Models
{
    public class DeviceReturnDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(14)]
        public string DeviceReturnID { get; set; } = DateTime.Now.ToString("yyyyMMddHHmmss");
        [Required]
        public DateTime ReturnAt { get; set; }
        [Required]
        [StringLength(14)]
        public string EmployeeReturnID { get; set; }
        [StringLength(14)]
        public string DeviceAssignmentID { get; set; }
        public int StatusID { get; set; }
        [StringLength(300)]
        public string? Note { get; set; }
    }
}
