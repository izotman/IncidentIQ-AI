using IncidentIQ.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace IncidentIQ.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        await context.Database.MigrateAsync();

        if (await context.MedicalDevices.AnyAsync())
            return;

        var devices = new List<MedicalDevice>
        {
            new()
            {
                Id = Guid.NewGuid(),
                AssetTag = "MRI-001",
                Manufacturer = "Siemens",
                Model = "MAGNETOM Vida",
                DeviceType = "MRI",
                Department = "Radiology",
                Location = "Building A",
                FirmwareVersion = "3.2.1",
                LastMaintenance = DateTime.UtcNow.AddDays(-20),
                NextMaintenance = DateTime.UtcNow.AddDays(60),
                Status = "Online",
                RiskScore = 8
            },

            new()
            {
                Id = Guid.NewGuid(),
                AssetTag = "CT-001",
                Manufacturer = "GE Healthcare",
                Model = "Revolution Apex",
                DeviceType = "CT Scanner",
                Department = "Radiology",
                Location = "Building A",
                FirmwareVersion = "5.4.2",
                LastMaintenance = DateTime.UtcNow.AddDays(-45),
                NextMaintenance = DateTime.UtcNow.AddDays(45),
                Status = "Online",
                RiskScore = 12
            },

            new()
            {
                Id = Guid.NewGuid(),
                AssetTag = "XRAY-003",
                Manufacturer = "Philips",
                Model = "DigitalDiagnost",
                DeviceType = "X-Ray",
                Department = "Emergency",
                Location = "ER",
                FirmwareVersion = "7.0.5",
                LastMaintenance = DateTime.UtcNow.AddDays(-75),
                NextMaintenance = DateTime.UtcNow.AddDays(15),
                Status = "Warning",
                RiskScore = 42
            },

            new()
            {
                Id = Guid.NewGuid(),
                AssetTag = "VENT-102",
                Manufacturer = "Philips",
                Model = "V60",
                DeviceType = "Ventilator",
                Department = "ICU",
                Location = "ICU Room 4",
                FirmwareVersion = "5.1.8",
                LastMaintenance = DateTime.UtcNow.AddDays(-10),
                NextMaintenance = DateTime.UtcNow.AddDays(90),
                Status = "Maintenance",
                RiskScore = 35
            },

            new()
            {
                Id = Guid.NewGuid(),
                AssetTag = "US-021",
                Manufacturer = "GE Healthcare",
                Model = "LOGIQ E10",
                DeviceType = "Ultrasound",
                Department = "OB/GYN",
                Location = "Women's Center",
                FirmwareVersion = "4.8.0",
                LastMaintenance = DateTime.UtcNow.AddDays(-32),
                NextMaintenance = DateTime.UtcNow.AddDays(58),
                Status = "Online",
                RiskScore = 10
            },

            new()
            {
                Id = Guid.NewGuid(),
                AssetTag = "PACS-01",
                Manufacturer = "Dell",
                Model = "PowerEdge R760",
                DeviceType = "PACS Server",
                Department = "Data Center",
                Location = "Server Room",
                FirmwareVersion = "Windows Server 2025",
                LastMaintenance = DateTime.UtcNow.AddDays(-5),
                NextMaintenance = DateTime.UtcNow.AddDays(180),
                Status = "Online",
                RiskScore = 3
            }
        };

        context.MedicalDevices.AddRange(devices);

        await context.SaveChangesAsync();
    }
}