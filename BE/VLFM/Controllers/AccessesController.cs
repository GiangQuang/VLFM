using Microsoft.AspNetCore.Mvc;
using VLFM.Core.Models;
using VLFM.Core.Response;
using VLFM.Services;
using VLFM.Services.Interfaces;

namespace VLFM.Controllers
{
    [Route("api/access")]
    [ApiController]
    public class AccessesController : ControllerBase
    {
        private readonly IAccessService _accessService;
        public AccessesController(IAccessService accessService)
        {
            _accessService = accessService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAccess()
        {
            var DetailsList = await _accessService.GetAllAccess();
            if (DetailsList == null)
            {
                return NotFound();
            }

            string AccessURL = HttpContext.Request.Query.ContainsKey("AccessURL") ? HttpContext.Request.Query["AccessURL"].ToString() : null;
            string RoleId = HttpContext.Request.Query.ContainsKey("RoleId") ? HttpContext.Request.Query["RoleId"].ToString() : null;
            string PermissionId = HttpContext.Request.Query.ContainsKey("PermissionId") ? HttpContext.Request.Query["PermissionId"].ToString() : null;
            string Permissionsymbol = HttpContext.Request.Query.ContainsKey("Permissionsymbol") ? HttpContext.Request.Query["Permissionsymbol"].ToString() : null;
            string PermissionURL = HttpContext.Request.Query.ContainsKey("PermissionURL") ? HttpContext.Request.Query["PermissionURL"].ToString() : null;
            if (!string.IsNullOrEmpty(AccessURL))
            {
                DetailsList = DetailsList.Where(d => d.AccessURL.Contains(AccessURL, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(Permissionsymbol))
            {
                DetailsList = DetailsList.Where(d => d.Permissionsymbol.Contains(Permissionsymbol, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(PermissionURL))
            {
                DetailsList = DetailsList.Where(d => d.PermissionURL.Contains(PermissionURL, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(RoleId))
            {
                decimal parsedRoleId;
                if (decimal.TryParse(RoleId, out parsedRoleId))
                {
                    DetailsList = DetailsList.Where(d => d.RoleId == parsedRoleId).ToList();
                }
            }
            if (!string.IsNullOrEmpty(PermissionId))
            {
                decimal parsedPermissionId;
                if (decimal.TryParse(PermissionId, out parsedPermissionId))
                {
                    DetailsList = DetailsList.Where(d => d.PermissionId == parsedPermissionId).ToList();
                }
            }
            var responseData = new
            {
                data = DetailsList,
            };

            return Ok(responseData);
        }

        [HttpGet("{AccessId}")]
        public async Task<IActionResult> GetAccessById(int accessId)
        {
            var accessDetails = await _accessService.GetAccessById(accessId);

            if (accessDetails != null)
            {
                var responseData = new { data = accessDetails };
                return Ok(responseData);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccess(AccessDetails accessDetails)
        {
            var isAccessCreated = await _accessService.CreateAccess(accessDetails);

            if (isAccessCreated)
            {
                return Ok(isAccessCreated);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("{AccessId}")]
        public async Task<IActionResult> UpdateAccess(AccessDetails accessDetails)
        {
            if (accessDetails != null)
            {
                var isAccessUpdated = await _accessService.UpdateAccess(accessDetails);
                if (isAccessUpdated)
                {
                    return Ok(isAccessUpdated);
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAccess(List<AccessResponse> accs)
        {
            var isAccessDeleted = await _accessService.DeleteAccess(accs);

            if (isAccessDeleted)
            {
                return Ok(isAccessDeleted);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
