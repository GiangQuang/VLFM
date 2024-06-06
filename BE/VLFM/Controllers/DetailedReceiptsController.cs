using Microsoft.AspNetCore.Mvc;
using VLFM.Core.Models;
using VLFM.Core.Response;
using VLFM.Services;
using VLFM.Services.Interfaces;

namespace VLFM.Controllers
{
    [Route("api/detailedreceipt")]
    [ApiController]
    public class DetailedReceiptsController : ControllerBase
    {
        private readonly IDetailedReceiptService _detailedReceiptService;
        public DetailedReceiptsController(IDetailedReceiptService detailedReceiptService)
        {
            _detailedReceiptService = detailedReceiptService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDetailedReceiptList()
        {
            var DetailsList = await _detailedReceiptService.GetAllDetailedReceipts();
            if (DetailsList == null)
            {
                return NotFound();
            }
            string DtReceiptID = HttpContext.Request.Query.ContainsKey("DtReceiptID") ? HttpContext.Request.Query["DtReceiptID"].ToString() : null;
            string ReceiptID = HttpContext.Request.Query.ContainsKey("ReceiptID") ? HttpContext.Request.Query["ReceiptID"].ToString() : null;
            string PropertyID = HttpContext.Request.Query.ContainsKey("PropertyID") ? HttpContext.Request.Query["PropertyID"].ToString() : null;
            string quantity = HttpContext.Request.Query.ContainsKey("quantity") ? HttpContext.Request.Query["quantity"].ToString() : null;
            string Price = HttpContext.Request.Query.ContainsKey("Price") ? HttpContext.Request.Query["Price"].ToString() : null;
            string Brand = HttpContext.Request.Query.ContainsKey("Brand") ? HttpContext.Request.Query["Brand"].ToString() : null;
            if (!string.IsNullOrEmpty(DtReceiptID))
            {
                DetailsList = DetailsList.Where(d => d.DtReceiptID.Contains(DtReceiptID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(ReceiptID))
            {
                DetailsList = DetailsList.Where(d => d.ReceiptID.ToString().Contains(ReceiptID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(PropertyID))
            {
                DetailsList = DetailsList.Where(d => d.PropertyID.ToString().Contains(PropertyID, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!string.IsNullOrEmpty(quantity))
            {
                decimal parsedquantity;
                if (decimal.TryParse(quantity, out parsedquantity))
                {
                    DetailsList = DetailsList.Where(d => d.quantity == parsedquantity).ToList();
                }
            }
            if (!string.IsNullOrEmpty(Price))
            {
                int parsedPrice;
                if (int.TryParse(Price, out parsedPrice))
                {
                    DetailsList = DetailsList.Where(d => d.Price == parsedPrice).ToList();
                }
            }
            if (!string.IsNullOrEmpty(Brand))
            {
                DetailsList = DetailsList.Where(d => d.Brand.Contains(Brand, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            var responseData = new
            {
                data = DetailsList,
            };

            return Ok(responseData);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetDetailedReceiptById(int Id)
        {
            var detailedReceiptDetails = await _detailedReceiptService.GetDetailedReceiptById(Id);

            if (detailedReceiptDetails != null)
            {
                var responseData = new{ data = detailedReceiptDetails };
                return Ok(responseData);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateDetailedReceipt(DetailedReceiptDetails detailedReceipt)
        {
            var isDetailedReceiptCreated = await _detailedReceiptService.CreateDetailedReceipt(detailedReceipt);

            if (isDetailedReceiptCreated)
            {
                return Ok(isDetailedReceiptCreated);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("{Id}")]
        public async Task<IActionResult> UpdateDetailedReceipt(DetailedReceiptDetails detailedReceipt)
        {
            if (detailedReceipt != null)
            {
                var isDetailedReceiptUpdated = await _detailedReceiptService.UpdateDetailedReceipt(detailedReceipt);
                if (isDetailedReceiptUpdated)
                {
                    return Ok(isDetailedReceiptUpdated);
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteDetailedReceipt(List<DetailedReceiptResponse> derec)
        {
            var isDetailedReceiptDeleted = await _detailedReceiptService.DeleteDetailedReceipt(derec);

            if (isDetailedReceiptDeleted)
            {
                return Ok(isDetailedReceiptDeleted);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
