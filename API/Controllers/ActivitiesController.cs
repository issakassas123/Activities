using Application.Activities.Queries;
using Application.Activities.Commands;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

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