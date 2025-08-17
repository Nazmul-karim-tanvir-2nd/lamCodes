using System.Collections.Generic;
using System.Threading.Tasks;
using LogicalAccessMgmt.Data.Models;

public interface IDepartmentService
{
    Task<List<DepartmentRequest>> GetDepartmentAsync();
}
