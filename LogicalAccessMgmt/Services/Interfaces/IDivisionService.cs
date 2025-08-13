using System.Collections.Generic;
using System.Threading.Tasks;
using LogicalAccessMgmt.Data.Models;

public interface IDivisionService
{
    Task<List<DivisionInfoRequest>> GetDivisionsAsync();
}
