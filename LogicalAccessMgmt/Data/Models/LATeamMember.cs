using System.ComponentModel.DataAnnotations;

namespace LogicalAccessMgmt.Data.Models
{
    public class LATeamMember
    {
        [Key]
        public int TeamMemberID { get; private set; }
        public string CIFNo { get; set; } = default!;
        public string MemberName { get; set; } = string.Empty;
        public string Designation { get; set; } = string.Empty;
        public DateTime JoinDate { get; set; }               // ✅ no default needed
        public string EmpStatus { get; set; } = string.Empty;
        public string UserStatus { get; set; } = string.Empty;
        public string LineManagerCIF { get; set; } = string.Empty;
        public string Branch { get; set; } = string.Empty;
        public DateTime? ExpiryDate { get; set; }            // ✅ nullable, no string
        public string MobileNo { get; set; } = string.Empty;
    }
}
