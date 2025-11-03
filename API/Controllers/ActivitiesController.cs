using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
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
    public async Task<ActionResult<Activity>> GetActivityDetail(string Id)
    {
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query
        {
            Id = Id
        }));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command
        {
            AcitivityDto = activityDto
        }));
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto activity)
    {
        return HandleResult(await Mediator.Send(new EditActivity.Command
        {
            ActivityDto = activity
        }));
    }

    [HttpDelete("{Id}")]
    public async Task<ActionResult> DeleteActivity(string Id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command
        {
            Id = Id
        }));
    }
}