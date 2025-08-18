using LogicalAccessMgmt.Data.Models;
using Microsoft.EntityFrameworkCore;


namespace LogicalAccessMgmt.Data.DBContexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<LATeamMember> LATeamMembers { get; set; }

        public DbSet<BranchInfoRequest> Branches { get; set; }

        public DbSet<DivisionInfoRequest> Divisions { get; set; }

        public DbSet<DesignationRequest> Designations { get; set; }

        public DbSet<DepartmentRequest> Department { get; set; }

        public DbSet<BiometricVerificationStatus> Biometric { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Map LATeamMember table
            modelBuilder.Entity<LATeamMember>(entity =>
            {
                entity.ToTable("LATeamMember");
                entity.HasKey("TeamMemberID");
            });

            // BranchInfoRequest is keyless
            modelBuilder.Entity<BranchInfoRequest>().HasNoKey();

            modelBuilder.Entity<DivisionInfoRequest>().ToTable("LADivision").HasNoKey();

            modelBuilder.Entity<DesignationRequest>().ToTable("LicEmpCodesDesignationType").HasNoKey();

            modelBuilder.Entity<DepartmentRequest>().ToTable("LATeam").HasNoKey();

            modelBuilder.Entity<BiometricVerificationStatus>(entity =>
            {
                entity.ToTable("LABiometricVerificationRequest").HasNoKey();
            });
        }

    }
}
