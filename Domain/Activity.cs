namespace Domain;

public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Category { get; set; }
    public DateTime Date { get; set; }
    public string? City { get; set; }
    public string? Venue { get; set; }
    public bool IsCancelled { get; set; }
    public double? Longitude { get; set; }
    public double? Latitude { get; set; }

    // navigation properties
    public ICollection<ActivityAttendee> Attendees { get; set; } = [];
}