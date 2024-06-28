using Microsoft.AspNetCore.Mvc;
using VLFM.Services.Interfaces;

namespace VLFM.Controllers
{
    [Route("api/statistic")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticService _statisticService;
        public StatisticsController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllStatistics()
        {
            var statistics = await _statisticService.GetAllStatistics();
            return Ok(new { statistics });
        }
    }
}
