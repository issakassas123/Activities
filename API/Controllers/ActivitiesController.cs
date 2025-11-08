using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<ActivityDto>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [Authorize]
    [HttpGet("{Id}")]
    public async Task<ActionResult<ActivityDto>> GetActivityDetail(string Id)
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

    [HttpPut("{Id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> EditActivity(string Id, EditActivityDto activity)
    {
        activity.Id = Id;
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

    [HttpPost("{id}/attend")]
    public async Task<ActionResult> Attend(string Id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command
        {
            Id = Id
        }));
    }
}