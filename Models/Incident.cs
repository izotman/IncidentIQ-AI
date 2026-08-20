namespace IncidentIQ.Api.Models;

public class Incident
{
    public int Id { get; set; }

    public string DeviceId { get; set; } = "";

    public string DeviceName { get; set; } = "";

    public string Severity { get; set; } = "";

    public string Category { get; set; } = "";

    public string Description { get; set; } = "";

    public DateTime Created { get; set; }

    public string Status { get; set; } = "";

    public string AssignedTo { get; set; } = "";
}