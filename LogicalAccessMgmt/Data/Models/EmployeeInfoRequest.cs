namespace LogicalAccessMgmt.Data.Models
{
    public class EmployeeInfoRequest
    {
        public string CIFNo { get; set; } = default!;
        public string EmpStatus { get; set; } = default!;
        public string UserStatus { get; set; } = default!;
        public DateTime JoinDate { get; set; } = default!;
        public DateTime? ExpiryDate { get; set; }
        public string Designation { get; set; } = default!;
        public string Branch { get; set; } = default!;
        public string LineManagerCIF { get; set; } = default!;
    }
}