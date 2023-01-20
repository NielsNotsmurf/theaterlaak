using System.Threading.Tasks;
using theaterlaak.Commands;

namespace theaterlaak.Hubs.Clients;

public interface IReserveerClient
{
    Task OntvangSelectie(SelecteerStoel selectie);
}