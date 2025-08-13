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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Map LATeamMember table
            modelBuilder.Entity<LATeamMember>(entity =>
            {
                entity.ToTable("LATeamMember");

                // Define the primary key as a shadow property by name
                entity.HasKey("TeamMemberID");
            });

            // BranchInfoRequest is keyless
            modelBuilder.Entity<BranchInfoRequest>().HasNoKey();
        }

    }
}
