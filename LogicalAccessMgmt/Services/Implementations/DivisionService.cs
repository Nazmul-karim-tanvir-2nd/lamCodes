using System.Collections.Generic;
using System.Threading.Tasks;
using LogicalAccessMgmt.Data.DBContexts;
using LogicalAccessMgmt.Data.Models;
using Microsoft.EntityFrameworkCore;

public class DivisionService : IDivisionService
{
    private readonly AppDbContext _context;

    public DivisionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<DivisionInfoRequest>> GetDivisionsAsync()
    {
        return await _context.Divisions.ToListAsync();
    }
}
