using LogicalAccessMgmt.Data.Models;

namespace LogicalAccessMgmt.Data.Models
{
    public class ExtApiResponse
    {
        public string Data { get; set; } = string.Empty;

       //helper to deserialize
        public List<LogicalAccessMgmt.Data.Models.EmployeeInfo>? GetEmployees()
        {
            if (string.IsNullOrEmpty(Data))
                return null;

            return Newtonsoft.Json.JsonConvert.DeserializeObject<List<LogicalAccessMgmt.Data.Models.EmployeeInfo>>(Data);
        }
    }
}
