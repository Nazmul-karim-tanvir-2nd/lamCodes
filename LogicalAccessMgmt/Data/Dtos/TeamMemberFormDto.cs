using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LogicalAccessMgmt.Data.Dtos
{
    public class TeamMemberFormDto
    {
        public string CIFNo { get; set; }
        public string MemberName { get; set; }         // Auto-filled from API
        public string MobileNo { get; set; }           // Auto-filled from API
        public string Designation { get; set; }        // User input
        public string Branch { get; set; }             // User input
        public string LineManagerCIF { get; set; }     // User input
        public DateTime? JoinDate { get; set; }        // Optional
    }
}
