using System.Collections.Generic;
using System.Threading.Tasks;
using LogicalAccessMgmt.Data.Models;

public interface IBranchService
{
    Task<List<BranchInfoRequest>> GetAllBranchesAsync();
}
