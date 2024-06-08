using Microsoft.AspNetCore.Mvc;
using VLFM.Core.Models;
using VLFM.Core.Response;
using VLFM.Services;
using VLFM.Services.Interfaces;

namespace VLFM.Controllers
{
    [Route("api/deviceassignment")]
    [ApiController]
    public class DeviceAssignmentsController : ControllerBase
    {
        private readonly IDeviceAssignmentService _deviceAssignmentService;
        public DeviceAssignmentsController(IDeviceAssignmentService deviceAssignmentService)
        {
            _deviceAssignmentService = deviceAssignmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDeviceAssignment()
        {
            var DetailsList = await _deviceAssignmentService.GetAllDeviceAssignment();
            if (DetailsList == null)
            {
                return NotFound();
            }

            string DeviceAssignmentID = HttpContext.Request.Query.ContainsKey("DeviceAssignmentID") ? HttpContext.Request.Query["DeviceAssignmentID"].ToString() : null;
            string AssignAt = HttpContext.Request.Query.ContainsKey("AssignAt") ? HttpContext.Request.Query["AssignAt"].ToString() : null;
            string EmployeeAssignID = HttpContext.Request.Query.ContainsKey("EmployeeAssignID") ? HttpContext.Request.Query["EmployeeAssignID"].ToString() : null;
            string PropImportID = HttpContext.Request.Query.ContainsKey("PropImportID") ? HttpContext.Request.Query["PropImportID"].ToString() : null;
            string EmployeeReceiveID = HttpContext.Request.Query.ContainsKey("EmployeeReceiveID") ? HttpContext.Request.Query["EmployeeReceiveID"].ToString() : null;
            string DeptID = HttpContext.Request.Query.ContainsKey("DeptID") ? HttpContext.Request.Query["DeptID"].ToString() : null;
            string StatusID = HttpContext.Request.Query.ContainsKey("StatusID") ? HttpContext.Request.Query["StatusID"].ToString() : null;
            string AssignEnd = HttpContext.Request.Query.ContainsKey("AssignEnd") ? HttpContext.Request.Query["AssignEnd"].ToString() : null;
            string ProposeAt = HttpContext.Request.Query.ContainsKey("ProposeAt") ? HttpContext.Request.Query["ProposeAt"].ToString() : null;
            string ProposeContent = HttpContext.Request.Query.ContainsKey("ProposeContent") ? HttpContext.Request.Query["ProposeContent"].ToString() : null;
            string ProposeStatus = HttpContext.Request.Query.ContainsKey("ProposeStatus") ? HttpContext.Request.Query["ProposeStatus"].ToString() : null;
            string Note = HttpContext.Request.Query.ContainsKey("Note") ? HttpContext.Request.Query["Note"].ToString() : null;

            if (!string.IsNullOrEmpty(DeviceAssignmentID))
            {
                DetailsList = DetailsList.Where(d => d.DeviceAssignmentID.Contains(DeviceAssignmentID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(AssignAt))
            {
                DateTime parsedAssignAt;
                if (DateTime.TryParse(AssignAt, out parsedAssignAt))
                {
                    DetailsList = DetailsList.Where(d => d.AssignAt == parsedAssignAt).ToList();
                }
            }
            if (!string.IsNullOrEmpty(EmployeeAssignID))
            {
                DetailsList = DetailsList.Where(d => d.EmployeeAssignID.ToString().Contains(EmployeeAssignID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(PropImportID))
            {
                DetailsList = DetailsList.Where(d => d.PropImportID.ToString().Contains(PropImportID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(EmployeeReceiveID))
            {
                DetailsList = DetailsList.Where(d => d.EmployeeReceiveID.ToString().Contains(EmployeeReceiveID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(DeptID))
            {
                DetailsList = DetailsList.Where(d => d.DeptID.ToString().Contains(DeptID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(StatusID))
            {
                DetailsList = DetailsList.Where(d => d.StatusID.ToString().Contains(StatusID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(AssignEnd))
            {
                DateTime parsedAssignEnd;
                if (DateTime.TryParse(AssignEnd, out parsedAssignEnd))
                {
                    DetailsList = DetailsList.Where(d => d.AssignEnd == parsedAssignEnd).ToList();
                }
            }
            if (!string.IsNullOrEmpty(ProposeAt))
            {
                DateTime parsedProposeAt;
                if (DateTime.TryParse(ProposeAt, out parsedProposeAt))
                {
                    DetailsList = DetailsList.Where(d => d.ProposeAt == parsedProposeAt).ToList();
                }
            }
            if (!string.IsNullOrEmpty(ProposeContent))
            {
                DetailsList = DetailsList.Where(d => d.ProposeContent.Contains(ProposeContent, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(ProposeStatus))
            {
                int parsedProposeStatus;
                if (int.TryParse(ProposeStatus, out parsedProposeStatus))
                {
                    DetailsList = DetailsList.Where(d => d.ProposeStatus == parsedProposeStatus).ToList();
                }
            }
            if (!string.IsNullOrEmpty(Note))
            {
                DetailsList = DetailsList.Where(d => d.Note.Contains(Note, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            var responseData = new
            {
                data = DetailsList,
            };

            return Ok(responseData);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetDeviceAssignmentById(int Id)
        {
            var detailedDeviceAssignment = await _deviceAssignmentService.GetDeviceAssignmentById(Id);

            if (detailedDeviceAssignment != null)
            {
                var responseData = new { data = detailedDeviceAssignment };
                return Ok(responseData);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateDeviceAssignment(DeviceAssignmentDetails deviceAssignmentDetails)
        {
            var isDeviceAssignmentCreated = await _deviceAssignmentService.CreateDeviceAssignment(deviceAssignmentDetails);

            if (isDeviceAssignmentCreated)
            {
                return Ok(isDeviceAssignmentCreated);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("{Id}")]
        public async Task<IActionResult> UpdateDeviceAssignment(DeviceAssignmentDetails deviceAssignmentDetails)
        {
            if (deviceAssignmentDetails != null)
            {
                var isDeviceAssignmentUpdated = await _deviceAssignmentService.UpdateDeviceAssignment(deviceAssignmentDetails);
                if (isDeviceAssignmentUpdated)
                {
                    return Ok(isDeviceAssignmentUpdated);
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteDeviceAssignment(List<DeviceAssignmentResponse> assign)
        {
            var isDeviceAssignmentDeleted = await _deviceAssignmentService.DeleteDeviceAssignment(assign);

            if (isDeviceAssignmentDeleted)
            {
                return Ok(isDeviceAssignmentDeleted);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
