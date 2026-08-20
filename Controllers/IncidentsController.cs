using Microsoft.AspNetCore.Mvc;
using IncidentIQ.Api.Data;
using IncidentIQ.Api.Models;

namespace IncidentIQ.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IncidentsController : ControllerBase
{
    [HttpGet]
    public IEnumerable<Incident> Get()
    {
        return IncidentRepository.Incidents;
    }

    [HttpGet("{id}")]
    public ActionResult<Incident> Get(int id)
    {
        var incident = IncidentRepository.Incidents.FirstOrDefault(x => x.Id == id);

        if (incident == null)
            return NotFound();

        return incident;
    }

    [HttpPost]
    public ActionResult<Incident> Create(Incident incident)
    {
        incident.Id = IncidentRepository.Incidents.Max(x => x.Id) + 1;
        incident.Created = DateTime.Now;

        IncidentRepository.Incidents.Add(incident);

        return Ok(incident);
    }
}