using IncidentIQ.Core.Models;
using IncidentIQ.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace IncidentIQ.Api.Services;

public class DeviceService
{
    private readonly ApplicationDbContext _db;

    public DeviceService(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<List<MedicalDevice>> GetDevicesAsync()
    {
        return await _db.MedicalDevices
            .OrderBy(d => d.AssetTag)
            .ToListAsync();
    }
}