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
        private readonly IDesignationService _designationService;
        private readonly IDepartmentService _departmentService;

        public EmployeeController(
            AppDbContext context,
            IExternalApiService externalApiService,
            IBranchService branchService,
            IDivisionService divisionService,
            IDesignationService designationService,
            IDepartmentService departmentService)
        {
            _context = context;
            _externalApiService = externalApiService;
            _branchService = branchService;
            _divisionService = divisionService;
            _designationService = designationService;
            _departmentService = departmentService;
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

        [HttpGet("designation")]
        public async Task<IActionResult> GetDesignation()
        {
            var designation = await _designationService.GetDesignationAsync();
            return Ok(designation);
        }

        [HttpGet("line-manager/{cifNo}")]
        public async Task<IActionResult> GetLineManagerInfo(string cifNo)
        {
            if (string.IsNullOrWhiteSpace(cifNo))
                return BadRequest("CIF number is required.");

            var lineManager = await _context.LATeamMembers
                .Where(m => m.CIFNo == cifNo)
                .Select(m => new
                {
                    m.MemberName,
                    m.Designation,
                    m.MobileNo
                })
                .FirstOrDefaultAsync();

            if (lineManager == null)
                return NotFound($"No line manager found with CIF {cifNo}.");

            return Ok(lineManager);
        }
        [HttpGet("department")]
        public async Task<IActionResult> GetDepartment()
        {
            var departments = await _context.Department.ToListAsync();
            return Ok(departments);


        }
    }
}
