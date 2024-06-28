using Microsoft.AspNetCore.Mvc;
using VLFM.Core.Models;
using VLFM.Services;
using VLFM.Services.Interfaces;

namespace VLFM.Controllers
{
    [Route("api/role")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;
        public RolesController(IRoleService roleService) 
        {
            _roleService = roleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRole()
        {
            var DetailsList = await _roleService.GetAllRole();
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

        [HttpGet("{RoleId}")]
        public async Task<IActionResult> GetRoleById(int roleId)
        {
            var roleDetails = await _roleService.GetRoleById(roleId);

            if (roleDetails != null)
            {
                var responseData = new
                {
                    data = roleDetails,
                };
                return Ok(responseData);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole(RoleDetails roleDetails)
        {
            var isRoleCreated = await _roleService.CreateRole(roleDetails);

            if (isRoleCreated)
            {
                return Ok(isRoleCreated);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("{RoleId}")]
        public async Task<IActionResult> UpdateRole(RoleDetails roleDetails)
        {
            if (roleDetails != null)
            {
                var isRoleUpdated = await _roleService.UpdateRole(roleDetails);
                if (isRoleUpdated)
                {
                    return Ok(isRoleUpdated);
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRole(List<RoleDetails> roles)
        {
            var isRoleDeleted = await _roleService.DeleteRole(roles);

            if (isRoleDeleted)
            {
                return Ok(isRoleDeleted);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
