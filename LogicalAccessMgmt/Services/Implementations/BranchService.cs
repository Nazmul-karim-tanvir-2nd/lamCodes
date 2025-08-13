using Microsoft.EntityFrameworkCore;
using LogicalAccessMgmt.Data.DBContexts;
using LogicalAccessMgmt.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public class BranchService : IBranchService
{
    private readonly AppDbContext _context;

    public BranchService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<BranchInfoRequest>> GetAllBranchesAsync()
    {
        return await _context.Branches
            .FromSqlRaw("EXEC dbo.udspLA_LstEmployeeBranch")
            .ToListAsync();
    }
}