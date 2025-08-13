using LogicalAccessMgmt.Data.Models;

namespace LogicalAccessMgmt.Services.interfaces
{
    public interface IEmployeeService
    {
        Task<LATeamMember> SaveEmployeeAsync(LATeamMember employee);
        //Task<EmployeeInfo?> GetEmployeeInfoByCIFAsync(string cifNo);
    }
}
