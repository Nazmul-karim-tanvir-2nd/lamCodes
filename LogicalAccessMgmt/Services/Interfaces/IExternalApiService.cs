using LogicalAccessMgmt.Data.Models;
using System.Threading.Tasks;

namespace LogicalAccessMgmt.Services.interfaces
{
    public interface IExternalApiService
    {
        Task<Dictionary<string, string>> LoginAndGetCookiesAsync();
        Task<ExtApiResponse> GetEmployeeInfoAsync(string cifOrNid, Dictionary<string, string> cookies);
        Task<EmployeeInfo> GetEmployeeInfoByCIFAsync(string cif);
    }
}

