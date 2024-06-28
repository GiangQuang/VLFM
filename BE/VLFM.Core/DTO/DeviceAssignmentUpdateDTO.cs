using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VLFM.Core.DTO
{
    public class DeviceAssignmentUpdateDTO
    {
        public int Id { get; set; }

        public DateTime? AssignAt { get; set; }

        public string? EmployeeAssignID { get; set; }

        public string? PropImportID { get; set; }

        public string? StatusID { get; set; }

        public DateTime? AssignEnd { get; set; }

        public string? ProposeContent { get; set; }

        public int? ProposeStatus { get; set; }
    }

}
