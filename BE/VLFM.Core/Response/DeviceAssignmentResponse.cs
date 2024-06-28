using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VLFM.Core.Response
{
    public class DeviceAssignmentResponse
    {
        public int Id { get; set; }
        public string DeviceAssignmentID { get; set; } 
        public DateTime? AssignAt { get; set; }
        public string? EmployeeAssignID { get; set; }
        public string? PropImportID { get; set; }
        public string EmployeeReceiveID { get; set; }
        public string DeptID { get; set; }
        public string? StatusID { get; set; }
        public DateTime? AssignEnd { get; set; } 
        public DateTime? ProposeAt { get; set; } 
        public string? ProposeContent { get; set; }
        public int? ProposeStatus { get; set; }
        public string? Note { get; set; }
    }
}
