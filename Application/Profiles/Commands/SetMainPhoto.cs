using Application.Core;
using Application.interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public static class SetMainPhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public string PhotoId { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();
            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
            if (photo is null)
            {
                return Result<Unit>.Failure("Cannot find photo", 400);
            }

            user.Image = photo.Url;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem setting photo", 400);
        }
    }
}