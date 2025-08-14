using System.Collections.Generic;
using System.Threading.Tasks;
using LogicalAccessMgmt.Data.Models;

public interface IDesignationService
{
	Task<List<DesignationRequest>> GetDesignationAsync();
}
