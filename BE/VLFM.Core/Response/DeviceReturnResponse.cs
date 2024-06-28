using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VLFM.Core.Response
{
    public class DeviceReturnResponse
    {
        public int Id { get; set; }
        public string DeviceReturnID { get; set; } = DateTime.Now.ToString("yyyyMMddHHmmss");
        public DateTime ReturnAt { get; set; }
        public string EmployeeReturnID { get; set; }
        public string DeviceAssignmentID { get; set; }
        public int StatusID { get; set; }
        public string? Note { get; set; }
    }
}
