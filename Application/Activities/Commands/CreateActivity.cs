using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto AcitivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {            
            var activity = mapper.Map<Activity>(request.AcitivityDto);
            await context.Activities.AddAsync(activity, cancellationToken);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result)
            {
                return Result<string>.Failure("Failed to create the activity", 400);
            }

            return Result<string>.Success(activity.Id);
        }
    }
}
