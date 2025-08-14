using System.Collections.Generic;
using System.Threading.Tasks;
using LogicalAccessMgmt.Data.DBContexts;
using LogicalAccessMgmt.Data.Models;
using Microsoft.EntityFrameworkCore;

public class DepartmentService : IDepartmentService
{
    private readonly AppDbContext _context;

    public DepartmentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<DepartmentRequest>> GetDepartmentAsync()
    {
        return await _context.Department.ToListAsync();
    }
}
