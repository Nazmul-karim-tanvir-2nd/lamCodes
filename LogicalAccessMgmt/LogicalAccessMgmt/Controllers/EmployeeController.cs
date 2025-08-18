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

        [HttpGet("search/{cifOrNid}")]
        public async Task<IActionResult> GetEmployeeInfo(string cifOrNid)
        {
            if (string.IsNullOrWhiteSpace(cifOrNid))
                return BadRequest("CIF or NID must be provided.");

            try
            {
                var cookies = await _externalApiService.LoginAndGetCookiesAsync();
                var extApiResponse = await _externalApiService.GetEmployeeInfoAsync(cifOrNid, cookies);
                var employees = extApiResponse.GetEmployees();

                // get CIF from the external API response
                var cif = employees?.FirstOrDefault()?.CIF;

                bool isBiometricVerified = false;

                if (!string.IsNullOrEmpty(cif))
                {
                    var biometric = await _context.Biometric
                        .FirstOrDefaultAsync(b => b.CIFNo == cif);

                    if (biometric != null &&
                        biometric.NIDVerificationStatus == true &&
                        biometric.FingerVerificationStatus == true &&
                        biometric.FaceVerificationStatus == true)
                    {
                        isBiometricVerified = true;
                    }
                }

                return Ok(new
                {
                    RawData = extApiResponse.Data,
                    Employees = employees,
                    BiometricVerified = isBiometricVerified
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
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
