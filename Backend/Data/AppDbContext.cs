using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configurações de unicidade
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        modelBuilder.Entity<Project>()
            .HasIndex(p => p.Title)
            .IsUnique();

        modelBuilder.Entity<Project>()
            .Property(p => p.Budget)
            .HasPrecision(18, 2);


        //Relacionamento
         modelBuilder.Entity<Project>()
            .HasOne<User>()          // Um projeto pertence a um User
            .WithMany(u => u.Projects)    // Um User pode ter muitos Projetos
            .HasForeignKey(p => p.UserId) // UserId é a chave estrangeira
            .OnDelete(DeleteBehavior.Cascade);
    }
}