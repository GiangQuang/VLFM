using Microsoft.AspNetCore.Mvc;
using VLFM.Core.Models;
using VLFM.Services.Interfaces;

namespace VLFM.Controllers
{
    [Route("api/permission")]
    [ApiController]
    public class PermissionsController : ControllerBase
    {
        private readonly IPermissionService _permissionService;
        public PermissionsController(IPermissionService permissionService)
        {
            _permissionService = permissionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPermission()
        {
            var DetailsList = await _permissionService.GetAllPermission();
            if (DetailsList == null)
            {
                return NotFound();
            }

            var responseData = new
            {
                data = DetailsList,
            };
            return Ok(responseData);
        }

        [HttpGet("{PermissionId}")]
        public async Task<IActionResult> GetPermissionById(int permissionId)
        {
            var permissionDetails = await _permissionService.GetPermissionById(permissionId);

            if (permissionDetails != null)
            {
                var responseData = new
                {
                    data = permissionDetails,
                };
                return Ok(responseData);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePermission(PermissionDetails permissionDetails)
        {
            var isPermissionCreated = await _permissionService.CreatePermission(permissionDetails);

            if (isPermissionCreated)
            {
                return Ok(isPermissionCreated);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("{PermissionId}")]
        public async Task<IActionResult> UpdatePermission(PermissionDetails permissionDetails)
        {
            if (permissionDetails != null)
            {
                var isPermissionUpdated = await _permissionService.UpdatePermission(permissionDetails);
                if (isPermissionUpdated)
                {
                    return Ok(isPermissionUpdated);
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePermission(List<PermissionDetails> pers)
        {
            var isPermissionDeleted = await _permissionService.DeletePermission(pers);

            if (isPermissionDeleted)
            {
                return Ok(isPermissionDeleted);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
