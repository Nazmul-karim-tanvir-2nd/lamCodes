using LogicalAccessMgmt.Services.interfaces;
using Microsoft.AspNetCore.Mvc;
using LogicalAccessMgmt.Data.Models;

namespace LogicalAccessMgmt.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExternalApiController : ControllerBase
    {
        private readonly IExternalApiService _externalApiService;

        public ExternalApiController(IExternalApiService externalApiService)
        {
            _externalApiService = externalApiService;
        }

        [HttpGet("employee/{cifOrNid}")]
        public async Task<IActionResult> GetEmployeeInfo(string cifOrNid)
        {
            if (string.IsNullOrWhiteSpace(cifOrNid))
                return BadRequest("CIF or NID must be provided.");

            try
            {
                var cookies = await _externalApiService.LoginAndGetCookiesAsync();
                var extApiResponse = await _externalApiService.GetEmployeeInfoAsync(cifOrNid, cookies);

                var employees = extApiResponse.GetEmployees();

                return Ok(new { RawData = extApiResponse.Data, Employees = employees });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

    }
}
