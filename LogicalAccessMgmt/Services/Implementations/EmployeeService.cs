using LogicalAccessMgmt.Data.DBContexts;
using LogicalAccessMgmt.Services.interfaces;
using LogicalAccessMgmt.Data.Models;
using System.Threading.Tasks;

namespace LogicalAccessMgmt.Services.implementations
{
    public class EmployeeService : IEmployeeService
    {
        private readonly AppDbContext _context;

        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<LATeamMember> SaveEmployeeAsync(LATeamMember employee)
        {
            _context.LATeamMembers.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
    }
}
