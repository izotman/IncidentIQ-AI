using Microsoft.EntityFrameworkCore;
using IncidentIQ.Core.Models;
using IncidentIQ.Core.Entities;

namespace IncidentIQ.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<MedicalDevice> MedicalDevices => Set<MedicalDevice>();

    public DbSet<Incident> Incidents => Set<Incident>();
}