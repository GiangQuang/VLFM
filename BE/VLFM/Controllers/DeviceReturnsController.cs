using Microsoft.AspNetCore.Mvc;
using VLFM.Core.Models;
using VLFM.Core.Response;
using VLFM.Services;
using VLFM.Services.Interfaces;

namespace VLFM.Controllers
{
    [Route("api/devicereturn")]
    [ApiController]
    public class DeviceReturnsController : ControllerBase
    {
        private readonly IDeviceReturnService _deviceReturnService;
        public DeviceReturnsController(IDeviceReturnService deviceReturnService)
        {
            _deviceReturnService = deviceReturnService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllDeviceReturn()
        {
            var DetailsList = await _deviceReturnService.GetAllDeviceReturn();
            if (DetailsList == null)
            {
                return NotFound();
            }

            string DeviceReturnID = HttpContext.Request.Query.ContainsKey("DeviceReturnID") ? HttpContext.Request.Query["DeviceReturnID"].ToString() : null;
            string ReturnAt = HttpContext.Request.Query.ContainsKey("ReturnAt") ? HttpContext.Request.Query["ReturnAt"].ToString() : null;
            string EmployeeReturnID = HttpContext.Request.Query.ContainsKey("EmployeeReturnID") ? HttpContext.Request.Query["EmployeeReturnID"].ToString() : null;
            string DeviceAssignmentID = HttpContext.Request.Query.ContainsKey("DeviceAssignmentID") ? HttpContext.Request.Query["DeviceAssignmentID"].ToString() : null;
            string StatusID = HttpContext.Request.Query.ContainsKey("StatusID") ? HttpContext.Request.Query["StatusID"].ToString() : null;
            string Note = HttpContext.Request.Query.ContainsKey("Note") ? HttpContext.Request.Query["Note"].ToString() : null;

            if (!string.IsNullOrEmpty(DeviceReturnID))
            {
                DetailsList = DetailsList.Where(d => d.DeviceAssignmentID.Contains(DeviceReturnID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(ReturnAt))
            {
                DateTime parsedReturnAt;
                if (DateTime.TryParse(ReturnAt, out parsedReturnAt))
                {
                    DetailsList = DetailsList.Where(d => d.ReturnAt == parsedReturnAt).ToList();
                }
            }
            if (!string.IsNullOrEmpty(EmployeeReturnID))
            {
                DetailsList = DetailsList.Where(d => d.EmployeeReturnID.ToString().Contains(EmployeeReturnID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(DeviceAssignmentID))
            {
                DetailsList = DetailsList.Where(d => d.DeviceAssignmentID.ToString().Contains(DeviceAssignmentID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(StatusID))
            {
                int parsedStatusID;
                if (int.TryParse(StatusID, out parsedStatusID))
                {
                    DetailsList = DetailsList.Where(d => d.StatusID == parsedStatusID).ToList();
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
        public async Task<IActionResult> GetDeviceReturnById(int Id)
        {
            var detailedDeviceReturn = await _deviceReturnService.GetDeviceReturnById(Id);

            if (detailedDeviceReturn != null)
            {
                var responseData = new { data = detailedDeviceReturn };
                return Ok(responseData);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateDeviceReturn(DeviceReturnDetails deviceReturnDetails)
        {
            var isDeviceReturnCreated = await _deviceReturnService.CreateDeviceReturn(deviceReturnDetails);

            if (isDeviceReturnCreated)
            {
                return Ok(isDeviceReturnCreated);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("{Id}")]
        public async Task<IActionResult> UpdateDeviceReturn(DeviceReturnDetails deviceReturnDetails)
        {
            if (deviceReturnDetails != null)
            {
                var isDeviceReturnUpdated = await _deviceReturnService.UpdateDeviceReturn(deviceReturnDetails);
                if (isDeviceReturnUpdated)
                {
                    return Ok(isDeviceReturnUpdated);
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteDeviceReturn(List<DeviceReturnResponse> returns)
        {
            var isDeviceReturnDeleted = await _deviceReturnService.DeleteDeviceReturn(returns);

            if (isDeviceReturnDeleted)
            {
                return Ok(isDeviceReturnDeleted);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
