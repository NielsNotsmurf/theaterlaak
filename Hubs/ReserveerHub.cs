using System.Threading.Tasks;
using theaterlaak.Hubs.Clients;
using theaterlaak.Commands;
using Microsoft.AspNetCore.SignalR;

namespace theaterlaak.Hubs;

public class ChatHub : Hub<IReserveerClient>
{
    public async Task SelecteerStoel(SelecteerStoel selectie)
    {
        await Clients.All.OntvangSelectie(selectie);
    }
}