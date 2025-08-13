namespace LogicalAccessMgmt.Data.Models
{
    public class EmployeeInfo
    {
        public string? CIF { get; set; }
        public string? Name { get; set; }
        public string? Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? MobilePhone { get; set; }
        public string? Email { get; set; }
        public string? NidNumber { get; set; }
        public string? Religion { get; set; }
    }

    

    public class ExternalApiEmployeeDto
    {
        public string CIFNo { get; set; } = default!;
        public string MemberName { get; set; } = default!;
        public string MobileNo { get; set; } = default!;
        public DateTime? JoinDate { get; set; }
    }

}
