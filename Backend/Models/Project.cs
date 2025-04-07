namespace Backend.Models;

public class Project
{
    public int ProjectId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Budget { get; set; }
    public string SkillsRequired { get; set; } = string.Empty;
    public DateTime Deadline { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    
    public int UserId { get; set; }

}