using Domain;

namespace Application.interfaces;

public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetUserAsync();
}
