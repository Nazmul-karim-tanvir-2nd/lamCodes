using LogicalAccessMgmt.Data.DBContexts;
using LogicalAccessMgmt.Data.Models;
using LogicalAccessMgmt.Services.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace LogicalAccessMgmt.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IExternalApiService _externalApiService;
        private readonly IBranchService _branchService;
        private readonly IDivisionService _divisionService;

        public EmployeeController(
            AppDbContext context,
            IExternalApiService externalApiService,
            IBranchService branchService,
            IDivisionService divisionService)
        {
            _context = context;
            _externalApiService = externalApiService;
            _branchService = branchService;
            _divisionService = divisionService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeInfoRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Step 1: Authenticate and fetch data
            var cookies = await _externalApiService.LoginAndGetCookiesAsync();
            var extApiResponse = await _externalApiService.GetEmployeeInfoAsync(request.CIFNo, cookies);
            var apiResponse = extApiResponse.GetEmployees()?.FirstOrDefault();

            if (apiResponse == null)
                return NotFound($"No data found for CIF {request.CIFNo}");

            // Step 2: Check for duplicates
            bool exists = await _context.LATeamMembers.AnyAsync(e => e.CIFNo == request.CIFNo);
            if (exists)
                return Conflict("Employee with this CIF already exists.");

            // Step 3: Map and save
            var employee = new LATeamMember
            {
                CIFNo = apiResponse.CIF,
                MemberName = apiResponse.Name,
                MobileNo = apiResponse.MobilePhone,
                Branch = request.Branch,
                Designation = request.Designation,
                EmpStatus = request.EmpStatus,
                UserStatus = request.UserStatus,
                ExpiryDate = request.ExpiryDate,
                LineManagerCIF = request.LineManagerCIF,
                JoinDate = request.JoinDate
            };

            _context.LATeamMembers.Add(employee);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Employee created successfully." });
        }

        [HttpGet("branches/all")]
        public async Task<IActionResult> GetAllBranches()
        {
            var branches = await _branchService.GetAllBranchesAsync();
            return Ok(branches);
        }

        [HttpGet("divisions")]
        public async Task<IActionResult> GetDivisions()
        {
            var divisions = await _divisionService.GetDivisionsAsync();
            return Ok(divisions);
        }


    }
}
