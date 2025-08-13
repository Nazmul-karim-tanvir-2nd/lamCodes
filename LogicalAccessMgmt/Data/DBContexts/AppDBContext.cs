using System.Collections.Generic;
using System.Reflection.Emit;
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

        // Optional: Fluent API configurations or override OnModelCreating
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Example if you need to configure the LATeamMember table manually
            modelBuilder.Entity<Models.LATeamMember>().ToTable("LATeamMember");
        }
    }
}
