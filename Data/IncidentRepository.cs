using IncidentIQ.Api.Models;

namespace IncidentIQ.Api.Data;

public static class IncidentRepository
{
    public static List<Incident> Incidents = new()
    {
        new Incident
        {
            Id = 1,
            DeviceId = "MRI-001",
            DeviceName = "Siemens MRI",
            Severity = "Critical",
            Category = "Network",
            Description = "MRI lost PACS connectivity",
            Created = DateTime.Now.AddMinutes(-45),
            Status = "Open",
            AssignedTo = "Infrastructure Team"
        },

        new Incident
        {
            Id = 2,
            DeviceId = "VENT-102",
            DeviceName = "Philips Ventilator",
            Severity = "High",
            Category = "Software",
            Description = "Firmware update failed",
            Created = DateTime.Now.AddHours(-2),
            Status = "Investigating",
            AssignedTo = "Biomedical Engineering"
        }
    };
}