using Microsoft.AspNetCore.Mvc;
using VLFM.Core.Models;
using VLFM.Core.Response;
using VLFM.Services;
using VLFM.Services.Interfaces;

namespace VLFM.Controllers
{
    [Route("api/propertyimport")]
    [ApiController]
    public class PropertyImportsController : ControllerBase
    {
        private readonly IPropertyImportService _propertyImportService;
        public PropertyImportsController(IPropertyImportService propertyImportService)
        {
            _propertyImportService = propertyImportService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPropertyImport()
        {
            var DetailsList = await _propertyImportService.GetAllPropertyImport();
            if (DetailsList == null)
            {
                return NotFound();
            }

            string PropImportID = HttpContext.Request.Query.ContainsKey("PropImportID") ? HttpContext.Request.Query["PropImportID"].ToString() : null;
            string DtReceiptID = HttpContext.Request.Query.ContainsKey("DtReceiptID") ? HttpContext.Request.Query["DtReceiptID"].ToString() : null;
            string PropertyID = HttpContext.Request.Query.ContainsKey("PropertyID") ? HttpContext.Request.Query["PropertyID"].ToString() : null;
            string WarrantydayAt = HttpContext.Request.Query.ContainsKey("WarrantydayAt") ? HttpContext.Request.Query["WarrantydayAt"].ToString() : null;
            string WarrantydayEnd = HttpContext.Request.Query.ContainsKey("WarrantydayEnd") ? HttpContext.Request.Query["WarrantydayEnd"].ToString() : null;
            string StatusID = HttpContext.Request.Query.ContainsKey("StatusID") ? HttpContext.Request.Query["StatusID"].ToString() : null;
            
            if (!string.IsNullOrEmpty(PropImportID))
            {
                DetailsList = DetailsList.Where(d => d.PropImportID.ToString().Contains(PropImportID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(DtReceiptID))
            {
                DetailsList = DetailsList.Where(d => d.DtReceiptID.Contains(DtReceiptID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            
            if (!string.IsNullOrEmpty(PropertyID))
            {
                DetailsList = DetailsList.Where(d => d.PropertyID.ToString().Contains(PropertyID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(WarrantydayAt))
            {
                DateTime parsedWarrantydayAt;
                if (DateTime.TryParse(WarrantydayAt, out parsedWarrantydayAt))
                {
                    DetailsList = DetailsList.Where(d => d.WarrantydayAt == parsedWarrantydayAt).ToList();
                }
            }
            if (!string.IsNullOrEmpty(WarrantydayEnd))
            {
                DateTime parsedWarrantydayEnd;
                if (DateTime.TryParse(WarrantydayEnd, out parsedWarrantydayEnd))
                {
                    DetailsList = DetailsList.Where(d => d.WarrantydayEnd == parsedWarrantydayEnd).ToList();
                }
            }
            if (!string.IsNullOrEmpty(StatusID))
            {
                DetailsList = DetailsList.Where(d => d.StatusID.ToString().Contains(StatusID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            var responseData = new
            {
                data = DetailsList,
            };

            return Ok(responseData);
        }
        
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetPropertyImportById(int Id)
        {
            var detailedPropertyImport = await _propertyImportService.GetPropertyImportById(Id);

            if (detailedPropertyImport != null)
            {
                var responseData = new { data = detailedPropertyImport };
                return Ok(responseData);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePropertyImport(PropertyImportDetails propertyImportDetails)
        {
            var isPropertyImportCreated = await _propertyImportService.CreatePropertyImport(propertyImportDetails);

            if (isPropertyImportCreated)
            {
                return Ok(isPropertyImportCreated);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost("{Id}")]
        public async Task<IActionResult> UpdatePropertyImport(PropertyImportDetails propertyImportDetails)
        {
            if (propertyImportDetails != null)
            {
                var isPropertyImporUpdated = await _propertyImportService.UpdatePropertyImport(propertyImportDetails);
                if (isPropertyImporUpdated)
                {
                    return Ok(isPropertyImporUpdated);
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePropertyImport(List<PropertyImportResponse> propImports)
        {
            var isPropertyImportDeleted = await _propertyImportService.DeletePropertyImport(propImports);

            if (isPropertyImportDeleted)
            {
                return Ok(isPropertyImportDeleted);
            }
            else
            {
                return BadRequest();
            }
        }
    }

}
