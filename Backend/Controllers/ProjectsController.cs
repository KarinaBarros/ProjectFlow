using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProjectsController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    // Método auxiliar para pegar o UserId do token
    private int GetUserIdFromToken()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
        {
            throw new UnauthorizedAccessException("User ID not found in token.");
        }

        return userId;
    }

    [HttpGet("my")]
    public async Task<ActionResult<IEnumerable<Project>>> GetMyProjects()
    {
        var userId = GetUserIdFromToken();

        return await _context.Projects
            .Where(p => p.UserId == userId)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetProject(int id)
    {
        var userId = GetUserIdFromToken();
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.ProjectId == id && p.UserId == userId);

        if (project == null)
        {
            return NotFound();
        }

        return project;
    }

    [HttpPost]
    public async Task<ActionResult<Project>> CreateProject(ProjectDto projectDto)
    {
        var userId = GetUserIdFromToken();

        if (_context.Projects.Any(p => p.Title == projectDto.Title && p.UserId == userId))
        {
            return BadRequest("Já existe outro projeto com esse nome.");
        }

        var project = new Project
        {
            Title = projectDto.Title,
            Description = projectDto.Description,
            Budget = projectDto.Budget,
            SkillsRequired = projectDto.SkillsRequired,
            Deadline = projectDto.Deadline,
            Status = projectDto.Status,
            UserId = userId,
            CreatedDate = projectDto.CreatedDate
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProject), new { id = project.ProjectId }, project);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProject(int id, ProjectDto projectDto)
    {
        var userId = GetUserIdFromToken();

        var project = await _context.Projects.FirstOrDefaultAsync(p => p.ProjectId == id && p.UserId == userId);
        if (project == null)
        {
            return NotFound();
        }

        if (await _context.Projects.AnyAsync(p => p.Title == projectDto.Title && p.ProjectId != id && p.UserId == userId))
        {
            return BadRequest("Já existe outro projeto com esse nome.");
        }

        project.Title = projectDto.Title;
        project.Description = projectDto.Description;
        project.Budget = projectDto.Budget;
        project.SkillsRequired = projectDto.SkillsRequired;
        project.Deadline = projectDto.Deadline;
        project.Status = projectDto.Status;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var userId = GetUserIdFromToken();
        var project = await _context.Projects.FirstOrDefaultAsync(p => p.ProjectId == id && p.UserId == userId);

        if (project == null)
        {
            return NotFound();
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

public class ProjectDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Budget { get; set; }
    public string SkillsRequired { get; set; } = string.Empty;
    public DateTime Deadline { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; } 
}
