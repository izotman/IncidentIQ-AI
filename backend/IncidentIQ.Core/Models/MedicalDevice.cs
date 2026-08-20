namespace IncidentIQ.Core.Models;

public class MedicalDevice
{
    public Guid Id { get; set; }

    public string AssetTag { get; set; } = "";

    public string Manufacturer { get; set; } = "";

    public string Model { get; set; } = "";

    public string DeviceType { get; set; } = "";

    public string Department { get; set; } = "";

    public string Location { get; set; } = "";

    public string FirmwareVersion { get; set; } = "";

    public DateTime LastMaintenance { get; set; }

    public DateTime NextMaintenance { get; set; }

    public string Status { get; set; } = "";

    public int RiskScore { get; set; }
}