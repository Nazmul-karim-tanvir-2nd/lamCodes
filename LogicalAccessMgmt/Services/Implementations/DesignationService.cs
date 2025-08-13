using Microsoft.EntityFrameworkCore;
using LogicalAccessMgmt.Data.DBContexts;
using LogicalAccessMgmt.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public class DesignationService : IDesignationService
{
    private readonly AppDbContext _context;

    public DesignationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<DesignationRequest>> GetDesignationAsync()
    {
        return await _context.Designations.ToListAsync();

    }
}