using Application.Activities.Queries;
using Application.Activities.Commands;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

//public class ActivitiesController(AppDbContext context, IMediator mediator) : BaseApiController
// public class ActivitiesController(IMediator mediator) : BaseApiController
public class ActivitiesController : BaseApiController
{
    // [HttpGet]
    // public async Task<ActionResult<List<Activity>>> GetActivities()
    // {
    //     return await context.Activities.ToListAsync();
    // }

    // public async Task<ActionResult<List<Activity>>> GetActivities()
    // {
    //     return await mediator.Send(new GetActivityList.Query());
    // }

    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    // [HttpGet("{Id}")]
    // public async Task<ActionResult<Activity>> GetActivityDetail(string Id)
    // {
    //     var activity = await context.Activities.FindAsync(Id);
    //     if (activity is null)
    //     {
    //         return NotFound();
    //     }

    //     return activity;
    // }

    // [HttpGet("{Id}")]
    // public async Task<Activity> GetActivityDetail(string Id)
    // {
    //     return await mediator.Send(new GetActivityDetails.Query
    //     {
    //         Id = Id
    //     });
    // }

    [HttpGet("{Id}")]
    public async Task<Activity> GetActivityDetail(string Id)
    {
        return await Mediator.Send(new GetActivityDetails.Query
        {
            Id = Id
        });
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        return await Mediator.Send(new CreateActivity.Command
        {
            Acitivity = activity
        });
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command
        {
            Activity = activity
        });

        return NoContent();
    }

    [HttpDelete("{Id}")]
    public async Task<ActionResult> DeleteActivity(string Id)
    {
        await Mediator.Send(new DeleteActivity.Command
        {
            Id = Id
        });

        return Ok();
    }
}